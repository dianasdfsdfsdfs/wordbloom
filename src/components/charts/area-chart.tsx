import { useMemo } from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { palette } from '@/constants/theme';

export interface AreaChartProps {
  data: number[];
  width: number;
  height: number;
  color?: string;
}

/** Minimal area + line chart (react-native-svg). */
export function AreaChart({ data, width, height, color = palette.fern }: AreaChartProps) {
  const { line, area } = useMemo(() => {
    if (data.length === 0) return { line: '', area: '' };
    const pad = 6;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const stepX = data.length > 1 ? width / (data.length - 1) : width;
    const points = data.map((v, i) => {
      const x = i * stepX;
      const y = pad + (height - pad * 2) * (1 - (v - min) / range);
      return [x, y] as const;
    });
    const linePath = points
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`)
      .join(' ');
    const areaPath = `${linePath} L${width},${height} L0,${height} Z`;
    return { line: linePath, area: areaPath };
  }, [data, width, height]);

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id="wbAreaFill" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={color} stopOpacity={0.35} />
          <Stop offset="1" stopColor={color} stopOpacity={0.02} />
        </LinearGradient>
      </Defs>
      <Path d={area} fill="url(#wbAreaFill)" />
      <Path
        d={line}
        stroke={color}
        strokeWidth={3}
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Svg>
  );
}
