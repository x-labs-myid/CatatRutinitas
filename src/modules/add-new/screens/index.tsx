import { useEffect, useState } from 'react'
import { Button, Icon, Text, TextInput } from 'react-native-paper'
import { ScrollView, View } from 'react-native'
import styles from './styles'
import CalendarRangePicker from '@shared/components/CalendarRangePicker'
import { useAtom } from 'jotai'
import { atomDescription, atomEndDate, atomName, atomReminder, atomStartDate, atomTotalTargetDay } from '../atom'
import ScrollKeyboard from '@shared/components/ScrollKeyboard'
import { themeAtom } from '@shared/atom/atomSetting'
import useGlobal from '@shared/hooks'
import DateTimePicker from '@react-native-community/datetimepicker';
import { dark_gray, sizeIconRegular, white } from '@shared/utils/constant'

const AddNewScreen = () => {
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
    const [name, setName] = useAtom(atomName)
    const [description, setDescription] = useAtom(atomDescription)
    const [startDate, setStartDate] = useAtom(atomStartDate)
    const [endDate, setEndDate] = useAtom(atomEndDate)
    const [totalTargetDay, setTotalTargetDay] = useAtom(atomTotalTargetDay)
    const [reminder, setReminder] = useAtom(atomReminder)
    const [theme] = useAtom(themeAtom)
    const { translateGlobal } = useGlobal()

    useEffect(() => {
        return () => {
            setName(null)
            setDescription(null)
            setStartDate(null)
            setEndDate(null)
            setTotalTargetDay(0)
            setReminder(null)
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
                        style={{ ...styles.inputText, height: 100, marginBottom: 10 }}
                        numberOfLines={4}
                        value={description ?? ''}
                        activeOutlineColor={theme!}
                        onChangeText={value => setDescription(value)}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
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
                        style={styles.inputText}
                        activeOutlineColor={theme!}
                        disabled={true}
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
                </ScrollView>
            </ScrollKeyboard>
        </>
    )
}

export default AddNewScreen