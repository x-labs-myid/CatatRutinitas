import { dark, dimensionHeight, dimensionWidth, English, Indonesia, listFeel, Melayu, regular, white } from '@shared/utils/constant';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import { Button, List } from 'react-native-paper';
import { useAtom } from 'jotai';
import { feelAtom, languageAtom, themeAtom } from '@shared/atom/atomSetting';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import useGlobal from '@shared/hooks';

const BottomSheetLanguage = ({ id }: { id: string }) => {
    const [language, setLanguage] = useAtom(languageAtom)
    const [feel, setFeel] = useAtom(feelAtom)
    const [theme] = useAtom(themeAtom)
    const { translateGlobal } = useGlobal()
    const theFeel = feel ? feel : regular
    const changeLang = (lang: string) => {
        setLanguage(lang)
        if (lang !== Indonesia) setFeel(regular)
    }

    const changeFeel = (feel: string) => {
        setFeel(feel)
    }
    return (
        <ActionSheet id={id} gestureEnabled>
            <List.Section title={translateGlobal('Bahasa')}>
                <List.Accordion
                    title="Bahasa Indonesia"
                    titleStyle={{ color: language === Indonesia ? theme! : dark }}
                    left={props => <List.Icon {...props} color={language === Indonesia ? theme! : dark} icon="flag" />}
                    expanded={language === Indonesia}
                    onPress={() => changeLang(Indonesia)}>
                    {listFeel.map(item =>
                        <List.Item
                            key={item.id}
                            title={item.title}
                            titleStyle={{ color: theFeel === item.id ? theme! : dark }}
                            onPress={() => changeFeel(item.id)}
                            left={props => <List.Icon {...props} color={theFeel === item.id ? theme! : dark} icon="palette" />}
                        />
                    )}
                </List.Accordion>
                <List.Item
                    title="English"
                    titleStyle={{ color: language === English ? theme! : dark }}
                    left={props => <List.Icon {...props} color={language === English ? theme! : dark} icon="flag" />}
                    onPress={() => changeLang(English)}
                />
                <List.Item
                    title="Melayu"
                    titleStyle={{ color: language === Melayu ? theme! : dark }}
                    left={props => <List.Icon {...props} color={language === Melayu ? theme! : dark} icon="flag" />}
                    onPress={() => changeLang(Melayu)}
                />
            </List.Section>
            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    buttonColor={theme!}
                    style={{ width: dimensionWidth * 0.4 }}
                    onPress={() => ToastAndroid.show(`${translateGlobal('Pengen diingetin rutinitas apa sama aku')}?`, ToastAndroid.SHORT)}
                >
                    {translateGlobal('Coba')}
                </Button>
                <Button
                    mode="outlined"
                    textColor={theme!}
                    style={{ width: dimensionWidth * 0.4 }}
                    theme={{ colors: { outline: theme! } }}
                    onPress={() => SheetManager.hide(id)}
                >
                    {translateGlobal('Tutup')}
                </Button>
            </View>
        </ActionSheet>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: white
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: dimensionHeight * 0.01,
        paddingBottom: dimensionHeight * 0.02,
        paddingHorizontal: dimensionWidth * 0.05
    }
})

export default BottomSheetLanguage