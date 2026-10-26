import { dark_gray, dimensionHeight, dimensionWidth, font, fontStandard, white } from "@shared/utils/constant";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: dimensionWidth * 0.05,
        paddingVertical: dimensionHeight * 0.015,
        paddingBottom: dimensionHeight * 0.12,
    },
    card: {
        marginBottom: dimensionHeight * 0.015,
        backgroundColor: white,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    cardContent: {
        paddingVertical: dimensionHeight * 0.012,
        gap: 10,
    },
    inputText: {
        marginVertical: 4,
        fontFamily: font.Regular,
        fontSize: fontStandard,
        backgroundColor: 'transparent',
    },
    reminderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    reminderInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderWidth: 1,
        borderColor: dark_gray,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    reminderText: {
        flex: 1,
        fontFamily: font.Regular,
        fontSize: fontStandard,
    },
    reminderBtn: {
        borderRadius: 999,
        overflow: 'hidden',
    }
})

export default styles
