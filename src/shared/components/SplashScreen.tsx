import { white } from "@shared/utils/constant"
import { View, StyleSheet, Image } from "react-native"

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={require('@assets/imgs/splashScreen.png')} style={styles.image}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white,
    },
    image: {
        width: 250,
        height: 250,
    }
})

export default SplashScreen
