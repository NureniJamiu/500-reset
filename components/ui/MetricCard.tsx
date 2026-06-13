import React from 'react';
import { View, Text } from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

const cardStyles = tv({
  base: 'rounded-2xl p-6 min-w-[140px] flex-1 items-center justify-center shadow-soft-2',
  variants: {
    variant: {
      white: 'bg-neutral-0',
      dark: 'bg-secondary-900',
      yellow: 'bg-tertiary-500',
    },
  },
  defaultVariants: {
    variant: 'white',
  },
});

const titleStyles = tv({
  base: 'text-2xl font-bold mb-1',
  variants: {
    variant: {
      white: 'text-secondary-900',
      dark: 'text-neutral-0',
      yellow: 'text-secondary-900',
    },
  },
  defaultVariants: {
    variant: 'white',
  },
});

const subtitleStyles = tv({
  base: 'text-xs',
  variants: {
    variant: {
      white: 'text-secondary-500',
      dark: 'text-secondary-300',
      yellow: 'text-secondary-800',
    },
  },
  defaultVariants: {
    variant: 'white',
  },
});

export interface MetricCardProps extends VariantProps<typeof cardStyles> {
  title: string;
  subtitle: string;
}

export const MetricCard = ({ variant, title, subtitle }: MetricCardProps) => {
  return (
    <View className={cardStyles({ variant })}>
      <Text className={titleStyles({ variant })}>{title}</Text>
      <Text className={subtitleStyles({ variant })}>{subtitle}</Text>
    </View>
  );
};
