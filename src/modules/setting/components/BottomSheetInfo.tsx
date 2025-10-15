import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import useGlobal from "@shared/hooks"
import ActionSheet from "react-native-actions-sheet"
import { dimensionHeight } from "@shared/utils/constant"

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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: dimensionHeight * 0.2
    }
})

export default BottomSheetInfo