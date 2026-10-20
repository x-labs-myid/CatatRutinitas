import { StyleSheet } from "react-native"
import { dimensionHeight, dimensionWidth, font, fontStandard, fontTitle, white } from "@shared/utils/constant"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textCenter: {
        textAlign: 'center',
        fontFamily: font.Regular
    },
    textTitle: {
        fontFamily: font.Regular,
        fontSize: fontTitle
    },
    textDesc: {
        fontFamily: font.Regular,
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
        marginBottom: 10,
        backgroundColor: white,
        width: dimensionWidth * 0.85
    },
})

export default styles