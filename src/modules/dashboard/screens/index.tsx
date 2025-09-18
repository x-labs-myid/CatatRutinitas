import { useEffect, useState } from "react"
import { RoutineTable } from "@shared/types/db"
import useTableRoutine from "@services/db_local/routine/use"
import Empty from "@modules/dashboard/components/Empty"
import { Alert, FlatList, ToastAndroid } from "react-native"
import RoutineItem from "@modules/dashboard/components/RoutineItem"
import { cancelNotification, dateToDay } from "@shared/utils"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { DashboardScreenNavigationProp } from "@shared/types/navigation"
import styles from "./styles"

const DashboardScreen = () => {
    const navigation = useNavigation<DashboardScreenNavigationProp>()
    const { select, find, update, del } = useTableRoutine()
    const [listRoutine, setListRoutine] = useState<any[]>([])
    const [visible, setVisible] = useState<boolean>(false)
    const [idRoutine, setIdRoutine] = useState<string | null>(null)
    const [item, setItem] = useState<RoutineTable | null>(null)
    
    const isFocused = useIsFocused()

    const getRoutine = async () => {
        const data = await select()
        setListRoutine(data)
    }

    const handleAction = (detail: any, type: string) => {
        if (type === 'complete') {
            const completeDate = new Date()
            const start = new Date(detail?.startDate)
            const end = new Date(detail?.endDate)
            const complete = new Date(detail?.completeDate)
            if(!detail.completeDate && start.getTime() < completeDate.getTime()) return ToastAndroid.show(`${detail?.name} dimulai ${detail?.startDate}`, ToastAndroid.SHORT)
            if(end.getTime() === completeDate.getTime()) return ToastAndroid.show('Rutinitas sudah selesai!', ToastAndroid.SHORT)
            if(complete.getTime() === completeDate.getTime()) return ToastAndroid.show('Rutinitas hari ini sudah dilakuin!', ToastAndroid.SHORT)
            update(detail?.id, {
                name: detail?.name,
                description: detail?.description,
                startDate: detail?.startDate,
                endDate: detail?.endDate,
                processDay: detail?.processDay + 1,
                totalTargetDay: detail?.totalTargetDay,
                completeDate: dateToDay(completeDate),
                isCompleted: detail?.endDate === completeDate
            })
            getRoutine()
        } else if (type === 'modify') {
            navigation.navigate('Detail', { data: detail })
        } else if (type === 'delete') {
            Alert.alert(
                "Warning",
                "kamu yakin pengen hapus rutinitas ini?",
                [
                  {
                    text: "Ga jadi",
                    onPress: () => console.log("Dibatalkan"),
                    style: "cancel"
                  },
                  {
                    text: "Ya, Hapus",
                    onPress: async () => {
                        const result = await del(detail?.id)
                        if(result) {
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
    return (
        <>
            {
                listRoutine.length > 0 ? (
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
                ) : (
                    <Empty />
                )
            }
        </>
    )
}

export default DashboardScreen