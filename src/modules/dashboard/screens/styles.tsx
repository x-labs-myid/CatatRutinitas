import { dimensionHeight, dimensionWidth } from "@shared/utils/constant"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    flatlist: {
        paddingTop: dimensionHeight * 0.02,
        paddingBottom: dimensionHeight * 0.09,
        paddingHorizontal: dimensionWidth * 0.04
    },
    textCenter: {
        textAlign: 'center'
    },
    emptyList: {
        marginTop: dimensionHeight * 0.4,
        alignItems: 'center'
    }
})

export default styles