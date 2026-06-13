import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function Header() {
  return (
    <View className="flex-row items-center justify-between mb-6">
      <View className="flex-row items-center gap-3">
        <View className="w-12 h-12 rounded-full border-2 border-[#00B972] overflow-hidden bg-neutral-200">
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' }}
            className="w-full h-full"
          />
        </View>
        <View>
          <Text className="text-sm font-medium text-neutral-500">Welcome back,</Text>
          <Text className="text-xl font-extrabold text-[#111] tracking-tight">
            Rebecca!
          </Text>
        </View>
      </View>
      <View className="flex-row gap-3">
        <TouchableOpacity className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm">
          <Ionicons name="notifications-outline" size={20} color="#111" />
          <View className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00B972]" />
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm">
          <Ionicons name="settings-outline" size={20} color="#111" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
