import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// Making the scanner a taller rectangle
const SCANNER_WIDTH = width * 0.8;
const SCANNER_HEIGHT = height * 0.5; 

export function ScanQRScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [flashlightEnabled, setFlashlightEnabled] = useState(false);

  if (!permission) {
    return <View className="flex-1 bg-[#0F3D2F]" />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-[#0F3D2F] items-center justify-center p-6">
        <Text className="text-white text-center mb-6 text-xl font-bold tracking-tight">Camera Permission Required</Text>
        <Text className="text-white/80 text-center mb-8 text-base">We need your permission to access the camera to scan codes.</Text>
        <TouchableOpacity 
          className="bg-[#00B972] px-8 py-4 rounded-full flex-row items-center shadow-lg"
          onPress={requestPermission}
        >
          <Ionicons name="camera-outline" size={24} color="white" />
          <Text className="text-white font-bold ml-3 text-lg">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Calculate SVG path for the inverted mask
  const x = (width - SCANNER_WIDTH) / 2;
  const y = (height - SCANNER_HEIGHT) / 2 - 40; // Shifted up slightly
  const r = 32;
  const w = SCANNER_WIDTH;
  const h = SCANNER_HEIGHT;

  // evenodd path: Outer rectangle (screen size) + Inner rounded rectangle (scanner hole)
  const path = `
    M0,0 H${width} V${height} H0 Z
    M${x + r},${y}
    H${x + w - r}
    A${r},${r} 0 0,1 ${x + w},${y + r}
    V${y + h - r}
    A${r},${r} 0 0,1 ${x + w - r},${y + h}
    H${x + r}
    A${r},${r} 0 0,1 ${x},${y + h - r}
    V${y + r}
    A${r},${r} 0 0,1 ${x + r},${y}
    Z
  `;

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <CameraView 
        style={StyleSheet.absoluteFill} 
        facing="back"
        enableTorch={flashlightEnabled}
      />
      
      {/* SVG Overlay Mask */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Svg height="100%" width="100%">
          <Path
            d={path}
            fill="#0F3D2F"
            fillOpacity={0.7}
            fillRule="evenodd"
          />
        </Svg>
      </View>

      {/* Scanner Corners */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={{ position: 'absolute', left: x, top: y, width: SCANNER_WIDTH, height: SCANNER_HEIGHT }}>
          <View className="absolute top-0 left-0 w-16 h-16 border-t-[6px] border-l-[6px] border-[#00B972] rounded-tl-[32px]" />
          <View className="absolute top-0 right-0 w-16 h-16 border-t-[6px] border-r-[6px] border-[#00B972] rounded-tr-[32px]" />
          <View className="absolute bottom-0 left-0 w-16 h-16 border-b-[6px] border-l-[6px] border-[#00B972] rounded-bl-[32px]" />
          <View className="absolute bottom-0 right-0 w-16 h-16 border-b-[6px] border-r-[6px] border-[#00B972] rounded-br-[32px]" />
        </View>
      </View>

      {/* UI Content - Explicitly sized to avoid NativeWind bugs, with high zIndex */}
      <View 
        style={{ 
          flex: 1, 
          paddingTop: Math.max(insets.top, 20), 
          paddingBottom: insets.bottom, 
          justifyContent: 'space-between',
          zIndex: 10
        }}
        pointerEvents="box-none"
      >
        {/* Header Bar */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 8 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
            <TouchableOpacity onPress={() => setFlashlightEnabled(!flashlightEnabled)}>
              <Ionicons name={flashlightEnabled ? "flash" : "flash-outline"} size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="image-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="ellipsis-horizontal" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Text and Bottom Button container */}
        <View style={{ alignItems: 'center', width: '100%', paddingHorizontal: 32, paddingBottom: 100 }} pointerEvents="box-none">
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center', fontWeight: '500', lineHeight: 28, marginBottom: 48 }}>
            Place the square hole above the QR to scan
          </Text>


        </View>
      </View>
    </View>
  );
}
