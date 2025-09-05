import { dimensionHeight, primary } from "@shared/utils/constant"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapText: {
        marginVertical: dimensionHeight * 0.015
    },
    textCenter: {
        textAlign: 'center'
    },
    wrapIcon: {
        padding: 3,
        borderWidth: 2,
        borderColor: primary,
        borderRadius: '100%',
    }
})

export default styles