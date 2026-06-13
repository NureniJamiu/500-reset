import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header';
import { Feather } from '@expo/vector-icons';
import { BarChart } from 'react-native-gifted-charts';

const mockTransactions = [
  { id: '1', type: 'withdraw', title: 'Withdraw to Opay', amount: 5000, date: 'Today, 09:30 AM', status: 'completed' },
  { id: '2', type: 'earn', title: 'Plastics Recycled', amount: 52, date: 'Yesterday, 14:15 PM', status: 'completed' },
  { id: '3', type: 'earn', title: 'Metals Recycled', amount: 120, date: 'Oct 12, 10:00 AM', status: 'completed' },
];

const barData = [
  { value: 80, frontColor: '#00B972', spacing: 4 },
  { value: 68, frontColor: '#f59e0b', spacing: 20 },
  { value: 38, frontColor: '#00B972', spacing: 4 },
  { value: 48, frontColor: '#f59e0b', spacing: 20 },
  { value: 72, frontColor: '#00B972', spacing: 4 },
  { value: 72, frontColor: '#f59e0b', spacing: 20 },
  { value: 92, frontColor: '#00B972', spacing: 4 },
  { value: 78, frontColor: '#f59e0b', spacing: 20 },
  { value: 62, frontColor: '#00B972', spacing: 4 },
  { value: 58, frontColor: '#f59e0b', spacing: 20 },
  { value: 80, frontColor: '#00B972', spacing: 4 },
  { value: 62, frontColor: '#f59e0b', spacing: 20 },
  { value: 72, frontColor: '#00B972', spacing: 4 },
  { value: 42, frontColor: '#f59e0b', spacing: 20 },
];

export function WalletScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }} showsVerticalScrollIndicator={false} className="bg-[#f7f9f9]">
      {/* Reusable Header */}
      <Header />

      {/* Balance Card */}
      <View className="w-full bg-[#0F3D2F] rounded-3xl p-6 mb-8 shadow-lg">
        <View className="flex-row justify-between items-end mb-2">
          <Text className="text-white/80 text-sm">Available balance</Text>
          <Text className="text-white/80 text-xs">Earned today</Text>
        </View>
        <View className="flex-row justify-between items-end mb-8">
          <Text className="text-white text-4xl font-bold tracking-tight">
            ₦50,000<Text className="text-2xl font-semibold">.46</Text>
          </Text>
          <Text className="text-white text-lg font-bold tracking-tight mb-1">+₦52</Text>
        </View>
        <View className="flex-row justify-end">
          <TouchableOpacity style={{ alignSelf: 'flex-end' }} className="bg-white rounded-full py-2.5 px-5 flex-row items-center">
            <Text className="text-[#0F3D2F] text-xs font-semibold">Transaction history {'>'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Transaction Trend */}
      <Text className="text-xl font-extrabold text-neutral-900 mb-4 tracking-tight">Transaction Trend</Text>
      <View className="bg-white rounded-3xl p-5 shadow-sm mb-8">
        {/* Controls & Legend */}
        <View className="flex-row justify-between items-start mb-8">
          <TouchableOpacity className="border border-neutral-200 rounded-xl py-2 px-4 bg-neutral-50">
            <Text className="text-neutral-700 font-semibold text-sm">Weekly</Text>
          </TouchableOpacity>
          <View className="gap-2 mt-1">
            <View className="flex-row items-center gap-2 justify-end">
              <View className="w-8 h-2 rounded-full bg-[#00B972]" />
              <Text className="text-xs text-neutral-600 font-medium w-16">Earned</Text>
            </View>
            <View className="flex-row items-center gap-2 justify-end">
              <View className="w-8 h-2 rounded-full bg-orange-500" />
              <Text className="text-xs text-neutral-600 font-medium w-16">Withdrawn</Text>
            </View>
          </View>
        </View>

        {/* Chart Area */}
        <View className="mt-4 -ml-2">
          <BarChart
            data={barData}
            barWidth={8}
            initialSpacing={10}
            spacing={20}
            barBorderRadius={4}
            hideRules
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={{ color: '#9ca3af', fontSize: 10 }}
            noOfSections={4}
            maxValue={100}
            yAxisLabelTexts={['0', '25k', '50k', '75k', '100k']}
          />
        </View>
      </View>

      {/* Withdraw Button */}
      <TouchableOpacity 
        onPress={() => navigation.navigate('Withdraw')}
        className="w-full bg-[#00B972] rounded-2xl py-4 items-center justify-center shadow-md shadow-[#00B972]/20 mb-8"
      >
        <Text className="text-white font-bold text-lg">Withdraw to Opay</Text>
      </TouchableOpacity>

      {/* Recent Transactions Mock Data */}
      <View className="mb-4">
        <Text className="text-xl font-extrabold text-neutral-900 mb-4 tracking-tight">Recent Activity</Text>
        <View className="bg-white rounded-3xl p-5 shadow-sm gap-4">
          {mockTransactions.map((tx, idx) => (
            <View key={tx.id}>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className={`w-10 h-10 rounded-full items-center justify-center ${tx.type === 'earn' ? 'bg-green-50' : 'bg-neutral-50'}`}>
                    <Feather name={tx.type === 'earn' ? 'arrow-down-left' : 'arrow-up-right'} size={18} color={tx.type === 'earn' ? '#00B972' : '#64748b'} />
                  </View>
                  <View>
                    <Text className="font-bold text-neutral-900 text-sm mb-0.5">{tx.title}</Text>
                    <Text className="text-neutral-400 text-xs">{tx.date}</Text>
                  </View>
                </View>
                <Text className={`font-bold text-base ${tx.type === 'earn' ? 'text-[#00B972]' : 'text-neutral-900'}`}>
                  {tx.type === 'earn' ? '+' : '-'}₦{tx.amount}
                </Text>
              </View>
              {idx < mockTransactions.length - 1 && <View className="h-[1px] bg-neutral-100 mt-4" />}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
