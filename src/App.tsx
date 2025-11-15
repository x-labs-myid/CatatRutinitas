import { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import mobileAds from 'react-native-google-mobile-ads';
import Navigation from './navigation';
import { setupNotification } from '@shared/utils';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  useEffect(() => {
    mobileAds()
    .initialize()
    .then(() => console.log("Mobile Ads initialized"));
    setupNotification()
  }, [])

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Navigation />
    </SafeAreaProvider>
  );
}

export default App;
