import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function TabBarButton({ isFocused, options, label, onPress, testID, accessibilityLabel }: any) {
  return (
    <Pressable
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onPress={onPress}
      android_ripple={{ color: 'transparent' }}
      style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 8, paddingBottom: 8, paddingHorizontal: 4 }}
    >
      <View style={{ 
        alignItems: 'center', 
        justifyContent: 'center',
        width: 44,
        height: 44,
        borderRadius: 9999,
        backgroundColor: isFocused ? '#00B972' : 'transparent',
        overflow: 'hidden'
      }}>
        {options.tabBarIcon && options.tabBarIcon({ 
          focused: isFocused, 
          color: isFocused ? '#FFFFFF' : '#9CA3AF', 
          size: 22 
        })}
      </View>
      <Text 
        style={{ 
          color: isFocused ? '#00B972' : '#9CA3AF', 
          fontSize: 10, 
          marginTop: 4, 
          fontWeight: isFocused ? '600' : '500' 
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ position: 'absolute', bottom: insets.bottom > 0 ? insets.bottom + 8 : 24, left: 0, right: 0, alignItems: 'center' }}>
      <View
        className="flex-row items-center bg-white rounded-full px-6 py-1 border border-neutral-100"
        style={{
          gap: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.08,
          shadowRadius: 20,
          elevation: 15,
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TabBarButton
              key={index}
              isFocused={isFocused}
              options={options}
              route={route}
              label={label}
              onPress={onPress}
              testID={options.tabBarButtonTestID}
              accessibilityLabel={options.tabBarAccessibilityLabel}
            />
          );
        })}
      </View>
    </View>
  );
}
