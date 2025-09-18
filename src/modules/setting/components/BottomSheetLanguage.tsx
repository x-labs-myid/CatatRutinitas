import { dark, dimensionHeight, dimensionWidth, English, font, fontStandard, Indonesia, listFeel, Melayu, primary, regular, white } from '@shared/utils/constant';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import { Button, List } from 'react-native-paper';
import useSetting from '../hooks/useSetting';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { feelAtom, languageAtom } from '@shared/jotai/atomSetting';
import { StyleSheet, ToastAndroid, View } from 'react-native';

const BottomSheetLanguage = ({ id }: { id: string }) => {
    const [expanded, setExpanded] = useState<boolean>(true)
    const [visibleSnackBar, setVisibleSnackBar] = useState<boolean>(false)
    const [language, setLanguage] = useAtom(languageAtom)
    const [feel, setFeel] = useAtom(feelAtom)
    const { translate } = useSetting()
    const theFeel = feel ? feel : regular
    const changeLang = (lang: string) => {
        setLanguage(lang)
        if (lang == Indonesia) setExpanded(!expanded)
    }

    const changeFeel = (feel: string) => {
        setVisibleSnackBar(false)
        setFeel(feel)
    }
    return (
        <ActionSheet id={id} gestureEnabled>
            <List.Section title="Bahasa">
                <List.Accordion
                    title="Bahasa Indonesia"
                    titleStyle={{ color: expanded ? primary : dark }}
                    left={props => <List.Icon {...props} color={expanded || language === Indonesia ? primary : dark} icon="flag" />}
                    expanded={expanded}
                    onPress={() => changeLang(Indonesia)}>
                    {listFeel.map(item =>
                        <List.Item
                            key={item.id}
                            title={item.title}
                            titleStyle={{ color: theFeel === item.id ? primary : dark }}
                            onPress={() => changeFeel(item.id)}
                            left={props => <List.Icon {...props} color={theFeel === item.id ? primary : dark} icon="palette" />}
                        />
                    )}
                </List.Accordion>
                <List.Item
                    title="English"
                    titleStyle={{ color: language === English ? primary : dark }}
                    left={props => <List.Icon {...props} color={language === English ? primary : dark} icon="flag" />}
                    onPress={() => changeLang(English)}
                />
                <List.Item
                    title="Bahasa Melayu"
                    titleStyle={{ color: language === Melayu ? primary : dark }}
                    left={props => <List.Icon {...props} color={language === Melayu ? primary : dark} icon="flag" />}
                    onPress={() => changeLang(Melayu)}
                />
            </List.Section>
            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    buttonColor={primary}
                    style={{ width: dimensionWidth * 0.4 }}
                    onPress={() => ToastAndroid.show(`Pengen diingetin rutinitas apa sama ${translate('aku')}?`, ToastAndroid.SHORT)}
                >
                    Coba
                </Button>
                <Button
                    mode="outlined"
                    textColor={primary}
                    style={{ width: dimensionWidth * 0.4 }}
                    theme={{ colors: { outline: primary } }}
                    onPress={() => SheetManager.hide(id)}
                >
                    Tutup
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