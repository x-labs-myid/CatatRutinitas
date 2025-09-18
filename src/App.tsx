import { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';
import { setupNotification } from '@shared/utils';
import { primary } from '@shared/utils/constant';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setupNotification()
    setTimeout(() => {
      setLoading(false)
    }, 500);
  }, [])

  if(loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={primary}/>
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Navigation />
    </SafeAreaProvider>
  );
}

export default App;
