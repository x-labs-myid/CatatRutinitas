<<<<<<< HEAD
﻿import { dark_gray, dimensionHeight, dimensionWidth, font, fontStandard, white } from "@shared/utils/constant";
=======
import { dark_gray, dimensionHeight, dimensionWidth, font, fontStandard, white } from "@shared/utils/constant";
>>>>>>> 947ca2c2a2c15dd8ed9f59135d6717fcc61e6749
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: dimensionWidth * 0.05,
        paddingVertical: dimensionHeight * 0.015,
        paddingBottom: dimensionHeight * 0.18,
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
<<<<<<< HEAD
        marginVertical: 4,
        fontFamily: font.Regular,
        fontSize: fontStandard,
        backgroundColor: 'transparent',
=======
        marginVertical: 5,
        fontFamily: font.Regular,
        fontSize: fontStandard,
        backgroundColor: white
>>>>>>> 947ca2c2a2c15dd8ed9f59135d6717fcc61e6749
    },
    reminderRow: {
        flexDirection: 'row',
        alignItems: 'center',
<<<<<<< HEAD
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
    },
    bottomBar: {
        position: 'absolute',
        bottom: dimensionHeight * 0.07,
        left: 0,
        right: 0,
        paddingHorizontal: dimensionWidth * 0.05,
        paddingVertical: dimensionHeight * 0.012,
        backgroundColor: 'transparent',
    }
=======
        marginTop: 10,
        gap: 4
    },
    reminderText: { flex: 0.8, borderColor: dark_gray, borderWidth: 1, padding: 10, borderRadius: 5},
    reminderBtn: { flex: 0.2 },
    wrapBtn: { position: 'absolute', bottom: 10, left: 0, right: 0, paddingHorizontal: dimensionWidth * 0.05, }
>>>>>>> 947ca2c2a2c15dd8ed9f59135d6717fcc61e6749
})

export default styles
