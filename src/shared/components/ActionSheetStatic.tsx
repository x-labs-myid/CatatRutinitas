import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { white } from "@shared/utils/constant";

const ActionSheetStatic = ({ children } : { children: ReactNode }) => {
    return (
        <>
            <View style={styles.container}>
                {children}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 'auto',
        width: 'auto',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: white,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        borderWidth: 0.5,
        borderColor: 'black',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})
export default ActionSheetStatic