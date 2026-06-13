import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export interface PinInputProps {
  length?: number;
  onComplete?: (pin: string) => void;
}

export const PinInput = ({ length = 4, onComplete }: PinInputProps) => {
  const [pin, setPin] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (!text && index > 0) {
      inputs.current[index - 1]?.focus();
    }

    if (newPin.every(p => p !== '') && onComplete) {
      onComplete(newPin.join(''));
    }
  };

  return (
    <View className="flex-row justify-between items-center w-full max-w-[280px] self-center my-4">
      {pin.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputs.current[index] = ref)}
          className={`w-14 h-14 border-2 rounded-xl text-center text-2xl font-bold bg-neutral-0 ${
            digit ? 'border-primary-500' : 'border-neutral-200'
          }`}
          keyboardType="numeric"
          maxLength={1}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace' && !pin[index] && index > 0) {
              inputs.current[index - 1]?.focus();
            }
          }}
        />
      ))}
    </View>
  );
};
