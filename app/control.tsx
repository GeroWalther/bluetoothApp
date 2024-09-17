import { useRouter } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, View, Platform, StyleSheet, Text } from 'react-native';

import Button from './components/Button';
import Input from './components/TextInput';
import TrackPad from './components/TrackPad';

const KeyboardMouseScreen = () => {
  const router = useRouter();
  const [input, onChangeInput] = React.useState('');
  const [deviceName, _setDeviceName] = React.useState('Geros Mac');
  return (
    <KeyboardAvoidingView
      contentContainerStyle={styles.screen}
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
      keyboardVerticalOffset={Platform.OS === 'ios' ? 500 : 100}>
      <View>
        <View className="">
          <Button
            disconnect
            onPress={() => {
              // TODO: Disconnect the Bluetooth connection and navigate back to the main screen.
              router.navigate('/');
            }}>
            Disconnect
          </Button>
          <Text className="text-center text-lg font-semibold">Connected to: {deviceName}</Text>
        </View>
        <View>
          <Input onChangeText={onChangeInput} value={input} />
          <TrackPad />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default KeyboardMouseScreen;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
