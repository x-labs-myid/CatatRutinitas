import { dimensionHeight, dimensionWidth, font } from "@shared/utils/constant";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: dimensionWidth * 0.05,
        paddingVertical: dimensionHeight * 0.01,
        // flex: 0.2,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    inputText: {
        marginVertical: 5,
        fontFamily: font.BrandonRegular
    }
})

export default styles