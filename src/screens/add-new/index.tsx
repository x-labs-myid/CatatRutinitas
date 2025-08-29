import { useState } from 'react'
import { TextInput, Text, Icon } from 'react-native-paper'
import ButtonCustom from '@components/ButtonCustom'
import { Alert, ScrollView, View } from 'react-native'
import ActionSheetStatic from '@components/ActionSheetStatic'
import styles from './styles'
import { primary, sizeIconExtra } from '@utils/constant'
import CalendarRangePicker from '@components/CalendarRangePicker'

const AddNewScreen = () => {
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')

    const onSubmit = () => {
        Alert.alert(`Sukses`, `Rutinitas lu udah disimpen`)
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
                    onPress={() => onSubmit()}
                />
            </ScrollView>
        </>
    )
}

export default AddNewScreen