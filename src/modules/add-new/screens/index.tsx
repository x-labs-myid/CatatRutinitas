import { useEffect } from 'react'
import { TextInput } from 'react-native-paper'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from 'react-native'
import styles from './styles'
import { primary } from '@shared/utils/constant'
import CalendarRangePicker from '@shared/components/CalendarRangePicker'
import { useAtom } from 'jotai'
import { atomDescription, atomEndDate, atomName, atomStartDate, atomTotalTargetDay } from '../atom'
import ScrollKeyboard from '@shared/components/ScrollKeyboard'

const AddNewScreen = () => {
    const [name, setName] = useAtom(atomName)
    const [description, setDescription] = useAtom(atomDescription)
    const [startDate, setStartDate] = useAtom(atomStartDate)
    const [endDate, setEndDate] = useAtom(atomEndDate)
    const [totalTargetDay, setTotalTargetDay] = useAtom(atomTotalTargetDay)

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
            <ScrollKeyboard>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
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
                </ScrollView>
            </ScrollKeyboard>
        </>
    )
}

export default AddNewScreen