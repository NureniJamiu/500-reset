import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LayoutDashboard, QrCode, Wallet, ArrowDownToLine } from 'lucide-react-native';

import { DashboardScreen } from '../screens/DashboardScreen';
import { ScanQRScreen } from '../screens/ScanQRScreen';

import { WalletScreen } from '../screens/WalletScreen';
import { WithdrawScreen } from '../screens/WithdrawScreen';
import { CustomTabBar } from './CustomTabBar';

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} />
        }}
      />
      <Tab.Screen 
        name="ScanQR" 
        component={ScanQRScreen} 
        options={{
          title: "Scan QR",
          tabBarIcon: ({ color, size }) => <QrCode size={size} color={color} />
        }}
      />
      <Tab.Screen 
        name="Wallet" 
        component={WalletScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Wallet size={size} color={color} />
        }}
      />
      <Tab.Screen 
        name="Withdraw" 
        component={WithdrawScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <ArrowDownToLine size={size} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}
