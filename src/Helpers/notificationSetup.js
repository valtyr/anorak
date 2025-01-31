import {Platform} from 'react-native';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';


export const registerForNotifications = async mutation => {
  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('general', {
      name: 'General Notifications',
      sound: true
    });
  }

  const {status: existingStatus} = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();
  mutation(token);
};
