import { dark, dark_gray, dimensionHeight, dimensionWidth, light_gray, white } from "@shared/utils/constant"
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
                    <Icon source="clock-outline" size={28} color={isCompleted ? dark_gray : theme!} />
                </TouchableOpacity>
            </View>
            <View style={styles.tab}>
                <TouchableOpacity style={{...styles.tabBtn, backgroundColor: isCompleted ? light_gray : white}} onPress={() => onPress(!isCompleted)}>
                    <Icon source="check-circle" size={28} color={isCompleted ? theme! : dark_gray} />
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
        backgroundColor: 'white',
        zIndex: 1,
        borderRadius: 50,
        shadowColor: dark_gray,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
    },
})

export default Filter