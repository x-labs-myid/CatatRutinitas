import { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper'
import ButtonCustom from '@components/ButtonCustom'
import { Alert, ScrollView, ToastAndroid } from 'react-native'
import styles from './styles'
import { primary } from '@utils/constant'
import CalendarRangePicker from '@components/CalendarRangePicker'
import useTableRoutine from '@hooks/useTableRoutine'

const AddNewScreen = () => {
    const [name, setName] = useState<string | null>(null)
    const [description, setDescription] = useState<string | null>(null)
    const [startDate, setStartDate] = useState<string | null>(null)
    const [endDate, setEndDate] = useState<string | null>(null)
    const [totalTargetDay, setTotalTargetDay] = useState<number | 0>(0)

    const { insert } = useTableRoutine()

    const onSubmit = async () => {
        if (!name || !description || !startDate || !endDate) return Alert.alert('Error', 'Semua field harus diisi')
        const result = await insert({
            name: name,
            description: description,
            startDate: startDate,
            endDate: endDate,
            processDay: 0,
            totalTargetDay: totalTargetDay,
            isCompleted: false,
        })
        if (result) {
            setName(null)
            setDescription(null)
            setStartDate(null)
            setEndDate(null)
            setTotalTargetDay(0)
            ToastAndroid.show('Data berhasil disimpan', ToastAndroid.SHORT)
        } else {
            ToastAndroid.show('Data gagal disimpan', ToastAndroid.SHORT)
        }
    }

    useEffect(() => {
        return () => {
            setName(null)
            setDescription(null)
            setStartDate(null)
            setEndDate(null)
            setTotalTargetDay(0)
        }
    }, [])

    return (
        <>
            <ScrollView style={styles.container}>
                <CalendarRangePicker onDateChange={(startDate, endDate, diffDay) => {
                    setStartDate(startDate)
                    setEndDate(endDate)
                    setTotalTargetDay(diffDay)
                }} />
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
                <ButtonCustom
                    title="Simpan"
                    onPress={onSubmit}
                />
            </ScrollView>
        </>
    )
}

export default AddNewScreen