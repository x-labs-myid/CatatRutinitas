import { font, fontStandard, primary, white } from "@utils/constant"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

const ButtonCustom = ({ title, onPress }: { title: string, onPress: () => void }) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12.5,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: primary        
    },
    text: {
        color: white,
        textAlign: 'center',
        fontFamily: font.BrandonRegular,
        fontSize: fontStandard
    }
})

export default ButtonCustom