import { Card, Text, ProgressBar, Button } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import { dimensionHeight, dimensionWidth, primary, white } from "@shared/utils/constant"

const RoutineItem = ({ item, onPress }: { item: any, onPress: (detail: unknown, type: string) => void }) => {
    return (
        <>
            <Card style={styles.card}>
                <Card.Title title={item.name} />
                <Card.Content>
                    <ProgressBar progress={item.processDay / item.totalTargetDay} color={primary} />
                    <View style={styles.wrap}>
                        <Text>{item.processDay}/{item.totalTargetDay} Hari</Text>
                        <Text>Selesai: {item.endDate}</Text>
                    </View>
                    <View style={styles.wrap}>
                        <Button
                            mode="contained"
                            buttonColor={primary}
                            onPress={() => onPress(item, 'complete')}
                        >Selesai</Button>
                        <View style={styles.wrapButton}>
                            <Button
                                mode="outlined"
                                theme={{ colors: { outline: primary } }}
                                textColor={primary}
                                onPress={() => onPress(item, 'modify')}
                            >Ubah</Button>
                            <Button
                                mode="outlined"
                                theme={{ colors: { outline: primary } }}
                                textColor={primary}
                                onPress={() => onPress(item, 'delete')}
                            >Hapus</Button>
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: white,
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