import { View } from "react-native"
import styles from "./styles"
import ButtonCustom from "@components/ButtonCustom"
import { useNavigation } from "@react-navigation/native"
import { DashboardScreenNavigationProp } from "@types/navigation"
import { Icon, Text } from "react-native-paper"
import { primary, sizeIconRegular, white } from "@utils/constant"
import { useEffect, useState } from "react"
import { RoutineDB } from "@types/db"
import useDB from "@hooks/useDB"

const DashboardScreen = () => {
    const navigation = useNavigation<DashboardScreenNavigationProp>()
    const [listRoutine, setListRoutine] = useState<RoutineDB[]>([])
    const { select } = useDB()

    const getRoutine = async () => {
        const data = await select()
        const result = data as unknown as RoutineDB[]
        console.log(result)
        setListRoutine(result)
    }

    // useEffect(() => {
    //     getRoutine()
    //     return () => {
    //         setListRoutine([])
    //     }
    // }, [listRoutine])
    return (
        <View style={styles.container}>
            <View style={styles.wrapIcon}>
                <Icon source="plus" color={primary} size={sizeIconRegular} />
            </View>
            <View style={styles.wrapText}>
                <Text variant="titleLarge" style={styles.textCenter}>Rutinitas Ga ada</Text>
                <Text variant="bodyMedium" style={styles.textCenter}>Buat rutinitas baru dan kerjain konsisten!</Text>
            </View>
            <ButtonCustom
                title="Skuy Mulai"
                onPress={() => navigation.navigate('AddNew')}
            />
        </View>
    )
}

export default DashboardScreen