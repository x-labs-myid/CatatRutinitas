import { useNavigation } from "@react-navigation/native"
import { DashboardScreenNavigationProp } from "@types/navigation"
import { useEffect, useState } from "react"
import { RoutineDB } from "@types/db"
import useDB from "@hooks/useDB"
import Empty from "@components/dashboard/Empty"
import { FlatList } from "react-native"
import RoutineItem from "@components/dashboard/RoutineItem"
import MenuAction from "@components/dashboard/MenuAction"

const DashboardScreen = () => {
    const navigation = useNavigation<DashboardScreenNavigationProp>()
    const [listRoutine, setListRoutine] = useState<any[]>([])
    const { select } = useDB()
    const [visible, setVisible] = useState<boolean>(false)
    const [idRoutine, setIdRoutine] = useState<string | null>(null)
    const [item, setItem] = useState<RoutineDB | null>(null)

    const getRoutine = async () => {
        const data = await select()
        console.log(data)
        setListRoutine(data)
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
                                onPress={(id: string) => {
                                    setItem(item)
                                    setIdRoutine(id)
                                    setVisible(true)
                                }}
                            />
                        }
                    />
                ) : (
                    <Empty />
                )
            }
            {visible && idRoutine && (
                <MenuAction
                    id={idRoutine}
                    data={item}
                    visible={visible}
                    hideModal={(isModify: boolean) => {
                        setVisible(false)
                        setIdRoutine(null)
                        if (isModify) getRoutine()
                    }}
                />
            )}
        </>
    )
}

export default DashboardScreen