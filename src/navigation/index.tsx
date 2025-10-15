import { NavigationContainer } from '@react-navigation/native'
import RNBootSplash from "react-native-bootsplash"
import StackNavigation from './stack'

const Navigation = () => {
    
    return (
        <NavigationContainer onReady={() => RNBootSplash.hide({ fade: true })}>
            <StackNavigation/>
        </NavigationContainer>
    )
}

export default Navigation