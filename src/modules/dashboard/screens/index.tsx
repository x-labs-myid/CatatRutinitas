import { useEffect, useState } from "react"
import { RoutineTable } from "@shared/types/db"
import useTableRoutine from "@services/db_local/routine/use"
import Empty from "@modules/dashboard/components/Empty"
import { Alert, FlatList, Text, ToastAndroid, View } from "react-native"
import RoutineItem from "@modules/dashboard/components/RoutineItem"
import { cancelNotification, dateInternationalFormat, scheduleNotification } from "@shared/utils"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { DashboardScreenNavigationProp } from "@shared/types/navigation"
import styles from "./styles"
import useGlobal from "@shared/hooks"
import Loading from "@shared/components/Loading"
import Info from "../components/Info"
import Filter from "../components/Filter"
import Routine from "@services/db_local/routine/model"

const DashboardScreen = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { translateGlobal, getRandomNotification, getRandomSleepNotification } = useGlobal()
    const navigation = useNavigation<DashboardScreenNavigationProp>()
    const { select, update, del } = useTableRoutine()
    const [listRoutineMain, setListRoutineMain] = useState<any[]>([])
    const [listRoutine, setListRoutine] = useState<any[]>([])
    const [isCompleted, setIsCompleted] = useState<boolean>(false)

    const isFocused = useIsFocused()

    // get data routine
    const getRoutine = async () => {
        setLoading(true)
        try {
            const data = await select()
            const resultAfterAutoComplete = await autoCompleteRoutine(data)
            setIsCompleted(false)
            setListRoutineMain(data)
            setListRoutine(resultAfterAutoComplete.filter((item: any) => !item.isCompleted))
        } catch (error) {
            console.log('error get routine', error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 250);
        }
    }

    // auto complete routine if today > endDate
    const autoCompleteRoutine = async (data: Routine[]) => {
        let result: Routine[] = []
        const today = new Date()
        for(let i = 0; i < data.length; i++) {
            const end = new Date(data[i].endDate)
            if(!data[i].isCompleted && today.getDate() > end.getDate() ) {
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
            } else {
                result.push(data[i])
            }
        }
        console.log('result after auto complete', result)
        return result
    }

    // update routine if user complete routine
    const updateRoutine = async (detail: any) => {
        try {
            const completeDate = new Date()
            const start = new Date(detail?.startDate)
            const end = new Date(detail?.endDate)
            const complete = new Date(detail?.completeDate)
            if (completeDate.getDate() > end.getDate()) return ToastAndroid.show(`${detail?.name} ${translateGlobal('Rutinitas udah selesai')}!`, ToastAndroid.SHORT)
            if (complete.getDate() === completeDate.getDate()) return ToastAndroid.show(`${translateGlobal('Rutinitas ini udah dilakuin')}`, ToastAndroid.SHORT)
            if (!detail.completeDate && completeDate.getDate() < start.getDate()) return ToastAndroid.show(`${detail?.name} ${translateGlobal('dimulai')} ${detail?.startDate}`, ToastAndroid.SHORT)
            update(detail?.id, {
                name: detail?.name,
                description: detail?.description,
                startDate: detail?.startDate,
                endDate: detail?.endDate,
                processDay: detail?.processDay + 1,
                totalTargetDay: detail?.totalTargetDay,
                completeDate: dateInternationalFormat(completeDate),
                isCompleted: end.getDate() === completeDate.getDate(),
                reminder: detail?.reminder,
                sync: false
            })
            if(end.getDate() === completeDate.getDate()) {
                cancelNotification(detail?.id)
            } else {
                scheduleNotification({
                    id: detail?.id!,
                    title: detail?.name!,
                    body: getRandomNotification() ?? '',
                    dateStr: dateInternationalFormat(completeDate),
                    reminder: detail?.reminder!
                })
                scheduleNotification({
                    id: `reminder-sleep`,
                    title: `${translateGlobal('Tidur Dulu')}`,
                    body: getRandomSleepNotification() ?? '',
                    dateStr: dateInternationalFormat(completeDate),
                    reminder: `22:0`
                })
            }
            getRoutine()
        } catch (error) {
            console.log('error update routine', error)
        }
    }

    // function for handle button complete, modify and delete routine
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

    // function for filter data complete and not complete
    const onFilter = (type: boolean) => {
        if(type) setListRoutine(listRoutineMain.filter((item: any) => item.isCompleted))
        else setListRoutine(listRoutineMain.filter((item: any) => !item.isCompleted))
        setIsCompleted(type)
    }

    useEffect(() => {
        if (isFocused) getRoutine()
    }, [isFocused])

    useEffect(() => {
        return () => {
            setIsCompleted(false)
            setListRoutine([])
            setListRoutineMain([])   
        }
    }, [])

    if (loading) return <Loading />
    if (listRoutineMain.length === 0) return <Empty />
    return (
        <>
            <Info totalRoutines={listRoutine.length} isCompleted={isCompleted}/>
            <FlatList
                data={listRoutine}
                keyExtractor={(_, index: number) => index.toString()}
                contentContainerStyle={styles.flatlist}
                ListEmptyComponent={<View style={styles.emptyList}><Text>{translateGlobal('Belum ada rutinitas yang kamu selesain')}</Text></View>}
                renderItem={({ item }) =>
                    <RoutineItem
                        item={item}
                        onPress={(detail: any, type: string) => {
                            handleAction(detail, type)
                        }}
                    />
                }
                scrollEventThrottle={16}
            />
            <Filter isCompleted={isCompleted} onPress={onFilter} />
        </>
    )
}

export default DashboardScreen