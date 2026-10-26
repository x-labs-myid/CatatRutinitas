import { dimensionHeight, dimensionWidth, fontStandard, fontTitle, sizeIconExtra, sizeIconRegular, sizeIconSmall, white } from "@shared/utils/constant"
import { useAtom } from "jotai"
import { StyleSheet, View } from "react-native"
import { Icon, Text } from "react-native-paper"
import { themeAtom } from "@shared/atom/atomSetting"
import useGlobal from "@shared/hooks"

const Info = ({ totalRoutines, isCompleted }: { totalRoutines: number, isCompleted: boolean }) => {
    const [theme] = useAtom(themeAtom)
    const { translateGlobal } = useGlobal()
    return (
        <View style={{...styles.container, backgroundColor: theme!}}>
            <View style={styles.wrapInfo}>
                <View style={{ flex: 0.9 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: fontTitle }}>{translateGlobal(`Kamu punya`)} </Text>
                        <Icon source="information-outline" size={sizeIconSmall} color={theme!} />
                    </View>
                    <View style={styles.wrapTitleRoutine}>
                        <Text style={{ fontSize: fontTitle }}>{!!totalRoutines ? totalRoutines : 0} {translateGlobal(`Rutinitas`)} </Text>
                    </View>
                    <Text style={{ fontSize: fontStandard }}>{isCompleted ? translateGlobal(`Yang udah kamu selesain`): translateGlobal(`Yang belum kamu selesain`)} </Text>
                </View>
                <View>
                    <Icon source={isCompleted ? 'check-circle' : 'clock-outline'} size={sizeIconExtra} color={theme!} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: dimensionHeight * 0.02,
        paddingBottom: dimensionHeight * 0.02,
        paddingHorizontal: dimensionWidth * 0.04,
        borderBottomStartRadius: dimensionWidth * 0.03,
        borderBottomEndRadius: dimensionWidth * 0.03
    },
    wrapInfo: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: white, padding: dimensionWidth * 0.035, borderRadius: dimensionWidth * 0.02},
    wrapTitleRoutine: {
        marginVertical: dimensionHeight * 0.01
    }
})

export default Info