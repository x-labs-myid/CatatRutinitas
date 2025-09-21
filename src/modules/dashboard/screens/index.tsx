import { useEffect, useState } from "react"
import { RoutineTable } from "@shared/types/db"
import useTableRoutine from "@services/db_local/routine/use"
import Empty from "@modules/dashboard/components/Empty"
import { Alert, FlatList, ToastAndroid } from "react-native"
import RoutineItem from "@modules/dashboard/components/RoutineItem"
import { cancelNotification, dateToDay, scheduleNotification } from "@shared/utils"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { DashboardScreenNavigationProp } from "@shared/types/navigation"
import styles from "./styles"
import useGlobal from "@shared/hooks"
import Loading from "@shared/components/Loading"

const DashboardScreen = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { translateGlobal, getRandomNotification, getRandomSleepNotification } = useGlobal()
    const navigation = useNavigation<DashboardScreenNavigationProp>()
    const { select, update, del } = useTableRoutine()
    const [listRoutine, setListRoutine] = useState<any[]>([])

    const isFocused = useIsFocused()

    const getRoutine = async () => {
        setLoading(true)
        try {
            const data = await select()
            setListRoutine(data)
            scheduleNotification({
                id: `reminder-sleep`,
                title: `${translateGlobal('Tidur Dulu')}`,
                body: getRandomSleepNotification() ?? '',
                dateStr: dateToDay(new Date()),
                reminder: `22:00`
            })
            loopNotif(data)
        } catch (error) {
            console.log('error get routine', error)
        } finally {
            setLoading(false)
        }
    }

    const loopNotif = (data: RoutineTable[]) => {
        if (data.length === 0) return
        for (let i = 0; i < data.length; i++) {
            scheduleNotification({
                id: data[i].id!,
                title: data[i].name!,
                body: getRandomNotification() ?? '',
                dateStr: data[i].startDate!,
                reminder: data[i].reminder!
            })
        }
    }

    const updateRoutine = async (detail: any) => {
        try {
            const completeDate = new Date()
            const start = new Date(detail?.startDate)
            const end = new Date(detail?.endDate)
            const complete = new Date(detail?.completeDate)
            if (!detail.completeDate && start.getDate() < completeDate.getDate()) return ToastAndroid.show(`${detail?.name} ${translateGlobal('dimulai')} ${detail?.startDate}`, ToastAndroid.SHORT)
            if (end.getDate() === completeDate.getDate()) return ToastAndroid.show(`${detail?.name} ${translateGlobal('Rutinitas sudah selesai')}!`, ToastAndroid.SHORT)
            if (complete.getDate() === completeDate.getDate()) return ToastAndroid.show(`${translateGlobal('Rutinitas ini sudah dilakuin')}`, ToastAndroid.SHORT)
            update(detail?.id, {
                name: detail?.name,
                description: detail?.description,
                startDate: detail?.startDate,
                endDate: detail?.endDate,
                processDay: detail?.processDay + 1,
                totalTargetDay: detail?.totalTargetDay,
                completeDate: dateToDay(completeDate),
                isCompleted: detail?.endDate === completeDate,
                reminder: detail?.reminder,
                sync: false
            })
            getRoutine()
        } catch (error) {
            console.log('error update routine', error)
        }
    }

    const handleAction = (detail: any, type: string) => {
        if (type === 'complete') {
            updateRoutine(detail)
        } else if (type === 'modify') {
            navigation.navigate('Detail', { data: detail })
        } else if (type === 'delete') {
            Alert.alert(
                `${translateGlobal('Serius')}?`,
                `${translateGlobal('Kamu yakin pengen hapus rutinitas ini')}?`,
                [
                    {
                        text: translateGlobal("Ga jadi"),
                        onPress: () => console.log("Dibatalkan"),
                        style: "cancel"
                    },
                    {
                        text: translateGlobal("Ya, Hapus"),
                        onPress: async () => {
                            const result = await del(detail?.id)
                            if (result) {
                                getRoutine()
                                cancelNotification(detail?.id)
                            }
                        }
                    }
                ],
                { cancelable: true }
            );
        }
    }

    useEffect(() => {
        if (isFocused) getRoutine()
        return () => {
            setListRoutine([])
        }
    }, [isFocused])
    if (loading) return <Loading />
    if (listRoutine.length === 0) return <Empty />
    return (
        <>
            <FlatList
                data={listRoutine}
                keyExtractor={(_, index: number) => index.toString()}
                style={styles.flatlist}
                renderItem={({ item }) =>
                    <RoutineItem
                        item={item}
                        onPress={(detail: any, type: string) => {
                            handleAction(detail, type)
                        }}
                    />
                }
            />
        </>
    )
}

export default DashboardScreen