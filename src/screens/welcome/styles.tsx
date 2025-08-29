import { Dimensions, StyleSheet } from "react-native"
import { border_radius_button, dimensionHeight, dimensionWidth, font, fontStandard, fontTitle, primary, white } from "@utils/constant"

const styles = StyleSheet.create({
    container: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textCenter: {
        textAlign: 'center',
        fontFamily: font.BrandonRegular
    },
    textTitle: {
        fontFamily: font.BrandonRegular,
        fontSize: fontTitle
    },
    textDesc: {
        fontFamily: font.BrandonRegular,
        fontSize: fontStandard
    },
    wrapBottom: {
        width: dimensionWidth, 
        position: 'absolute', 
        bottom: dimensionHeight * 0.015, 
        padding: 10,
        backgroundColor: white
    },
    inputText: {
        marginBottom: 10
    },
    button: {
        width: '100%',
        paddingVertical: 10,
        borderRadius: border_radius_button,
        backgroundColor: primary
    }
})

export default styles