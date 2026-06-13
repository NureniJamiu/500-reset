import "./globals.css";
import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { GluestackUIProvider } from "./components/ui/gluestack-ui-provider";
import { Logo } from "./components/Logo";
import { Button } from "./components/ui/Button";
import { MetricCard } from "./components/ui/MetricCard";
import { InputField } from "./components/ui/InputField";
import { PinInput } from "./components/ui/PinInput";
import { LayoutDashboard, QrCode, Wallet, ArrowDownToLine } from 'lucide-react-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider mode="light">
      <SafeAreaView className="flex-1 bg-neutral-100">
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
          <View className="items-center mb-8">
            <Logo />
          </View>

          <Text className="text-xl font-bold mb-4">Metric Cards</Text>
          <View className="flex-row flex-wrap gap-4 mb-8">
            <MetricCard variant="white" title="+5000" subtitle="Plastics recycled" />
            <MetricCard variant="dark" title="+5000" subtitle="Plastics recycled" />
            <MetricCard variant="yellow" title="+5000" subtitle="Plastics recycled" />
          </View>

          <Text className="text-xl font-bold mb-4">Buttons</Text>
          <View className="gap-4 mb-8">
            <Button variant="primary" title="Click Here" />
            <Button variant="secondary" title="Click Here" />
          </View>

          <Text className="text-xl font-bold mb-4">Input Fields</Text>
          <View className="mb-8">
            <InputField label="Enter name" placeholder="Your Name" />
            <InputField label="Enter name" placeholder="Wrong input" error="The input entered is not correct" />
          </View>

          <Text className="text-xl font-bold mb-4">PIN Input</Text>
          <View className="mb-8">
            <PinInput />
          </View>
        </ScrollView>

        {/* Mock Bottom Navigation */}
        <View className="absolute bottom-0 w-full bg-neutral-0 flex-row justify-between px-8 py-4 border-t border-neutral-200">
          <View className="items-center">
            <LayoutDashboard size={24} color="#00B972" />
            <Text className="text-xs text-primary-500 mt-1">Dashboard</Text>
          </View>
          <View className="items-center">
            <QrCode size={24} color="#AFAFAF" />
            <Text className="text-xs text-neutral-500 mt-1">Scan QR</Text>
          </View>
          <View className="items-center">
            <Wallet size={24} color="#AFAFAF" />
            <Text className="text-xs text-neutral-500 mt-1">Balance</Text>
          </View>
          <View className="items-center">
            <ArrowDownToLine size={24} color="#AFAFAF" />
            <Text className="text-xs text-neutral-500 mt-1">Withdraw</Text>
          </View>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
