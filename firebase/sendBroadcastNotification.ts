import { getAllPushTokens } from './notifications';

/**
 * Sends a broadcast notification to all users
 */
export const sendBroadcastNotification = async (
  title: string,
  body: string,
  authorName: string
): Promise<boolean> => {
  try {
    const tokens = await getAllPushTokens();

    if (tokens.length === 0) {
      console.log('No push tokens found');
      return false;
    }

    const expoToken = process.env.EXPO_PUBLIC_PUSH_TOKEN || '';
    const message = {
      to: tokens,
      sound: 'default',
      title: title,
      body: `${authorName}: ${body}`,
      data: {
        type: 'new_post',
        title: title,
      },
      ttl: 24 * 60 * 60,
      priority: 'high',
    };

    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log('Broadcast notification sent successfully:', responseData);
      return true;
    } else {
      console.error('Error sending notification:', responseData);
      return false;
    }
  } catch (error) {
    console.error('Error in sendBroadcastNotification:', error);
    return false;
  }
};
