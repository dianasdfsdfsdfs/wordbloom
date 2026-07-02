import type { Session } from '@supabase/supabase-js';
import { create } from 'zustand';

import { supabase } from '@/lib/supabase';

interface AuthState {
  session: Session | null;
  initialized: boolean;
}

export const useAuth = create<AuthState>(() => ({ session: null, initialized: false }));

// Restore any persisted session and keep the store in sync with auth changes.
supabase.auth.getSession().then(({ data }) => {
  useAuth.setState({ session: data.session, initialized: true });
});
supabase.auth.onAuthStateChange((_event, session) => {
  useAuth.setState({ session, initialized: true });
});

export function signUpEmail(email: string, password: string, name?: string) {
  return supabase.auth.signUp({
    email,
    password,
    options: name ? { data: { name } } : undefined,
  });
}

export function signInEmail(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export function signOutUser() {
  return supabase.auth.signOut();
}
