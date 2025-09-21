import { useAtom } from 'jotai'
import { atomDescription, atomEndDate, atomReminder, atomName, atomStartDate, atomTotalTargetDay } from '../atom'
import { StyleSheet, ToastAndroid, TouchableOpacity } from "react-native"
import { Icon } from "react-native-paper"
import { white, sizeIconRegular, border_radius_button } from "@shared/utils/constant"
import useTableRoutine from '@services/db_local/routine/use'
import { useNavigation } from '@react-navigation/native'
import { scheduleNotification } from '@shared/utils'
import useGlobal from '@shared/hooks'
import useTableCompleteRoutine from '@services/db_local/complete_routine/use'

const HeaderRightAddNew = () => {
    const [name, setName] = useAtom(atomName)
    const [description, setDescription] = useAtom(atomDescription)
    const [startDate, setStartDate] = useAtom(atomStartDate)
    const [endDate, setEndDate] = useAtom(atomEndDate)
    const [totalTargetDay, setTotalTargetDay] = useAtom(atomTotalTargetDay)
    const [reminder, setReminder] = useAtom(atomReminder)
    const { translateGlobal, getRandomNotification } = useGlobal()

    const navigation = useNavigation()

    const onSubmit = async () => {
        if (!name || !description || !startDate || !endDate || !reminder) return ToastAndroid.show(`${translateGlobal('Semua field harus diisi')}`, ToastAndroid.SHORT)
        const result = await useTableRoutine().insert({
            name: name,
            description: description,
            startDate: startDate,
            endDate: endDate,
            processDay: 0,
            completeDate: '',
            totalTargetDay: totalTargetDay,
            isCompleted: false,
            reminder: reminder,
            sync: false
        })
        if (result) {
            useTableCompleteRoutine().insert({
                routineId: result,
                date: '',
                note: '',
                sync: false
            })
            scheduleNotification({
                id: result,
                title: name,
                body: getRandomNotification() ?? '',
                dateStr: startDate,
                reminder: reminder
            })
            setName(null)
            setDescription(null)
            setStartDate(null)
            setEndDate(null)
            setTotalTargetDay(0)
            setReminder(null)
            ToastAndroid.show(`${translateGlobal('Data berhasil disimpan')}`, ToastAndroid.SHORT)
            navigation.goBack()
        } else {
            ToastAndroid.show(`${translateGlobal('Data gagal disimpan')}`, ToastAndroid.SHORT)
        }
    }
    
    return (
        <>
            <TouchableOpacity style={styles.btn} onPress={onSubmit}>
                <Icon source="check" color={white} size={sizeIconRegular} />
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    btn: {
        borderRadius: border_radius_button,
        borderWidth: 1,
        borderColor: white
    }
})

export default HeaderRightAddNew