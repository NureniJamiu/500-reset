import React, { useState } from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';
import { tv } from 'tailwind-variants';

const inputWrapperStyles = tv({
  base: 'border rounded-xl px-4 py-4 min-h-[56px] flex-row items-center bg-neutral-0',
  variants: {
    state: {
      default: 'border-neutral-200',
      active: 'border-primary-500',
      error: 'border-error-500',
    },
  },
  defaultVariants: {
    state: 'default',
  },
});

const labelStyles = tv({
  base: 'text-sm mb-2 text-secondary-700',
});

const errorTextStyles = tv({
  base: 'text-xs mt-1 text-error-500',
});

export interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const InputField = ({ label, error, onFocus, onBlur, ...props }: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  let state: 'default' | 'active' | 'error' = 'default';
  if (error) {
    state = 'error';
  } else if (isFocused) {
    state = 'active';
  }

  return (
    <View className="mb-4">
      {label && <Text className={labelStyles()}>{label}</Text>}
      <View className={inputWrapperStyles({ state })}>
        <TextInput
          className="flex-1 text-base text-secondary-900"
          placeholderTextColor="#AFAFAF"
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </View>
      {error && <Text className={errorTextStyles()}>{error}</Text>}
    </View>
  );
};
