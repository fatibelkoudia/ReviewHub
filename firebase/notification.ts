import * as Notifications from 'expo-notifications';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Enregistre le token de l'appareil dans Firestore
export const registerPushToken = async (userId: string) => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return;

  const token = (await Notifications.getExpoPushTokenAsync()).data;

  const tokenRef = doc(db, 'pushTokens', userId);
  await setDoc(tokenRef, { token }, { merge: true });
};

// Envoie une notif à tous les utilisateurs
export const notifyAllUsers = async (postTitle: string, body: string) => {
  const snapshot = await getDocs(collection(db, 'pushTokens'));
  const messages: object[] = [];

  snapshot.forEach((doc) => {
    const token = doc.data().token;
    if (token) {
      messages.push({
        to: token,
        sound: 'default',
        title: 'New publication !',
        body: postTitle,
      });
    }
  });

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer VOTRE_EXPO_ACCESS_TOKEN`
    },
    body: JSON.stringify(messages),
  });
};