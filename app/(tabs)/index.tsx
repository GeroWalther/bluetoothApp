import { Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

import { Button } from '~/components/Button';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Connect to PC', headerTintColor: 'white' }} />
      <View style={styles.container} className="justify-around bg-blue-500">
        <Text className=" self-center text-3xl text-white">Bluetooth Keyboard App</Text>
        <Button title="Connect" onPress={() => {}} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
