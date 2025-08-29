import { NavigationContainer } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View } from 'react-native'
import StackNavigation from './stack'

const Navigation = () => {
    const insets = useSafeAreaInsets()
    return (
        <NavigationContainer>
            <View 
                style={{ 
                    flex: 1,
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                }}
            >
                <StackNavigation />
            </View>
        </NavigationContainer>
    )
}

export default Navigation