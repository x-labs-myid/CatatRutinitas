import { NavigationContainer } from '@react-navigation/native'
import RNBootSplash from "react-native-bootsplash"
import StackNavigation from './stack'
import { useAtom } from 'jotai'
import { userAtom, themeAtom, languageAtom, feelAtom } from '@shared/atom/atomSetting'
import { Indonesia, primary, regular } from '@shared/utils/constant'

const Navigation = () => {
    const [user] = useAtom(userAtom)
    const [theme, setTheme] = useAtom(themeAtom)
    const [language, setLanguage] = useAtom(languageAtom)
    const [feel, setFeel] = useAtom(feelAtom)
    
    const isReady = () => {
        if(!theme) setTheme(primary)
        if(!language) setLanguage(Indonesia)
        if(!feel) setFeel(regular)
        RNBootSplash.hide({ fade: true })
    }
    return (
        <NavigationContainer onReady={isReady}>
            <StackNavigation user={user} theme={theme!}/>
        </NavigationContainer>
    )
}

export default Navigation