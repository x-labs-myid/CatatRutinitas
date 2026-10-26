import { dark, green, primary, red, yellow, black } from "@shared/utils/constant"
import { View } from "react-native"
import ActionSheet from "react-native-actions-sheet"
import { List } from "react-native-paper"
import { useAtom } from "jotai"
import { themeAtom } from "@shared/atom/atomSetting"
import useGlobal from "@shared/hooks"

const BottomSheetTheme = ({ id }: { id: string }) => {
    const [theme, setTheme] = useAtom(themeAtom)
    const { translateGlobal } = useGlobal()
    return (
        <ActionSheet id={id} gestureEnabled>
            <List.Section title={translateGlobal('Tema')}>
                <List.Item
                    title={translateGlobal('Biru')}
                    left={props => <List.Icon {...props} color={ theme === primary ? theme! : dark} icon="palette" />}
                    right={() => <View style={{ backgroundColor: primary, width: 20, height: 20, borderRadius: 100 }}></View>}
                    onPress={() => setTheme(primary)}
                />
                <List.Item
                    title={translateGlobal('Merah')}
                    left={props => <List.Icon {...props} color={ theme === red ? theme! : dark} icon="palette" />}
                    right={() => <View style={{ backgroundColor: red, width: 20, height: 20, borderRadius: 100 }}></View>}
                    onPress={() => setTheme(red)}
                />
                <List.Item
                    title={translateGlobal('Hijau')}
                    left={props => <List.Icon {...props} color={ theme === green ? theme! : dark} icon="palette" />}
                    right={() => <View style={{ backgroundColor: green, width: 20, height: 20, borderRadius: 100 }}></View>}
                    onPress={() => setTheme(green)}
                />
                <List.Item
                    title={translateGlobal('Kuning')}
                    left={props => <List.Icon {...props} color={ theme === yellow ? theme! : dark} icon="palette" />}
                    right={() => <View style={{ backgroundColor: yellow, width: 20, height: 20, borderRadius: 100 }}></View>}
                    onPress={() => setTheme(yellow)}
                />
                <List.Item
                    title={translateGlobal('Hitam')}
                    left={props => <List.Icon {...props} color={ theme === black ? theme! : dark} icon="palette" />}
                    right={() => <View style={{ backgroundColor: black, width: 20, height: 20, borderRadius: 100 }}></View>}
                    onPress={() => setTheme(black)}
                />
            </List.Section>
        </ActionSheet>
    )
}

export default BottomSheetTheme
