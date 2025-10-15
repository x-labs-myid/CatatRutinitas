import { dimensionHeight, dimensionWidth } from "@shared/utils/constant"
import { useAtom } from "jotai"
import { StyleSheet, View } from "react-native"
import { Icon, Text } from "react-native-paper"
import { themeAtom } from "@shared/atom/atomSetting"
import useGlobal from "@shared/hooks"

const Info = ({ totalRoutines, isCompleted }: { totalRoutines: number, isCompleted: boolean }) => {
    const [theme] = useAtom(themeAtom)
    const { translateGlobal } = useGlobal()
    return (
        <View style={styles.container}>
            <View>
                <Text variant="titleMedium">{translateGlobal(`Kamu punya`)} <Icon source="information-outline" size={18} color={theme!} /></Text>
                <View style={styles.wrapRoutine}>
                    <Text variant="titleLarge">{totalRoutines} {translateGlobal(`Rutinitas`)} </Text>
                </View>
                <Text variant="bodyMedium">{isCompleted ? translateGlobal(`Yang udah kamu selesain`): translateGlobal(`Yang belum kamu selesain`)} </Text>
            </View>
            <View>
                <Icon source={isCompleted ? 'check-circle' : 'clock-outline'} size={64} color={theme!} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: dimensionHeight * 0.04,
        paddingBottom: dimensionHeight * 0.02,
        paddingHorizontal: dimensionWidth * 0.07
    },
    wrapRoutine: {
        marginVertical: dimensionHeight * 0.01
    }
})

export default Info