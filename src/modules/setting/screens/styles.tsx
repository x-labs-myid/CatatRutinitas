import { font, fontStandard, fontTitle } from "@shared/utils/constant"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textHeader: {
        fontFamily: font.BrandonBold,
        fontSize: fontTitle
    },
    textList: {
        fontFamily: font.BrandonRegular,
        fontSize: fontStandard
    }
})

export default styles
