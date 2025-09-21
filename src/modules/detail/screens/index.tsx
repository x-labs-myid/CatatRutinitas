import React, { useEffect, useState } from 'react'
import { Button, Icon, Text, TextInput } from 'react-native-paper'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, ToastAndroid, TouchableWithoutFeedback, View } from 'react-native'
import styles from './styles'
import useTableRoutine from '@services/db_local/routine/use'
import { useNavigation } from '@react-navigation/native'
import { useAtom } from 'jotai'
import { themeAtom } from '@shared/atom/atomSetting'
import useGlobal from '@shared/hooks'
import { scheduleNotification } from '@shared/utils'
import DateTimePicker from '@react-native-community/datetimepicker';
import { dark_gray, sizeIconRegular, white } from '@shared/utils/constant'

const DetailScreen = ({ route }: { route: any }) => {
    const { data } = route.params
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
    const [name, setName] = useState<string | null>(data?.name)
    const [description, setDescription] = useState<string | null>(data?.description)
    const [reminder, setReminder] = useState<string | null>(data?.reminder)
    const [theme] = useAtom(themeAtom)
    const { translateGlobal, getRandomNotification } = useGlobal()
    const navigation = useNavigation()

    const { update } = useTableRoutine()

    function onSubmit() {
        if (!name || !description) return ToastAndroid.show(`${translateGlobal('Semua field harus diisi')}`, ToastAndroid.SHORT)
        if (!reminder) return ToastAndroid.show(`${translateGlobal('Isi jam pengingatnya')}`, ToastAndroid.SHORT)
        update(data?.id, {
            name: name ?? data?.name,
            description: description ?? data?.description,
            startDate: data?.startDate,
            endDate: data?.endDate,
            processDay: data?.processDay,
            completeDate: data?.completeDate,
            totalTargetDay: data?.totalTargetDay,
            isCompleted: data?.isCompleted,
            reminder: reminder,
            sync: false
        })
        scheduleNotification({
            id: data?.id,
            title: name,
            body: getRandomNotification() ?? '',
            dateStr: data?.startDate,
            reminder: reminder
        })
        ToastAndroid.show(`${translateGlobal('Data berhasil diubah')}`, ToastAndroid.SHORT)
        navigation.goBack()
    }

    useEffect(() => {
        return () => {
            setName(null)
            setDescription(null)
            setReminder(null)
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
                        label={translateGlobal('Nama')}
                        value={name ?? ''}
                        mode="outlined"
                        style={styles.inputText}
                        activeOutlineColor={theme!}
                        onChangeText={value => setName(value)}
                    />
                    <TextInput
                        label={translateGlobal('Deskripsi')}
                        multiline
                        mode="outlined"
                        style={{ ...styles.inputText, height: 100 }}
                        numberOfLines={4}
                        value={description ?? ''}
                        activeOutlineColor={theme!}
                        onChangeText={value => setDescription(value)}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 13 }}>
                        <View style={{ flex: 0.7, borderColor: dark_gray, borderWidth: 1, padding: 10, borderRadius: 5 }}>
                            <Text variant='bodyMedium'>{reminder ? reminder : `${translateGlobal('Mau Diingetin Jam Berapa')}?`}</Text>
                        </View>
                        <View style={{ flex: 0.25 }}>
                            <Button
                                mode="contained"
                                buttonColor={theme!}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Icon source="clock-outline" color={white} size={sizeIconRegular} />
                            </Button>
                        </View>
                    </View>
                    {/* <TextInput
                        label={`${translateGlobal('Mau Diingetin Jam Berapa')}?`}
                        mode="outlined"
                        value={reminder || ''}
                        keyboardType="numeric"
                        style={{ ...styles.inputText, marginBottom: 10 }}
                        activeOutlineColor={theme!}
                        disableKeyboardShortcuts={true}
                        onPress={() => setShowDatePicker(true)}
                    /> */}
                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={new Date()}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={(event, date) => {
                                if (date) {
                                    setReminder(`${date.getHours()}:${date.getMinutes()}`)
                                    setShowDatePicker(false)
                                }
                            }}
                        />
                    )}
                    <Button
                        mode="contained"
                        buttonColor={theme!}
                        onPress={onSubmit}
                    >{translateGlobal('Ubah')}</Button>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default DetailScreen