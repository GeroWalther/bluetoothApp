import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';

import Button from './components/Button';

export default function BluetoothListModalScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl">
        This is a modal where we want to dispay a list of available bluetooth devices and connect to
        them onPress. Then once connected we want to programatically navigate to the
        KeyboardMouseScreen from where we control the PC.
      </Text>
      <Button onPress={() => router.back()}>Back</Button>
      {/*TODO Display a list of available bluetooth devices*/}
    </View>
  );
}
