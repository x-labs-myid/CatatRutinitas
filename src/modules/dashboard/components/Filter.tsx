import { sizeIconMedium, dark_gray, dimensionHeight, dimensionWidth, light_gray, white } from "@shared/utils/constant"
import { useAtom } from "jotai"
import { themeAtom } from "@shared/atom/atomSetting"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Icon } from "react-native-paper"

const Filter = ({ isCompleted, onPress }: { isCompleted: boolean, onPress: (type: boolean) => void }) => {
    const [theme] = useAtom(themeAtom)
    return (
        <View style={styles.container}>
            <View style={styles.tab}>
                <TouchableOpacity style={{...styles.tabBtn, backgroundColor: isCompleted ? white : light_gray}} onPress={() => onPress(!isCompleted)}>
                    <Icon source="clock-outline" size={sizeIconMedium} color={isCompleted ? dark_gray : theme!} />
                </TouchableOpacity>
            </View>
            <View style={styles.tab}>
                <TouchableOpacity style={{...styles.tabBtn, backgroundColor: isCompleted ? light_gray : white}} onPress={() => onPress(!isCompleted)}>
                    <Icon source="check-circle" size={sizeIconMedium} color={isCompleted ? theme! : dark_gray} />
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between', // optional, bisa juga pakai 'center'
        alignItems: 'center',
        width: dimensionWidth / 2,
        position: 'absolute',
        bottom: dimensionHeight * 0.04,
        left: dimensionWidth / 4,
        backgroundColor: white,
        opacity: 0.9,
        zIndex: 1,
        borderWidth: 1,
        borderColor: dark_gray,
        borderRadius: 50,
        shadowColor: dark_gray,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 1,
    },

    tab: {
        flex: 1, // agar lebar sama rata
        marginHorizontal: 4, // jarak antar tab
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    tabBtn: {
        padding: 10,
        borderRadius: 100,
        borderColor: light_gray,
        borderWidth: 0.7,
    },
})

export default Filter