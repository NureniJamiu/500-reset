import * as React from 'react';
import Svg, { Path, Text, Defs, LinearGradient, Stop, G } from 'react-native-svg';

export const Logo = ({ width = 120, height = 60, color = '#00B972', ...props }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 150 75" fill="none" {...props}>
      <G>
        {/* 500 */}
        <Text x="10" y="45" fill={color} fontSize="45" fontWeight="bold" fontFamily="sans-serif" letterSpacing="-2">
          500
        </Text>
        {/* RESET */}
        <Text x="12" y="65" fill={color} fontSize="18" fontWeight="bold" fontFamily="sans-serif" letterSpacing="4">
          RESET
        </Text>
        {/* Decorative arrow placeholder for the intricate design */}
        <Path
          d="M 50 20 C 60 10, 80 10, 90 20 C 100 30, 90 40, 80 40"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <Path d="M 80 40 L 85 35 M 80 40 L 75 35" stroke={color} strokeWidth="3" strokeLinecap="round" />
      </G>
    </Svg>
  );
};
