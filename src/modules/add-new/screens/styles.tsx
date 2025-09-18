import { dimensionHeight, dimensionWidth, font, white } from "@shared/utils/constant";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: dimensionWidth * 0.05,
        paddingVertical: dimensionHeight * 0.01,
    },
    inputText: {
        marginVertical: 5,
        fontFamily: font.BrandonRegular,
        backgroundColor: white
    }
})

export default styles