import ButtonCustom from "@shared/components/ButtonCustom"
import ButtonCustomOutline from "@shared/components/ButtonCustomOutline"
import { userAtom } from "@shared/jotai/atomSetting"
import { dimensionHeight, dimensionWidth, durationSnackBar, font, fontStandard, primary, white } from "@shared/utils/constant"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Modal, TextInput, Snackbar } from "react-native-paper"

const ModalInputName = ({ visible, hideModal }: { visible: boolean, hideModal: () => void }) => {
    const [visibleSnackBar, setVisibleSnackBar] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [user, setUser] = useAtom(userAtom)

    useEffect(() => {
        return () => {
            setName('')
            setVisibleSnackBar(false)
        }
    }, [])

    const onSubmit = () => {
        if(name == '') return setVisibleSnackBar(true) 
        setUser(name)
    }

    return (
        <>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.container}>
                <TextInput
                    placeholder="Masukin nama kamu"
                    mode='outlined'
                    activeOutlineColor={primary}
                    left={<TextInput.Icon icon="account" />}
                    value={name || ''}
                    onChangeText={value => setName(value)}
                    style={styles.inputText}
                />
                <View style={{ flexDirection: 'row'}}>
                    <View style={{ flex: 0.48 }}>
                        <ButtonCustom
                            title="Simpan"
                            onPress={onSubmit}
                        />
                    </View>
                    <View style={{ flex: 0.04 }}></View>
                    <View style={{ flex: 0.48 }}>
                        <ButtonCustomOutline
                            title="Batal"
                            onPress={hideModal}
                        />
                    </View>
                </View>
            </Modal>
            <Snackbar
                visible={visibleSnackBar}
                onDismiss={() => setVisibleSnackBar(false)}
                duration={durationSnackBar}
            >
                <Text style={styles.textSnackBar}>Isi nama kamu dulu!</Text>
            </Snackbar>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: white,
        paddingHorizontal: dimensionWidth * 0.05,
        paddingVertical: dimensionHeight * 0.05
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
    },
    inputText: {
        marginBottom: 10
    },
})
export default ModalInputName