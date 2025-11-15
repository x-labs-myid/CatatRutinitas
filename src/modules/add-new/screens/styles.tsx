import { dark_gray, dimensionHeight, dimensionWidth, font, fontStandard, white } from "@shared/utils/constant";
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
        fontSize: fontStandard,
        backgroundColor: white
    },
    reminder: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 4 },
    reminderText: { flex: 0.8, borderColor: dark_gray, borderWidth: 1, padding: 10, borderRadius: 5 },
    reminderBtn: { flex: 0.2 }
})

export default styles