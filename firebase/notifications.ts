import { Platform } from 'react-native';
import { doc, setDoc, arrayUnion, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Configure how notifications are displayed (native only)
if (Platform.OS !== 'web') {
  try {
    const Notifications = require('expo-notifications');
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  } catch {
    // expo-notifications not available in this environment
  }
}

export const requestNotificationPermissions = async (): Promise<string | null> => {
  if (Platform.OS === 'web') return null;
  try {
    const Device = require('expo-device');
    const Notifications = require('expo-notifications');
    if (!Device.isDevice) return null;
    const { status: existing } = await Notifications.getPermissionsAsync();
    let finalStatus = existing;
    if (existing !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') return null;
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);
    return token;
  } catch (error) {
    console.log('Notifications not available:', error);
    return null;
  }
};

export const savePushToken = async (userId: string, token: string): Promise<void> => {
  if (!token || !userId) return;
  try {
    await setDoc(
      doc(db, 'pushTokens', userId),
      { tokens: arrayUnion(token), updatedAt: new Date() },
      { merge: true }
    );
  } catch (error) {
    console.error('Error saving push token:', error);
  }
};

// Full flow: request permissions + save token (used by (tabs)/_layout.tsx)
export const registerPushToken = async (userId: string): Promise<void> => {
  if (Platform.OS === 'web') return;
  try {
    const token = await requestNotificationPermissions();
    if (token) await savePushToken(userId, token);
  } catch (error) {
    console.log('Push notifications not available:', error);
  }
};

export const getAllPushTokens = async (): Promise<string[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'pushTokens'));
    const allTokens: string[] = [];
    snapshot.forEach((d) => allTokens.push(...(d.data().tokens || [])));
    return [...new Set(allTokens)];
  } catch (error) {
    console.error('Error fetching push tokens:', error);
    return [];
  }
};

// Broadcast notification to all users (used by create.tsx)
export const notifyAllUsers = async (title: string, body: string): Promise<void> => {
  try {
    const tokens = await getAllPushTokens();
    if (tokens.length === 0) return;
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: tokens, title, body, sound: 'default' }),
    });
  } catch (error) {
    console.error('Error sending broadcast notification:', error);
  }
};

export const setupPushTokenListener = (_userId?: string) => {
  if (Platform.OS === 'web') return () => {};
  try {
    const Notifications = require('expo-notifications');
    return Notifications.addNotificationResponseClearedListener(() => {});
  } catch {
    return () => {};
  }
};
