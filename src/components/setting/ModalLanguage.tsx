import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Modal, List, Snackbar } from 'react-native-paper'
import { ASlanguage, dark, dimensionHeight, dimensionWidth, font, fontStandard, primary, white } from '@utils/constant'
import ButtonCustom from '@components/ButtonCustom'
import useLanguage from '@hooks/useSetting'
import { useAtom } from 'jotai'
import { languageAtom, feelAtom } from '@store/persist'

const ModalLanguage = ({ visible, hideModal }: { visible: boolean, hideModal: () => void }) => {
    const [expanded, setExpanded] = useState<boolean>(true)
    const [visibleSnackBar, setVisibleSnackBar] = useState<boolean>(false)
    const [language, setLanguage] = useAtom(languageAtom)
    const [feel, setFeel] = useAtom(feelAtom)
    const { translate } = useLanguage()
    const changeLang = (lang: string) => {
        setLanguage(lang)
        if(lang == 'ID') setExpanded(!expanded)
    }
    const onDismissSnackBar = () => setVisibleSnackBar(false)

    return (
        <>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.container}>
                <List.Section title="Bahasa">
                    <List.Accordion
                        title="Bahasa Indonesia"
                        titleStyle={{ color: expanded ? primary : dark }}
                        left={props => <List.Icon {...props} color={expanded || language === 'ID' ? primary : dark} icon="flag" />}
                        expanded={expanded}
                        onPress={() => changeLang('ID')}>
                        <List.Item
                            title="Biasa"
                            titleStyle={{ color: feel === 'Biasa' ? primary : dark }}
                            onPress={() => setFeel('biasa')}
                            left={props => <List.Icon {...props} color={feel === 'biasa' ? primary : dark} icon="palette" />} />
                        <List.Item
                            title="Campur Sunda"
                            titleStyle={{ color: feel === 'sunda' ? primary : dark }}
                            onPress={() => setFeel('sunda')}
                            left={props => <List.Icon {...props} color={feel === 'sunda' ? primary : dark} icon="palette" />} />
                        <List.Item
                            title="Campur Jawa"
                            titleStyle={{ color: feel === 'jawa' ? primary : dark }}
                            onPress={() => setFeel('jawa')}
                            left={props => <List.Icon {...props} color={feel === 'jawa' ? primary : dark} icon="palette" />} />
                        <List.Item
                            title="Campur Minang"
                            titleStyle={{ color: feel === 'minang' ? primary : dark }}
                            onPress={() => setFeel('minang')}
                            left={props => <List.Icon {...props} color={feel === 'minang' ? primary : dark} icon="palette" />} />
                        <List.Item
                            title="Campur Betawi"
                            titleStyle={{ color: feel === 'betawi' ? primary : dark }}
                            onPress={() => setFeel('betawi')}
                            left={props => <List.Icon {...props} color={feel === 'betawi' ? primary : dark} icon="palette" />} />
                    </List.Accordion>
                    <List.Item
                        title="English"
                        titleStyle={{ color: language === 'EN' ? primary : dark }}
                        left={props => <List.Icon {...props} color={language === 'EN' ? primary : dark} icon="flag" />}
                        onPress={() => changeLang('EN')}
                    />
                    <List.Item
                        title="Bahasa Melayu"
                        titleStyle={{ color: language === 'MY' ? primary : dark }}
                        left={props => <List.Icon {...props} color={language === 'MY' ? primary : dark} icon="flag" />}
                        onPress={() => changeLang('MY')}
                    />
                </List.Section>
                <View style={styles.buttonContainer}>
                    <ButtonCustom title="Coba" onPress={() => setVisibleSnackBar(true)} />
                </View>
            </Modal>
            <Snackbar
                visible={visibleSnackBar}
                onDismiss={onDismissSnackBar}
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