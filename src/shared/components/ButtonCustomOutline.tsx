import { font, fontStandard, primary, white } from "@shared/utils/constant"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

const ButtonCustomOutline = ({ title, onPress }: { title: string, onPress: () => void }) => {
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
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: primary        
    },
    text: {
        color: primary,
        textAlign: 'center',
        fontFamily: font.BrandonRegular,
        fontSize: fontStandard
    }
})

export default ButtonCustomOutline