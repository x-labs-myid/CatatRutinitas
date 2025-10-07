import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import useGlobal from "@shared/hooks"
import ActionSheet from "react-native-actions-sheet"

const BottomSheetInfo = ({ id }: { id: string }) => {
    const { translateGlobal } = useGlobal()
    return (
        <ActionSheet id={id} gestureEnabled>
            <View style={styles.container}>
                <Text variant="titleMedium">{translateGlobal('Belum ada info terbaru')}</Text>
            </View>
        </ActionSheet>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default BottomSheetInfo