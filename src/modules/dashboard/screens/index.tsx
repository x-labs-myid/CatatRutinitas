import { useEffect, useState } from "react"
import { RoutineTable } from "@shared/types/db"
import useTableRoutine from "@services/db_local/routine/use"
import Empty from "@modules/dashboard/components/Empty"
import { Alert, FlatList, Text, ToastAndroid, View } from "react-native"
import RoutineItem from "@modules/dashboard/components/RoutineItem"
import { cancelNotification, compare2Date, dateInternationalFormat, scheduleNotification } from "@shared/utils"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { DashboardScreenNavigationProp } from "@shared/types/navigation"
import styles from "./styles"
import useGlobal from "@shared/hooks"
import Loading from "@shared/components/Loading"
import Info from "../components/Info"
import Filter from "../components/Filter"
import { fontStandard } from "@shared/utils/constant"
import funcHooks from "../function"

const DashboardScreen = () => {
    const navigation = useNavigation<DashboardScreenNavigationProp>()
    // state
    const [loading, setLoading] = useState<boolean>(false)
    const [listRoutineMain, setListRoutineMain] = useState<any[]>([])
    const [listRoutine, setListRoutine] = useState<any[]>([])
    const [isCompleted, setIsCompleted] = useState<boolean>(false)
    // hooks
    const { translateGlobal } = useGlobal()
    const { select, del } = useTableRoutine()
    const { autoCompleteRoutine, updateRoutine } = funcHooks()

    const isFocused = useIsFocused()

    // get data routine
    const getRoutine = async () => {
        setLoading(true)
        try {
            const data = await select()
            const resultAfterAutoComplete = await autoCompleteRoutine(data)
            setListRoutineMain(data.sort((a: any, b: any) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()))
            onFilter(isCompleted, resultAfterAutoComplete)
        } catch (error) {
            console.log('error get routine', error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 250);
        }
    }

    // function for handle button complete, modify and delete routine
    const handleAction = (detail: any, type: string) => {
        if (type === 'complete') {
            updateRoutine(detail).then((result) => {
                if (result) {
                    getRoutine()
                }
            })
        } else if (type === 'modify') {
            navigation.navigate('Detail', { data: detail._raw })
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
    const onFilter = (type: boolean, param: any = []) => {
        const data = param.length > 0 ? param : listRoutineMain
        if(type) setListRoutine(data.filter((item: any) => item.isCompleted).sort((a: any, b: any) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()))
        else setListRoutine(data.filter((item: any) => !item.isCompleted).sort((a: any, b: any) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()))
        setIsCompleted(type)
    }

    useEffect(() => {
        if (isFocused) getRoutine()
        return () => {
            setLoading(false)
            setListRoutine([])
            setListRoutineMain([])   
        }
    }, [isFocused])

    if (loading) return <Loading />
    if (listRoutineMain.length === 0) return <Empty />
    return (
        <>
            <Info totalRoutines={listRoutine.length} isCompleted={isCompleted}/>
            <FlatList
                data={listRoutine}
                keyExtractor={(_, index: number) => index.toString()}
                contentContainerStyle={styles.flatlist}
                ListEmptyComponent={<View style={styles.emptyList}><Text style={{ fontSize: fontStandard }}>{translateGlobal('Ga ada rutinitas')}</Text></View>}
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