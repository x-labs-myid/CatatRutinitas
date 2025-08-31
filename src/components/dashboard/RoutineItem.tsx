import { RoutineDB } from "@types/db"
import { Card, Text, ProgressBar } from "react-native-paper"
import { StyleSheet } from "react-native"
import { dimensionHeight, dimensionWidth } from "@utils/constant"

const RoutineItem = ({ item, onPress }: { item: any, onPress: (id: string) => void }) => {
    return (
        <>
            <Card style={styles.card} onPress={() => onPress(item.id)}>
                <Card.Title title={item.name} />
                <Card.Content>
                    <ProgressBar progress={item.processDay / item.totalTargetDay} />
                </Card.Content>
            </Card>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        marginVertical: dimensionHeight * 0.015,
        marginHorizontal: dimensionWidth * 0.04
    }
})

export default RoutineItem