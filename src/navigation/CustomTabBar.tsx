import React, { useRef, useEffect } from 'react';
import { Animated, Platform, View, Text, Pressable } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

function TabBarIcon({ isFocused, options, route, color }: any) {
  const scale = useRef(new Animated.Value(isFocused ? 1.15 : 1)).current;
  const translateY = useRef(new Animated.Value(isFocused ? -4 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: isFocused ? 1.15 : 1,
        useNativeDriver: true,
        friction: 5,
        tension: 150,
      }),
      Animated.spring(translateY, {
        toValue: isFocused ? -4 : 0,
        useNativeDriver: true,
        friction: 5,
        tension: 150,
      })
    ]).start();
  }, [isFocused]);

  return (
    <Animated.View style={{ transform: [{ scale }, { translateY }] }}>
      <View className={`p-2 rounded-full ${isFocused ? 'bg-[#ebfcf5]' : 'bg-transparent'}`}>
        {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color, size: 24 })}
      </View>
    </Animated.View>
  );
}

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View 
      className="absolute bottom-6 mx-6 rounded-3xl bg-white flex-row justify-between px-6 py-3 border border-neutral-100" 
      style={{ 
        shadowColor: '#000', 
        shadowOpacity: 0.1, 
        shadowRadius: 20, 
        shadowOffset: { width: 0, height: 10 },
        elevation: 10
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
          <Pressable
            key={index}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            className="items-center justify-center flex-1"
          >
            <TabBarIcon isFocused={isFocused} options={options} route={route} color={isFocused ? '#00B972' : '#AFAFAF'} />
            <Text 
              className={`text-[10px] mt-1 ${isFocused ? 'text-[#00B972] font-bold' : 'text-neutral-500'}`}
            >
              {label as string}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
