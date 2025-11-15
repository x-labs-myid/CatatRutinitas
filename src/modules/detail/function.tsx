import { ToastAndroid } from "react-native"
import { dateInternationalFormat, scheduleNotification } from '@shared/utils'
import useGlobal from '@shared/hooks'
import useTableRoutine from '@services/db_local/routine/use'

const funcHooks = () => {
    const { update } = useTableRoutine()
    const { translateGlobal, getRandomNotification, getRandomSleepNotification } = useGlobal()
    function onSubmit({ name, description, reminder, data }: { name: string, description: string, reminder: string, data: any }) {
        try {
            if (!name || !description) return ToastAndroid.show(`${translateGlobal('Semua field harus diisi')}`, ToastAndroid.SHORT)
        if (!reminder) return ToastAndroid.show(`${translateGlobal('Isi jam pengingatnya')}`, ToastAndroid.SHORT)
        update(data?.id, {
            name: name ?? data?.name,
            description: description ?? data?.description,
            startDate: data?.start_date,
            endDate: data?.end_date,
            processDay: data?.process_day,
            completeDate: data?.complete_date,
            totalTargetDay: data?.total_target_day,
            isCompleted: data?.is_completed,
            reminder: reminder,
            sync: false
        })
        if (!data?.isCompleted) {
            scheduleNotification({
                id: data?.id,
                title: name,
                body: getRandomNotification() ?? '',
                dateStr: dateInternationalFormat(new Date()),
                reminder: reminder
            })
            scheduleNotification({
                id: `reminder-sleep`,
                title: `${translateGlobal('Tidur Dulu')}`,
                body: getRandomSleepNotification() ?? '',
                dateStr: dateInternationalFormat(new Date()),
                reminder: `22:0`
            })
        }
        ToastAndroid.show(`${translateGlobal('Data berhasil diubah')}`, ToastAndroid.SHORT)
        return true
        } catch (error) {
            console.log('error update routine', error)
            return false
        }
    }

    return {
        onSubmit
    }
}

export default funcHooks
