import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

import Button from './components/Button';

const MainScreen = () => {
  const router = useRouter();
  function handleScan() {
    // TODO scan available devices close to user and send them to the modal to display a list of devices from there.
    router.push('/bluetoothListModal');
  }
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.view}
      className="bg-blue-500">
      <View>
        <Text className="text-2xl font-semibold text-white">Bluetooth Keyboard & Mouse app</Text>
        <Button onPress={handleScan}>Connect to PC via Bluetooth</Button>
        <Button onPress={() => router.navigate('/control')}>Navigate to Keyboard Screen.</Button>
      </View>
    </ScrollView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  view: { justifyContent: 'center', alignItems: 'center', flex: 1 },
});
