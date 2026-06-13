import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

interface LogoProps {
  width?: number;
  height?: number;
  style?: StyleProp<ImageStyle>;
}

export const Logo = ({ width = 120, height = 40, style }: LogoProps) => {
  return (
    <Image 
      source={require('../assets/logo.png')} 
      style={[{ width, height, resizeMode: 'contain' }, style]} 
    />
  );
};
