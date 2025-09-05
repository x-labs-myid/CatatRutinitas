import { Card, Text, ProgressBar } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import { dimensionHeight, dimensionWidth } from "@shared/utils/constant"
import ButtonCustom from "@shared/components/ButtonCustom"
import ButtonCustomOutline from "@shared/components/ButtonCustomOutline"

const RoutineItem = ({ item, onPress }: { item: any, onPress: (detail: unknown, type: string) => void }) => {
    return (
        <>
            <Card style={styles.card}>
                <Card.Title title={item.name} />
                <Card.Content>
                    <ProgressBar progress={item.processDay / item.totalTargetDay} />
                    <View style={styles.wrap}>
                        <Text>{item.processDay}/{item.totalTargetDay} Hari</Text>
                        <Text>{item.startDate} s/d {item.endDate}</Text>
                    </View>
                    <View style={styles.wrap}>
                        <ButtonCustom
                            title="Selesai"
                            onPress={() => onPress(item, 'complete')}
                        />
                        <View style={styles.wrapButton}>
                            <ButtonCustomOutline
                                title="Ubah"
                                onPress={() => onPress(item, 'modify')}
                            />
                            <ButtonCustomOutline
                                title="Hapus"
                                onPress={() => onPress(item, 'delete')}
                            />
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        marginVertical: dimensionHeight * 0.015,
        marginHorizontal: dimensionWidth * 0.04
    },
    wrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: dimensionHeight * 0.015
    },
    wrapButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: dimensionWidth * 0.02
    }
})

export default RoutineItem