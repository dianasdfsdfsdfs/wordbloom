import { memo } from 'react';
import Svg, { Circle, Defs, Ellipse, G, RadialGradient, Stop } from 'react-native-svg';

import { palette } from '@/constants/theme';

export interface BloomProps {
  size?: number;
  /** 0–1: share of petals that have "bloomed". */
  progress?: number;
  petals?: number;
}

/**
 * The Wordbloom signature: a garnet blossom whose petals open as you learn.
 * Bloomed petals are filled garnet; not-yet-learned petals stay dim buds.
 */
export const Bloom = memo(function Bloom({ size = 160, progress = 1, petals = 8 }: BloomProps) {
  const clamped = Math.max(0, Math.min(1, progress));
  const bloomed = Math.round(clamped * petals);
  const cx = size / 2;
  const cy = size / 2;
  const petalRx = size * 0.135;
  const petalRy = size * 0.25;
  const petalCy = cy - size * 0.2;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Defs>
        <RadialGradient id="bloomPetal" cx="50%" cy="30%" r="75%">
          <Stop offset="0%" stopColor={palette.brick} />
          <Stop offset="100%" stopColor={palette.garnet} />
        </RadialGradient>
      </Defs>
      <G>
        {Array.from({ length: petals }).map((_, i) => {
          const active = i < bloomed;
          return (
            <Ellipse
              key={i}
              cx={cx}
              cy={petalCy}
              rx={petalRx}
              ry={petalRy}
              fill={active ? 'url(#bloomPetal)' : palette.ink600}
              opacity={active ? 1 : 0.35}
              transform={`rotate(${(i * 360) / petals} ${cx} ${cy})`}
            />
          );
        })}
        <Circle cx={cx} cy={cy} r={size * 0.13} fill={palette.forest} />
        <Circle cx={cx} cy={cy} r={size * 0.07} fill={palette.honeydew} />
      </G>
    </Svg>
  );
});
