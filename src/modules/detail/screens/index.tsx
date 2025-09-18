import React, { useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, ToastAndroid, TouchableWithoutFeedback } from 'react-native'
import styles from './styles'
import { primary } from '@shared/utils/constant'
import useTableRoutine from '@services/db_local/routine/use'
import { useNavigation } from '@react-navigation/native'

const DetailScreen = ({ route }: { route: any }) => {
    const { data } = route.params
    const [name, setName] = useState<string | null>(data?.name)
    const [description, setDescription] = useState<string | null>(data?.description)

    const navigation = useNavigation()

    const { update } = useTableRoutine()

    function onSubmit() {
        if (!name || !description) return Alert.alert('Error', 'Semua field harus diisi')
        update(data?.id, {
            name: name ?? data?.name,
            description: description ?? data?.description,
            startDate: data?.startDate,
            endDate: data?.endDate,
            processDay: data?.processDay,
            completeDate: data?.completeDate,
            totalTargetDay: data?.totalTargetDay,
            isCompleted: data?.isCompleted,
        })
        ToastAndroid.show('Data berhasil diubah', ToastAndroid.SHORT)
        navigation.goBack()
    }

    useEffect(() => {
        return () => {
            setName(null)
            setDescription(null)
        }
    }, [])

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={80}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.container}>
                    <TextInput
                        label="Nama"
                        value={name ?? ''}
                        mode="outlined"
                        style={styles.inputText}
                        activeOutlineColor={primary}
                        onChangeText={value => setName(value)}
                    />
                    <TextInput
                        label="Deskripsi"
                        multiline
                        mode="outlined"
                        style={{ ...styles.inputText, height: 100, marginBottom: 10 }}
                        numberOfLines={4}
                        value={description ?? ''}
                        activeOutlineColor={primary}
                        onChangeText={value => setDescription(value)}
                    />
                    <Button
                        mode="contained"
                        buttonColor={primary}
                        onPress={onSubmit}
                    >Simpan</Button>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default DetailScreen