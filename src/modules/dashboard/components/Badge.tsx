import useGlobal from "@shared/hooks"
import { dark_gray, white } from "@shared/utils/constant"
import { StyleSheet, Text, View } from "react-native"
import { useAtom } from "jotai"
import { themeAtom } from "@shared/atom/atomSetting"
import { Icon } from "react-native-paper"

const Badge = ({ isComplete } : { isComplete: boolean }) => {
    const { translateGlobal } = useGlobal()
    const [theme] = useAtom(themeAtom)
    return (
        <View style={{...styles.container, backgroundColor: isComplete ? theme! : dark_gray}}>
            <Icon source={isComplete ? 'check' : 'alert'} color={white} size={10} />
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
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        marginHorizontal: 16
    },
    text: {
        color: white,
        textAlign: 'center',
        fontSize: 10  
    }
})

export default Badge