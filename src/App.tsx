import { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';
import { setupNotification } from '@shared/utils';
import { Indonesia, primary, regular } from '@shared/utils/constant';
import { feelAtom, languageAtom, themeAtom } from '@shared/atom/atomSetting';
import { useAtom } from 'jotai';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'
  const [loading, setLoading] = useState<boolean>(true)
  const [theme, setTheme] = useAtom(themeAtom)
  const [language, setLanguage] = useAtom(languageAtom)
  const [feel, setFeel] = useAtom(feelAtom)

  useEffect(() => {
    if(!theme) setTheme(primary)
    if(!language) setLanguage(Indonesia)
    if(!feel) setFeel(regular)
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
