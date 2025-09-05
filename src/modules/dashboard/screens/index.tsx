import { useEffect, useState } from "react"
import { RoutineTable } from "@shared/types/db"
import useTableRoutine from "@services/db_local/routine/use"
import Empty from "@modules/dashboard/components/Empty"
import { FlatList } from "react-native"
import RoutineItem from "@modules/dashboard/components/RoutineItem"
import { dateToDay } from "@shared/utils"
import { useNavigation } from "@react-navigation/native"
import { DashboardScreenNavigationProp } from "@shared/types/navigation"

const DashboardScreen = () => {
    const navigation = useNavigation<DashboardScreenNavigationProp>()
    const [listRoutine, setListRoutine] = useState<any[]>([])
    const { select, update, del } = useTableRoutine()
    const [visible, setVisible] = useState<boolean>(false)
    const [idRoutine, setIdRoutine] = useState<string | null>(null)
    const [item, setItem] = useState<RoutineTable | null>(null)

    const getRoutine = async () => {
        const data = await select()
        setListRoutine(data)
    }

    const handleAction = (detail: any, type: string) => {
        if (type === 'complete') {
            const completeDate = dateToDay(new Date())
            update(detail?.id, {
                name: detail?.name,
                description: detail?.description,
                startDate: detail?.startDate,
                endDate: detail?.endDate,
                processDay: detail?.processDay + 1,
                totalTargetDay: detail?.totalTargetDay,
                completeDate: completeDate,
                isCompleted: detail?.endDate === completeDate
            })
        } else if (type === 'modify') {
            navigation.navigate('Detail', { id: detail?.id })
        } else if (type === 'delete') {
            del(detail?.id)
        }
    }

    useEffect(() => {
        getRoutine()
        return () => {
            setListRoutine([])
        }
    }, [])
    return (
        <>
            {
                listRoutine.length > 0 ? (
                    <FlatList
                        data={listRoutine}
                        keyExtractor={(_, index: number) => index.toString()}
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