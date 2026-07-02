import { supabase } from '@/lib/supabase';
import { useAuth } from '@/stores/auth';
import { useProgress } from '@/stores/progress';
import { useSettings } from '@/stores/settings';

const TABLE = 'user_state';

function snapshot() {
  const p = useProgress.getState();
  const s = useSettings.getState();
  return {
    progress: { byWord: p.byWord, log: p.log },
    settings: {
      hasOnboarded: s.hasOnboarded,
      nativeLang: s.nativeLang,
      targetLang: s.targetLang,
      level: s.level,
      dailyGoal: s.dailyGoal,
      themeMode: s.themeMode,
    },
  };
}

/** Load the signed-in user's cloud state into local stores (or seed it). */
export async function pullAndApply(): Promise<void> {
  const uid = useAuth.getState().session?.user.id;
  if (!uid) return;
  const { data, error } = await supabase.from(TABLE).select('data').eq('user_id', uid).maybeSingle();
  if (error) return;
  const remote = data?.data as { progress?: any; settings?: any } | undefined;
  if (remote) {
    if (remote.progress) {
      useProgress.setState({ byWord: remote.progress.byWord ?? {}, log: remote.progress.log ?? [] });
    }
    if (remote.settings) useSettings.setState({ ...remote.settings });
  } else {
    await pushSnapshot();
  }
}

export async function pushSnapshot(): Promise<void> {
  const uid = useAuth.getState().session?.user.id;
  if (!uid) return;
  await supabase.from(TABLE).upsert({ user_id: uid, data: snapshot(), updated_at: new Date().toISOString() });
}

let timer: ReturnType<typeof setTimeout> | undefined;
function schedulePush() {
  if (!useAuth.getState().session) return;
  clearTimeout(timer);
  timer = setTimeout(() => void pushSnapshot(), 1500);
}

let started = false;
/** Wire cloud sync once: pull on login, debounced push on local changes. */
export function startCloudSync(): void {
  if (started) return;
  started = true;

  let lastUid: string | undefined;
  useAuth.subscribe((s) => {
    const uid = s.session?.user.id;
    if (uid && uid !== lastUid) {
      lastUid = uid;
      void pullAndApply();
    } else if (!uid) {
      lastUid = undefined;
    }
  });

  useProgress.subscribe(() => schedulePush());
  useSettings.subscribe(() => schedulePush());
}
