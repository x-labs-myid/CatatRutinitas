import { dimensionHeight, dimensionWidth, font, fontExtra, fontStandard, fontTitle, white } from "@shared/utils/constant"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: dimensionWidth * 0.04,
        paddingVertical: dimensionHeight * 0.01,
    },
    cardName: {
        marginVertical: dimensionHeight * 0.005,
    },
    cardSetting: {
        backgroundColor: white,
        marginTop: dimensionHeight * 0.015,
    },
    inputText: {
        fontFamily: font.Regular,
        backgroundColor: white
    },
    wrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: dimensionHeight * 0.015
    },
    text: {
        fontFamily: font.Regular,
        color: white,
        fontSize: fontExtra,
        fontWeight: 'bold'
    },
    textHeader: {
        fontFamily: font.Bold,
        fontSize: fontTitle
    },
    textList: {
        fontFamily: font.Regular,
        fontSize: fontStandard
    }
})

export default styles
