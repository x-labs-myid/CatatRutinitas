import { useState } from "react"
import { dark, white } from "@shared/utils/constant"
import { ScrollView, View, Text, Linking } from "react-native"
import { Button, Card, List, TextInput, Switch } from "react-native-paper"
import styles from "./styles"
import { useAtom } from "jotai"
import { descRoutineAtom, feelAtom, languageAtom, themeAtom, userAtom } from "@shared/atom/atomSetting"
import ScrollKeyboard from "@shared/components/ScrollKeyboard"
import BottomSheetLanguage from "../components/BottomSheetLanguage"
import { SheetManager } from "react-native-actions-sheet"
import BottomSheetTheme from "../components/BottomSheetTheme"
import useGlobal from "@shared/hooks"

const SettingScreen = () => {
    const [name, setName] = useState<string>('')
    const [user, setUser] = useAtom(userAtom)

    const [language, setLanguage] = useAtom(languageAtom)
    const [feel, setFeel] = useAtom(feelAtom)
    const { translateGlobal } = useGlobal()
    const [descRoutine, setDescRoutine] = useAtom(descRoutineAtom)
    const [theme] = useAtom(themeAtom)

    const updateName = () => {
        setUser(name)
        setName('')
    }

    return (
        <>
            <ScrollKeyboard>
                <ScrollView contentContainerStyle={styles.container}>
                    <Card style={{...styles.cardName, backgroundColor: theme!}}>
                        <Card.Content>
                            <View style={styles.wrap}>
                                <Text style={styles.text}>{user?.toLocaleUpperCase()}</Text>
                                <Button
                                    mode="outlined"
                                    theme={{ colors: { outline: white } }}
                                    textColor={white}
                                    onPress={updateName}
                                    disabled={name === user || name === ''}
                                >{translateGlobal('Ubah')}</Button>
                            </View>
                            <TextInput
                                placeholder={translateGlobal('Ubah nama kamu di sini')}
                                mode='outlined'
                                activeOutlineColor={theme!}
                                left={<TextInput.Icon icon="account" />}
                                value={name}
                                onChangeText={value => setName(value)}
                                style={styles.inputText}
                            />
                        </Card.Content>
                    </Card>
                    <Card style={styles.cardSetting}>
                        <Card.Title title={translateGlobal('Umum')} />
                        <Card.Content>
                            <List.Item
                                title={translateGlobal('Tema')}
                                titleStyle={styles.textList}
                                onPress={() => SheetManager.show('theme', { context: 'global' })}
                                left={() => <List.Icon color={dark} icon="palette" />}
                                right={() => <View style={{ backgroundColor: theme!, width: 20, height: 20, borderRadius: 100 }}></View>}
                            />
                            <List.Item
                                title={translateGlobal('Bahasa')}
                                titleStyle={styles.textList}
                                onPress={() => SheetManager.show('language', { context: 'global' })}
                                left={() => <List.Icon color={dark} icon="flag" />}
                                right={() => <Text style={styles.textList}>{language ? language : 'Indonesia'}</Text>}
                            />
                            <List.Item
                                title={translateGlobal('Tampilin Deskripsi')}
                                titleStyle={styles.textList}
                                left={() => <List.Icon color={dark} icon="book" />}
                                // right={() => <Text style={styles.textList}>{descRoutine ? translateGlobal('Ya') : translateGlobal('Ga')}</Text>}
                                right={() => <Switch color={theme!} value={descRoutine} onValueChange={() => setDescRoutine(!descRoutine)} />}
                            />
                            <List.Item
                                title={translateGlobal('Website')}
                                titleStyle={styles.textList}
                                left={() => <List.Icon color={dark} icon="web" />}
                                onPress={() => Linking.openURL('https://x-labs.my.id')}
                            />
                            <List.Item
                                title={translateGlobal('Info')}
                                titleStyle={styles.textList}
                                left={() => <List.Icon color={dark} icon="information-outline" />}
                            />
                            <List.Item
                                title={translateGlobal('Kasih Nilai')}
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