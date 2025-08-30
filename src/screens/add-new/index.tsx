import { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper'
import ButtonCustom from '@components/ButtonCustom'
import { Alert, ScrollView } from 'react-native'
import styles from './styles'
import { primary } from '@utils/constant'
import CalendarRangePicker from '@components/CalendarRangePicker'
import useDB from '@hooks/useDB'
import { v4 as uuidv4 } from 'uuid'

const AddNewScreen = () => {
    const [name, setName] = useState<string | null>(null)
    const [description, setDescription] = useState<string | null>(null)
    const [startDate, setStartDate] = useState<string | null>(null)
    const [endDate, setEndDate] = useState<string | null>(null)
    const [totalTargetDay, setTotalTargetDay] = useState<number | 0>(0)

    const { insert } = useDB()

    const onSubmit = () => {
        if (!name || !description || !startDate || !endDate) return Alert.alert('Error', 'Semua field harus diisi')
        const uuid = uuidv4()
        insert({
            routine_id: uuid,
            name: name,
            description: description,
            start_date: startDate,
            end_date: endDate,
            process_day: 0,
            total_target_day: totalTargetDay,
            is_completed: false,
        })
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