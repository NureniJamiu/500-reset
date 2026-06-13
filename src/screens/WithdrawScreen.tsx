import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const quickAmounts = [1000, 5000, 10000, 50000];

export function WithdrawScreen() {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('5000');
  const [accountNumber, setAccountNumber] = useState('1234567890');
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [fee, setFee] = useState('0.00');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPinModalVisible, setIsPinModalVisible] = useState(false);
  const [pin, setPin] = useState('');
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [statusType, setStatusType] = useState('success');
  const availableBalance = 50000.46;
  const pinInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (pin.length === 4) {
      setTimeout(() => {
        setIsPinModalVisible(false);
        setStatusType(pin === '0000' ? 'error' : 'success');
        setTimeout(() => {
          setIsStatusModalVisible(true);
          setPin('');
        }, 300);
      }, 300);
    }
  }, [pin]);

  return (
    <View className="flex-1 bg-[#f7f9f9]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 160 }} showsVerticalScrollIndicator={false}>

          {/* Header */}
          <View style={{ marginBottom: 32 }} className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm"
            >
              <Feather name="arrow-left" size={20} color="#0F3D2F" />
            </TouchableOpacity>
            <Text className="text-xl font-extrabold text-[#0F3D2F]">Withdraw</Text>
            <View className="w-10 h-10" />
          </View>

          {/* Amount Entry Card */}
          <View style={{ marginBottom: 20 }} className="w-full bg-[#0F3D2F] rounded-[32px] p-8 items-center shadow-lg relative overflow-hidden py-6">
            {/* Decorative circles */}
            <View className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full" />
            <View className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/5 rounded-full" />

            <Text className="text-white/80 font-medium text-sm mb-4 tracking-wider uppercase mt-4">Amount to withdraw</Text>

            <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.2)', paddingBottom: 16 }} className="flex-row items-center justify-center w-full">
              <Text className="text-white text-4xl font-bold mr-2">₦</Text>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={{ color: 'white', fontSize: 48, fontWeight: '800', minWidth: 120, textAlign: 'center', paddingVertical: 0 }}
                placeholder="0"
                placeholderTextColor="rgba(255,255,255,0.3)"
              />
            </View>

            <View className="flex-row items-center bg-black/20 px-4 py-2 rounded-full mb-4 gap-2">
              <Feather name="info" size={14} color="rgba(255,255,255,0.8)" className="mr-2" />
              <Text className="text-white/80 text-xs font-medium ml-">
                Available: ₦{availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </Text>
            </View>
          </View>

          {/* Quick Amounts */}
          <View style={{ marginBottom: 20 }} className="flex-row justify-between w-full">
            {quickAmounts.map((val) => (
              <TouchableOpacity
                key={val}
                onPress={() => setAmount(val.toString())}
                style={{ flex: 1, marginHorizontal: 4 }}
                className={`py-3 rounded-2xl items-center justify-center border ${amount === val.toString() ? 'border-[#00B972] bg-[#00B972]/10' : 'border-neutral-200 bg-white shadow-sm'}`}
              >
                <Text className={`font-bold text-base ${amount === val.toString() ? 'text-[#00B972]' : 'text-neutral-600'}`}>
                  {val >= 1000 ? `${val / 1000}k` : val}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Destination Account */}
          <View style={{ marginBottom: 10 }}>
            <Text className="text-lg font-extrabold text-neutral-900 tracking-tight">Withdraw To</Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsEditingAccount(true)}
            style={{ marginBottom: 20 }}
            className="bg-white rounded-3xl p-5 flex-row items-center justify-between shadow-sm border border-neutral-100"
          >
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 bg-emerald-50 rounded-2xl items-center justify-center">
                <View className="w-6 h-6 bg-[#00B972] rounded-md items-center justify-center">
                  <Text className="text-white font-bold text-xs">OP</Text>
                </View>
              </View>
              <View style={{ marginLeft: 16, flex: 1 }}>
                <Text className="text-neutral-900 font-bold text-lg mb-1">Opay Account</Text>
                {isEditingAccount ? (
                  <TextInput
                    value={accountNumber}
                    onChangeText={setAccountNumber}
                    keyboardType="numeric"
                    autoFocus
                    onBlur={() => setIsEditingAccount(false)}
                    style={{ fontSize: 16, fontWeight: '500', color: '#171717', borderBottomWidth: 1, borderBottomColor: '#00B972', paddingVertical: 4 }}
                  />
                ) : (
                  <Text className="text-neutral-500 text-sm font-medium tracking-wide">
                    {accountNumber ? `**** ${accountNumber.slice(-4)}` : 'Enter Account Number'}
                  </Text>
                )}
              </View>
            </View>
            <View className="w-10 h-10 bg-neutral-50 rounded-full items-center justify-center ml-2">
              <Feather name={isEditingAccount ? "check" : "chevron-down"} size={20} color={isEditingAccount ? "#00B972" : "#64748b"} />
            </View>
          </TouchableOpacity>

          {/* Transaction Summary */}
          <View className="bg-white rounded-3xl p-6 shadow-xs border border-neutral-100">
            <View style={{ marginBottom: 6 }} className="flex-row justify-between items-center">
              <Text className="text-neutral-500 font-medium text-base">Fee</Text>
              <View className="flex-row items-center">
                <Text className="text-neutral-900 font-bold text-base mr-1">₦</Text>
                <TextInput
                  value={fee}
                  onChangeText={setFee}
                  keyboardType="numeric"
                  style={{ minWidth: 50, textAlign: 'right', fontSize: 16, fontWeight: 'bold', color: '#171717', paddingVertical: 0 }}
                />
              </View>
            </View>
            <View style={{ marginBottom: 16, height: 1, backgroundColor: '#f5f5f5', width: '100%' }} />
            <View className="flex-row justify-between items-center">
              <Text className="text-neutral-500 font-medium text-base">Estimated Arrival</Text>
              <Text className="text-[#00B972] font-bold text-base">Instant</Text>
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            style={{ marginTop: 40 }}
            className="w-full bg-[#00B972] rounded-2xl py-4 items-center justify-center shadow-md flex-row"
          >
            <Text className="text-white font-bold text-lg mr-2">Confirm Withdrawal</Text>
          </TouchableOpacity>

          {/* Transaction Details Modal */}
          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setIsModalVisible(false)}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setIsModalVisible(false)}
              style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
              <TouchableOpacity activeOpacity={1} style={{ backgroundColor: 'white', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 32, width: '100%' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#171717', marginBottom: 32 }}>Transaction details</Text>

                <View style={{ marginBottom: 40 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <Text style={{ color: '#404040', fontSize: 16 }}>Recipient Account</Text>
                    <Text style={{ color: '#171717', fontSize: 16 }}>{accountNumber || '9123474481'}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <Text style={{ color: '#404040', fontSize: 16 }}>Bank Name</Text>
                    <Text style={{ color: '#171717', fontSize: 16 }}>Opay</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <Text style={{ color: '#404040', fontSize: 16 }}>Recipient Name</Text>
                    <Text style={{ color: '#171717', fontSize: 16 }}>Rebecca Ann</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: '#404040', fontSize: 16 }}>Amount</Text>
                    <Text style={{ color: '#00B972', fontSize: 16 }}>₦{Number(amount).toLocaleString('en-US')}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible(false);
                    setTimeout(() => setIsPinModalVisible(true), 300);
                  }}
                  style={{ width: '100%', backgroundColor: '#00B972', borderRadius: 12, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Proceed</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>

          {/* PIN Entry Modal */}
          <Modal
            visible={isPinModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setIsPinModalVisible(false)}
            onShow={() => {
              setTimeout(() => {
                pinInputRef.current?.focus();
              }, 100);
            }}
          >
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
              <TouchableOpacity 
                activeOpacity={1} 
                onPress={() => {
                  pinInputRef.current?.blur();
                  setIsPinModalVisible(false);
                }} 
                style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}
              >
                <TouchableOpacity activeOpacity={1} onPress={() => pinInputRef.current?.focus()} style={{ backgroundColor: 'white', borderTopLeftRadius: 32, borderTopRightRadius: 32, width: '100%', paddingTop: 40, paddingBottom: 60 }}>
                  
                  {/* Header Text */}
                  <View style={{ paddingHorizontal: 32, alignItems: 'center', marginBottom: 40 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#171717', textAlign: 'center', lineHeight: 24 }}>
                      ₦{Number(amount).toLocaleString('en-US')} will be deducted from your{'\n'}current balance - <Text style={{ color: '#00B972' }}>₦{availableBalance.toLocaleString('en-US', {minimumFractionDigits: 2})}</Text>
                    </Text>
                    
                    <Text style={{ fontSize: 16, color: '#171717', marginTop: 32 }}>Enter 4-digit pin</Text>
                  </View>

                  {/* Hidden Input */}
                  <TextInput
                    ref={pinInputRef}
                    value={pin}
                    onChangeText={(val) => {
                      const num = val.replace(/[^0-9]/g, '');
                      if (num.length <= 4) setPin(num);
                    }}
                    keyboardType="number-pad"
                    maxLength={4}
                    style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }}
                    caretHidden={true}
                  />

                  {/* PIN Boxes */}
                  <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16 }}>
                    {[0, 1, 2, 3].map((index) => (
                      <View 
                        key={index}
                        style={{ 
                          width: 56, 
                          height: 56, 
                          borderRadius: 16, 
                          borderWidth: 1, 
                          borderColor: pin.length > index ? '#00B972' : '#d4d4d4', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          backgroundColor: 'white'
                        }}
                      >
                        {pin.length > index && (
                          <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#171717' }} />
                        )}
                      </View>
                    ))}
                  </View>

                </TouchableOpacity>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </Modal>

          {/* Status Modal */}
          <Modal
            visible={isStatusModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setIsStatusModalVisible(false)}
          >
            <TouchableOpacity 
              activeOpacity={1} 
              onPress={() => setIsStatusModalVisible(false)} 
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 24 }}
            >
              <TouchableOpacity activeOpacity={1} style={{ backgroundColor: 'white', borderRadius: 32, width: '100%', paddingVertical: 50, paddingHorizontal: 32, alignItems: 'center' }}>
                
                <View style={{ width: 110, height: 110, borderRadius: 55, backgroundColor: statusType === 'success' ? '#00B972' : '#ef4444', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
                  <Feather name={statusType === 'success' ? "check" : "x"} size={50} color="white" />
                </View>

                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#171717', textAlign: 'center' }}>
                  {statusType === 'success' ? 'Withdrawal Successful' : 'Withdrawal Failed'}
                </Text>

              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
