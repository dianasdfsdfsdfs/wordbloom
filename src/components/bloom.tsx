import { memo } from 'react';
import Svg, { Circle, Defs, Ellipse, G, RadialGradient, Stop } from 'react-native-svg';

import { palette } from '@/constants/theme';

export interface BloomProps {
  size?: number;
  /** Kept for API compatibility; the flower always renders full. */
  progress?: number;
  petals?: number;
}

/** The Wordbloom signature: a full garnet blossom. */
export const Bloom = memo(function Bloom({ size = 160, petals = 8 }: BloomProps) {
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
        {Array.from({ length: petals }).map((_, i) => (
          <Ellipse
            key={i}
            cx={cx}
            cy={petalCy}
            rx={petalRx}
            ry={petalRy}
            fill="url(#bloomPetal)"
            transform={`rotate(${(i * 360) / petals} ${cx} ${cy})`}
          />
        ))}
        <Circle cx={cx} cy={cy} r={size * 0.13} fill={palette.forest} />
        <Circle cx={cx} cy={cy} r={size * 0.07} fill={palette.honeydew} />
      </G>
    </Svg>
  );
});
