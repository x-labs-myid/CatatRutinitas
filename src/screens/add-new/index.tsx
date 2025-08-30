import { useState } from 'react'
import { TextInput } from 'react-native-paper'
import ButtonCustom from '@components/ButtonCustom'
import { Alert, ScrollView } from 'react-native'
import styles from './styles'
import { primary } from '@utils/constant'
import CalendarRangePicker from '@components/CalendarRangePicker'
import useDB from '@hooks/useDB'
import { v4 as uuidv4 } from 'uuid'

const AddNewScreen = () => {
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')

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
            is_completed: false,
        })
    }

    return (
        <>
            <ScrollView style={styles.container}>
                <CalendarRangePicker onDateChange={(startDate, endDate) => {
                    setStartDate(startDate)
                    setEndDate(endDate)
                }} />
                <TextInput
                    label="Nama"
                    value={name}
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
                    value={description}
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