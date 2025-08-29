import { useState } from "react"
import { primary } from "@utils/constant"
import { ScrollView, View } from "react-native"
import { List, Text } from "react-native-paper"
import styles from "./styles"
import ActionSheetStatic from "@components/ActionSheetStatic"
import ModalLanguage from "@components/setting/ModalLanguage"
import { useAtom } from "jotai"
import { userAtom } from "@store/persist"

const SettingScreen = () => {
    const [visibleLang, setVisibleLang] = useState(false)
    const [user, setUser] = useAtom(userAtom)

    return (
        <>
            <View style={styles.container}>
                <Text variant="titleLarge" style={{ textAlign: 'center' }}>{user}</Text>
            </View>
            <ActionSheetStatic>
                <ScrollView>
                    <List.Section>
                        <List.Subheader style={styles.textHeader}>App</List.Subheader>
                        <List.Item 
                            title="Umum" 
                            titleStyle={styles.textList} 
                            left={() => <List.Icon color={primary} icon="cog" />} />
                        <List.Item
                            title="Tema"
                            titleStyle={styles.textList}
                            left={() => <List.Icon color={primary} icon="palette" />}
                        />
                        <List.Item
                            title="Bahasa"
                            titleStyle={styles.textList}
                            onPress={() => setVisibleLang(true)}
                            left={() => <List.Icon color={primary} icon="flag" />}
                        />
                    </List.Section>
                    <List.Section>
                        <List.Subheader style={styles.textHeader}>General</List.Subheader>
                        <List.Item 
                            title="Website" 
                            titleStyle={styles.textList} 
                            left={() => <List.Icon color={primary} icon="web" />} />
                        <List.Item
                            title="Tentang Kami"
                            titleStyle={styles.textList}
                            left={() => <List.Icon color={primary} icon="handshake" />}
                        />
                    </List.Section>
                </ScrollView>
            </ActionSheetStatic>
            <ModalLanguage visible={visibleLang} hideModal={() => setVisibleLang(false)} />
        </>
    )
}

export default SettingScreen