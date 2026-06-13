import React from 'react';
import { View, Text } from 'react-native';

interface MetricCardProps {
  variant: 'white' | 'dark';
  title: string;
  subtitle: string;
}

export function MetricCard({ variant, title, subtitle }: MetricCardProps) {
  const isDark = variant === 'dark';
  
  return (
    <View 
      className={`p-4 rounded-2xl ${isDark ? 'bg-secondary-900' : 'bg-white'}`}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0 : 0.05,
        shadowRadius: 10,
        elevation: isDark ? 0 : 3,
      }}
    >
      <Text className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
        {title}
      </Text>
      <Text className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
        {subtitle}
      </Text>
    </View>
  );
}
