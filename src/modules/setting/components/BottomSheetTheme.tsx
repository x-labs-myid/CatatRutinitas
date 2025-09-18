import { dark, green, primary, red, yellow } from "@shared/utils/constant"
import { View } from "react-native"
import ActionSheet from "react-native-actions-sheet"
import { List } from "react-native-paper"

const BottomSheetTheme = ({ id }: { id: string }) => {
    return (
        <ActionSheet id={id} gestureEnabled>
            <List.Section title="Tema">
                <List.Item
                    title="Blue"
                    left={props => <List.Icon {...props} color={dark} icon="palette" />}
                    right={() => <View style={{ backgroundColor: primary, width: 20, height: 20, borderRadius: 100 }}></View>}
                />
                <List.Item
                    title="Red"
                    left={props => <List.Icon {...props} color={dark} icon="palette" />}
                    right={() => <View style={{ backgroundColor: red, width: 20, height: 20, borderRadius: 100 }}></View>}
                />
                <List.Item
                    title="Green"
                    left={props => <List.Icon {...props} color={dark} icon="palette" />}
                    right={() => <View style={{ backgroundColor: green, width: 20, height: 20, borderRadius: 100 }}></View>}
                />
                <List.Item
                    title="Yellow"
                    left={props => <List.Icon {...props} color={dark} icon="palette" />}
                    right={() => <View style={{ backgroundColor: yellow, width: 20, height: 20, borderRadius: 100 }}></View>}
                />
            </List.Section>
        </ActionSheet>
    )
}

export default BottomSheetTheme