import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Modal, List, Snackbar } from 'react-native-paper'
import { dark, dimensionHeight, dimensionWidth, durationSnackBar, English, font, fontStandard, Indonesia, listFeel, Melayu, primary, regular, white } from '@utils/constant'
import ButtonCustom from '@components/ButtonCustom'
import useSetting from '@hooks/useSetting'
import { useAtom } from 'jotai'
import { languageAtom, feelAtom } from '@store/persist'

const ModalLanguage = ({ visible, hideModal }: { visible: boolean, hideModal: () => void }) => {
    const [expanded, setExpanded] = useState<boolean>(true)
    const [visibleSnackBar, setVisibleSnackBar] = useState<boolean>(false)
    const [language, setLanguage] = useAtom(languageAtom)
    const [feel, setFeel] = useAtom(feelAtom)
    const { translate } = useSetting()
    const theFeel = feel ? feel : regular
    const changeLang = (lang: string) => {
        setLanguage(lang)
        if(lang == Indonesia) setExpanded(!expanded)
    }

    const changeFeel = (feel: string) => {
        setVisibleSnackBar(false)
        setFeel(feel)
    }

    return (
        <>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.container}>
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
                    <ButtonCustom title="Coba" onPress={() => setVisibleSnackBar(true)} />
                </View>
            </Modal>
            <Snackbar
                visible={visibleSnackBar}
                onDismiss={() => setVisibleSnackBar(false)}
                duration={durationSnackBar}
            >
                <Text style={styles.textSnackBar}>Pengen diingetin rutinitas apa sama {translate('aku')}?</Text>
            </Snackbar>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: white
    },
    buttonContainer: {
        paddingTop: dimensionHeight * 0.01,
        paddingBottom: dimensionHeight * 0.02,
        paddingHorizontal: dimensionWidth * 0.05
    },
    textSnackBar: {
        fontFamily: font.BrandonRegular,
        fontSize: fontStandard,
        color: white
    }
})

export default ModalLanguage