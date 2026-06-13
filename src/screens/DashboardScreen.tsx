import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export function DashboardScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }} className="bg-[#f7f9f9]">
      {/* Header */}
      <View className="flex-row items-center justify-between mt-8 mb-6">
        <View className="flex-row items-center">
          <View className="w-12 h-12 rounded-full border-2 border-[#00B972] overflow-hidden bg-neutral-200">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' }}
              className="w-full h-full"
            />
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

      <Text className="text-3xl font-extrabold text-[#111] mb-6 tracking-tight">
        Hello Rebecca!
      </Text>

      {/* Hero Card */}
      <View className="w-full bg-[#0F3D2F] rounded-[32px] p-6 mb-6 shadow-lg shadow-black/20 relative overflow-hidden">
        {/* Abstract decorative circles */}
        <View className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
        <View className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#00B972]/20 rounded-full blur-2xl" />

        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-row items-center gap-2">
            <Ionicons name="leaf" size={18} color="#00B972" />
            <Text className="text-white font-bold text-sm tracking-widest">500 RESET</Text>
          </View>
          <Text className="text-white/70 text-xs font-medium">Wallet Balance</Text>
        </View>

        <View className="items-center mb-2">
          <Text className="text-white text-5xl font-extrabold tracking-tighter">
            <Text className="text-white/60">$ </Text>1,245.80
          </Text>
        </View>

        <View className="items-center mb-8">
          <Text className="text-white/70 text-sm font-medium">
            RESET Points: <Text className="text-white font-bold">12,458</Text>
          </Text>
        </View>

        <View className="flex-row gap-3">
          <TouchableOpacity className="flex-1 py-3.5 bg-white/10 rounded-full items-center justify-center border border-white/10">
            <Text className="text-white font-semibold">Redeem</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 py-3.5 bg-white/10 rounded-full items-center justify-center border border-white/10">
            <Text className="text-white font-semibold">View History</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Grid Layout */}
      <View className="flex-row justify-between">
        {/* Left Column */}
        <View className="w-[48%] gap-4">
          
          {/* Card 1: Plastics */}
          <View className="bg-[#00B972] rounded-[24px] p-5 shadow-sm shadow-[#00B972]/30">
            <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mb-4">
              <Ionicons name="cube-outline" size={20} color="white" />
            </View>
            <Text className="text-white text-3xl font-black mb-1">5000+</Text>
            <Text className="text-white/90 text-sm font-medium mb-3">Plastics Recycled</Text>
            <View className="h-1.5 bg-white/30 rounded-full w-full mb-2">
              <View className="h-full bg-white rounded-full w-[80%]" />
            </View>
            <Text className="text-white/80 text-xs font-medium">+2.1% this week</Text>
          </View>

          {/* Card 3: Points */}
          <View className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/5">
            <Text className="text-[#111] text-3xl font-black mb-1">+5000</Text>
            <Text className="text-neutral-500 text-sm font-medium mb-4">Points Earned</Text>
            
            <Text className="text-neutral-400 text-[10px] font-bold uppercase tracking-wider mb-1">Your current score:</Text>
            <Text className="text-[#111] font-bold text-base mb-3">12,458 pts</Text>

            <View className="h-1.5 bg-neutral-100 rounded-full w-full mb-2">
              <View className="h-full bg-[#00B972] rounded-full w-[80%]" />
            </View>
            <Text className="text-neutral-400 text-[10px] font-bold">Daily Goal: 80%</Text>
          </View>
          
        </View>

        {/* Right Column */}
        <View className="w-[48%] gap-4">
          
          {/* Card 2: Active Recyclers */}
          <View className="bg-white rounded-[24px] p-5 shadow-sm shadow-black/5">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-[#111] text-2xl font-black">3200+</Text>
              <View className="w-8 h-8 bg-green-50 rounded-full items-center justify-center">
                <Feather name="users" size={14} color="#00B972" />
              </View>
            </View>
            <Text className="text-neutral-500 text-sm font-medium mb-4">Active Recyclers</Text>
            
            <View className="w-full h-16 bg-neutral-100 rounded-xl mb-3 overflow-hidden">
              <View className="absolute inset-0 items-center justify-center border border-neutral-200/50 rounded-xl" style={{ backgroundColor: '#eef2f3' }}>
                <Ionicons name="location" size={24} color="#00B972" />
              </View>
            </View>

            <Text className="text-neutral-400 text-[10px] font-bold text-center">Join the global movement!</Text>
          </View>

          {/* Card 4: Upcoming Pickup */}
          <View className="bg-[#1A2E44] rounded-[24px] p-5 shadow-sm shadow-[#1A2E44]/30 flex-1 justify-between">
            <View className="w-10 h-10 bg-white/10 rounded-xl items-center justify-center mb-4">
              <Feather name="truck" size={18} color="white" />
            </View>
            <View>
              <Text className="text-white/70 text-xs font-medium mb-1">Upcoming Pickup:</Text>
              <Text className="text-white text-lg font-bold">Tue, Oct 26</Text>
            </View>
          </View>

        </View>
      </View>
    </ScrollView>
  );
}
