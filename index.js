/**
 * @format
 */

import { AppRegistry } from 'react-native';
import notifee, { EventType } from '@notifee/react-native';
import App from './src/App';
import { name as appName } from './app.json';

// Background event handler untuk notifikasi
notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification } = detail;
  
  // Ketika notifikasi sleep ditampilkan atau diklik, jadwalkan ulang untuk besok
  if (notification?.id === 'reminder-sleep') {
    if (type === EventType.DELIVERED || type === EventType.PRESS) {
      // Notifikasi akan dijadwalkan ulang saat app dibuka berikutnya
      // karena kita tidak bisa import hooks di sini
      console.log('Sleep notification delivered/pressed, will reschedule on next app open');
    }
  }
});

AppRegistry.registerComponent(appName, () => App);
