import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { collection, doc, setDoc, arrayUnion, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * Requests notification permissions and returns the Expo push token
 */
export const requestNotificationPermissions = async (): Promise<string | null> => {
  if (!Device.isDevice) {
    console.log('Must use physical device for Push Notifications');
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Failed to get push token for push notification!');
    return null;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Expo Push Token:', token);
  return token;
};

/**
 * Saves the user's push token to Firestore
 */
export const savePushToken = async (userId: string, token: string): Promise<void> => {
  if (!token || !userId) return;

  try {
    const userTokensRef = doc(db, 'pushTokens', userId);
    await setDoc(
      userTokensRef,
      {
        tokens: arrayUnion(token),
        updatedAt: new Date(),
      },
      { merge: true }
    );
    console.log('Push token saved to Firestore');
  } catch (error) {
    console.error('Error saving push token:', error);
  }
};

/**
 * Get all push tokens from Firestore for broadcasting
 */
export const getAllPushTokens = async (): Promise<string[]> => {
  try {
    const tokensSnapshot = await getDocs(collection(db, 'pushTokens'));
    const allTokens: string[] = [];

    tokensSnapshot.forEach((doc) => {
      const tokens = doc.data().tokens || [];
      allTokens.push(...tokens);
    });

    return [...new Set(allTokens)]; // Remove duplicates
  } catch (error) {
    console.error('Error fetching push tokens:', error);
    return [];
  }
};

/**
 * Setup listener for push token changes (called on app start)
 */
export const setupPushTokenListener = (userId: string) => {
  const unsubscribe = Notifications.addNotificationResponseListener((response) => {
    console.log('User interacted with notification:', response);
  });

  return unsubscribe;
};
