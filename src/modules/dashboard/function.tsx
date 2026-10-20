import { ToastAndroid } from "react-native"
import useGlobal from "@shared/hooks"
import { compare2Date, dateInternationalFormat } from "@shared/utils"
import useTableRoutine from "@services/db_local/routine/use"
import { cancelNotification, scheduleNotification, scheduleSleepNotification } from "@shared/utils"
import Routine from "@services/db_local/routine/model"

const funcHooks = () => {
    const { update } = useTableRoutine()
    const { getRandomNotification, getRandomSleepNotification, translateGlobal } = useGlobal()

    // auto complete routine if today > endDate
    async function autoCompleteRoutine(data: Routine[]) {
        let result: Routine[] = []
        const today = new Date()
        for (let i = 0; i < data.length; i++) {
            const end = new Date(data[i].endDate)
            if (!data[i].isCompleted && compare2Date(today, end, '>')) {
                update(data[i].id, {
                    name: data[i].name,
                    description: data[i].description,
                    startDate: data[i].startDate,
                    endDate: data[i].endDate,
                    processDay: data[i].processDay,
                    totalTargetDay: data[i].totalTargetDay,
                    completeDate: dateInternationalFormat(new Date()),
                    isCompleted: true,
                    reminder: data[i].reminder,
                    sync: false
                })
                cancelNotification(data[i].id)
            } else {
                result.push(data[i])
            }
        }
        return result
    }

    // update routine if user complete routine
    async function updateRoutine(detail: any) {
        try {
            const completeDate = new Date()
            const start = new Date(detail?.startDate)
            const end = new Date(detail?.endDate)
            const complete = new Date(detail?.completeDate)
            if (compare2Date(completeDate, end, '>')) return ToastAndroid.show(`${detail?.name} ${translateGlobal('Rutinitas udah selesai')}!`, ToastAndroid.SHORT)
            if (compare2Date(complete, completeDate, '=')) return ToastAndroid.show(`${translateGlobal('Rutinitas ini udah dilakuin')}`, ToastAndroid.SHORT)
            if (!detail.completeDate && compare2Date(completeDate, start, '<')) return ToastAndroid.show(`${detail?.name} ${translateGlobal('dimulai')} ${detail?.startDate}`, ToastAndroid.SHORT)
            update(detail?.id, {
                name: detail?.name,
                description: detail?.description,
                startDate: detail?.startDate,
                endDate: detail?.endDate,
                processDay: detail?.processDay + 1,
                totalTargetDay: detail?.totalTargetDay,
                completeDate: dateInternationalFormat(completeDate),
                isCompleted: compare2Date(completeDate, end, '='),
                reminder: detail?.reminder,
                sync: false
            })
            if (compare2Date(completeDate, end, '=')) {
                cancelNotification(detail?.id)
            } else {
                scheduleNotification({
                    id: detail?.id!,
                    title: detail?.name!,
                    body: getRandomNotification() ?? '',
                    dateStr: dateInternationalFormat(completeDate),
                    reminder: detail?.reminder!
                })
                scheduleSleepNotification({
                    id: `reminder-sleep`,
                    title: `${translateGlobal('Tidur Dulu')}`,
                    body: getRandomSleepNotification() ?? ''
                })
            }
            return true
        } catch (error) {
            console.log('error update routine', error)
            return false
        }
    }

    function routineTodayComplete(completeDate: string) {
        const today = new Date()
        const cd = new Date(completeDate)
        return today.getDate() == cd.getDate()
    }

    return {
        autoCompleteRoutine,
        updateRoutine,
        routineTodayComplete
    }
}

export default funcHooks