import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { Logo } from '../../components/Logo';
import { MetricCard } from '../components/MetricCard';

export function DashboardScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100, flexGrow: 1 }} className="bg-neutral-100">
      <View className="flex-row items-center justify-between mt-12 mb-8">
        <Logo />
        <View className="w-12 h-12 rounded-full overflow-hidden bg-neutral-200">
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' }}
            className="w-full h-full"
          />
        </View>
      </View>

      <Text className="text-2xl mb-6 font-bold text-neutral-900">
        Hello Rebecca!
      </Text>

      <View className="flex-row flex-wrap justify-between mb-auto">
        <View className="w-[48%] mb-4">
          <MetricCard variant="white" title="5000+" subtitle="Plastics recycled" />
        </View>
        <View className="w-[48%] mb-4">
          <MetricCard variant="dark" title="3200+" subtitle="Active recyclers" />
        </View>
        <View className="w-[48%] mb-4">
          <MetricCard variant="dark" title="N2,500" subtitle="Wallet balance" />
        </View>
        <View className="w-[48%] mb-4">
          <MetricCard variant="white" title="+5000" subtitle="Plastics recycled" />
        </View>
      </View>

      <View className="mt-8">
        <TouchableOpacity className="w-full bg-[#00B972] rounded-xl py-4 items-center justify-center">
          <Text className="text-white font-semibold text-lg">Scan to Earn</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
