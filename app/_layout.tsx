import { StatusBar } from 'expo-status-bar';
import '../global.css';

import { Stack } from 'expo-router';
import { Container } from '~/components/Container';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <Container>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="control" options={{ headerShown: false }} />
        <Stack.Screen
          name="bluetoothListModal"
          options={{ presentation: 'modal', headerShown: false }}
        />
      </Stack>
    </Container>
  );
}
