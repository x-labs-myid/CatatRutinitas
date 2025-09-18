import { useState } from "react"
import { dark, primary, white } from "@shared/utils/constant"
import { ScrollView, View, Text, Linking } from "react-native"
import { Button, Card, List, TextInput } from "react-native-paper"
import styles from "./styles"
import { useAtom } from "jotai"
import { descRoutineAtom, languageAtom, userAtom } from "@shared/jotai/atomSetting"
import ScrollKeyboard from "@shared/components/ScrollKeyboard"
import BottomSheetLanguage from "../components/BottomSheetLanguage"
import { SheetManager } from "react-native-actions-sheet"
import BottomSheetTheme from "../components/BottomSheetTheme"

const SettingScreen = () => {
    const [visibleLang, setVisibleLang] = useState(false)
    const [name, setName] = useState<string>('')
    const [user, setUser] = useAtom(userAtom)

    const [language, setLanguage] = useAtom(languageAtom)
    const [descRoutine, setDescRoutine] = useAtom(descRoutineAtom)

    const updateName = () => {
        setUser(name)
        setName('')
    }

    return (
        <>
            <ScrollKeyboard>
                <ScrollView contentContainerStyle={styles.container}>
                    <Card style={styles.cardName}>
                        <Card.Content>
                            <View style={styles.wrap}>
                                <Text style={styles.text}>{user?.toLocaleUpperCase()}</Text>
                                <Button
                                    mode="outlined"
                                    theme={{ colors: { outline: white } }}
                                    textColor={white}
                                    onPress={updateName}
                                    disabled={name === user || name === ''}
                                >Ubah</Button>
                            </View>
                            <TextInput
                                placeholder="Ubah nama kamu di sini"
                                mode='outlined'
                                activeOutlineColor={primary}
                                left={<TextInput.Icon icon="account" />}
                                value={name}
                                onChangeText={value => setName(value)}
                                style={styles.inputText}
                            />
                        </Card.Content>
                    </Card>
                    <Card style={styles.cardSetting}>
                        <Card.Title title="Umum" />
                        <Card.Content>
                            <List.Item
                                title="Tema"
                                titleStyle={styles.textList}
                                onPress={() => SheetManager.show('theme', { context: 'global' })}
                                left={() => <List.Icon color={dark} icon="palette" />}
                                right={() => <View style={{ backgroundColor: primary, width: 20, height: 20, borderRadius: 100 }}></View>}
                            />
                            <List.Item
                                title="Bahasa"
                                titleStyle={styles.textList}
                                onPress={() => SheetManager.show('language', { context: 'global' })}
                                left={() => <List.Icon color={dark} icon="flag" />}
                                right={() => <Text style={styles.textList}>{language ? language : 'Indonesia'}</Text>}
                            />
                            <List.Item
                                title="Tampilkan Deskripsi"
                                titleStyle={styles.textList}
                                left={() => <List.Icon color={dark} icon="book" />}
                                right={() => <Text style={styles.textList}>{descRoutine ? `Ya` : `Ga`}</Text>}
                            />
                            <List.Item
                                title="Website"
                                titleStyle={styles.textList}
                                left={() => <List.Icon color={dark} icon="web" />}
                                onPress={() => Linking.openURL('https://x-labs.my.id')}
                            />
                            <List.Item
                                title="Info"
                                titleStyle={styles.textList}
                                left={() => <List.Icon color={dark} icon="information-outline" />}
                            />
                            <List.Item
                                title="Kasih Nilai"
                                titleStyle={styles.textList}
                                left={() => <List.Icon color={dark} icon="star" />}
                            />
                        </Card.Content>
                    </Card>
                </ScrollView>
            </ScrollKeyboard>
            <BottomSheetLanguage id="language" />
            <BottomSheetTheme id="theme" />
        </>
    )
}

export default SettingScreen