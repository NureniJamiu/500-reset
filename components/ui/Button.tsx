import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

const buttonStyles = tv({
  base: 'flex-row items-center justify-center rounded-xl px-6 py-4 min-h-[56px]',
  variants: {
    variant: {
      primary: 'bg-primary-500',
      secondary: 'bg-secondary-900',
    },
    disabled: {
      true: 'opacity-50',
    },
    fullWidth: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    variant: 'primary',
    fullWidth: false,
    disabled: false,
  },
});

const textStyles = tv({
  base: 'text-neutral-0 font-semibold text-lg',
  variants: {
    variant: {
      primary: 'text-neutral-0',
      secondary: 'text-neutral-0',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export interface ButtonProps extends TouchableOpacityProps, VariantProps<typeof buttonStyles> {
  title: string;
  loading?: boolean;
}

export const Button = ({
  title,
  variant,
  fullWidth,
  disabled,
  loading,
  className,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className={buttonStyles({ variant, fullWidth, disabled: disabled || loading, class: className })}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text className={textStyles({ variant })}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
