import { useAtom } from 'jotai'
import { atomDescription, atomEndDate, atomName, atomStartDate, atomTotalTargetDay } from '../atom'
import { StyleSheet, ToastAndroid, TouchableOpacity } from "react-native"
import { Icon } from "react-native-paper"
import { white, sizeIconRegular, border_radius_button } from "@shared/utils/constant"
import useTableRoutine from '@services/db_local/routine/use'
import { useNavigation } from '@react-navigation/native'
import { scheduleNotification } from '@shared/utils'

const HeaderRightAddNew = () => {
    const [name, setName] = useAtom(atomName)
    const [description, setDescription] = useAtom(atomDescription)
    const [startDate, setStartDate] = useAtom(atomStartDate)
    const [endDate, setEndDate] = useAtom(atomEndDate)
    const [totalTargetDay, setTotalTargetDay] = useAtom(atomTotalTargetDay)

    const navigation = useNavigation()

    const { insert } = useTableRoutine()

    const onSubmit = async () => {
        if (!name || !description || !startDate || !endDate) return ToastAndroid.show('Semua field harus diisi', ToastAndroid.SHORT)
        const result = await insert({
            name: name,
            description: description,
            startDate: startDate,
            endDate: endDate,
            processDay: 0,
            completeDate: '',
            totalTargetDay: totalTargetDay,
            isCompleted: false,
        })
        if (result) {
            scheduleNotification({
                id: result,
                title: name,
                body: `Waktunya lakuin rutinitas kamu, katanya pengen ngebentuk rutinitas yang positif. Semangat brokuu!!!`,
                dateStr: startDate,
            })
            setName(null)
            setDescription(null)
            setStartDate(null)
            setEndDate(null)
            setTotalTargetDay(0)
            ToastAndroid.show('Data berhasil disimpan', ToastAndroid.SHORT)
            navigation.goBack()
        } else {
            ToastAndroid.show('Data gagal disimpan', ToastAndroid.SHORT)
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