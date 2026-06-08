import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { requestNotificationPermissions, savePushToken, setupPushTokenListener } from '../firebase/notifications';

export default function RootLayout() {
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await requestNotificationPermissions();
          if (token) {
            await savePushToken(user.uid, token);
          }
          setupPushTokenListener(user.uid);
        } catch (error) {
          console.error('Error setting up notifications:', error);
        }
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="connexion_phone" />
      <Stack.Screen name="blog/[slug]" />
    </Stack>
  );
}
