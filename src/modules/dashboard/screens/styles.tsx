import { dimensionHeight, dimensionWidth } from "@shared/utils/constant"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatlist: {
        paddingVertical: dimensionHeight * 0.02,
        paddingHorizontal: dimensionWidth * 0.04
    },
    wrapText: {
        marginVertical: dimensionHeight * 0.015
    },
    textCenter: {
        textAlign: 'center'
    },
})

export default styles