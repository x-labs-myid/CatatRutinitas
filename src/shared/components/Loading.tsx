import { View, ActivityIndicator, StyleSheet } from "react-native"
import { useAtom } from "jotai"
import { themeAtom } from "@shared/atom/atomSetting"

const Loading = () => {
    const [theme] = useAtom(themeAtom)
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={theme!} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Loading
