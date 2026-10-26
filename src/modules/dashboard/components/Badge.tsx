import useGlobal from "@shared/hooks"
import { border_radius_button, dark_gray, fontSmall, sizeIconSmall, white } from "@shared/utils/constant"
import { StyleSheet, Text, View } from "react-native"
import { useAtom } from "jotai"
import { themeAtom } from "@shared/atom/atomSetting"
import { Icon } from "react-native-paper"

const Badge = ({ isComplete } : { isComplete: boolean }) => {
    const { translateGlobal } = useGlobal()
    const [theme] = useAtom(themeAtom)
    return (
        <View style={{...styles.container, backgroundColor: isComplete ? theme! : dark_gray}}>
            <Icon source={isComplete ? 'check' : 'alert'} color={white} size={sizeIconSmall} />
            <Text style={styles.text}>
                {isComplete ? translateGlobal(`Sukses`) : translateGlobal(`Gagal`)}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
        padding: 6,
        borderRadius: border_radius_button,
    },
    text: {
        color: white,
        textAlign: 'center',
        fontSize: fontSmall 
    }
})

export default Badge