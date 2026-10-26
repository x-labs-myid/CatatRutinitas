import { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import mobileAds from 'react-native-google-mobile-ads';
import notifee, { EventType } from '@notifee/react-native';
import Navigation from './navigation';
import { setupNotification, scheduleSleepNotification } from '@shared/utils';
import { listWordSleepNotification } from '@shared/utils/constant';
import useGlobal from '@shared/hooks';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'
  const { translateGlobal, getRandomSleepNotification } = useGlobal()
  const titleNotificationSleep = translateGlobal('Tidur Dulu') || 'Tidur Dulu'
  const bodyNotificationSleep = getRandomSleepNotification() || listWordSleepNotification[0]

  useEffect(() => {
    mobileAds()
      .initialize()
      .then(() => console.log("Mobile Ads initialized"));
    setupNotification()

    // Jadwalkan notifikasi tidur jam 22:00 setiap kali app dibuka
    scheduleSleepNotification({
      id: 'reminder-sleep',
      title: titleNotificationSleep,
      body: bodyNotificationSleep
    });

    // Foreground event handler
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      if (detail.notification?.id === 'reminder-sleep') {
        if (type === EventType.DELIVERED || type === EventType.PRESS) {
          // Jadwalkan ulang untuk besok dengan pesan baru
          scheduleSleepNotification({
            id: 'reminder-sleep',
            title: titleNotificationSleep,
            body: bodyNotificationSleep
          });
        }
      }
    });

    return () => unsubscribe();
  }, [])

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Navigation />
    </SafeAreaProvider>
  );
}

export default App;
