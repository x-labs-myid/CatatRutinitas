import { Card, Text, ProgressBar, Button } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import { dimensionHeight, dimensionWidth, white } from "@shared/utils/constant"
import { useAtom } from "jotai"
import useGlobal from "@shared/hooks"
import { descRoutineAtom, themeAtom } from "@shared/atom/atomSetting"

const RoutineItem = ({ item, onPress }: { item: any, onPress: (detail: unknown, type: string) => void }) => {
    const [theme] = useAtom(themeAtom)
    const [descRoutine] = useAtom(descRoutineAtom)
    const { translateGlobal } = useGlobal()
    return (
        <>
            <Card style={styles.card}>
                <Card.Title title={item.name} />
                <Card.Content>
                    {
                        descRoutine && item.description && (
                            <View style={{ marginBottom: dimensionHeight * 0.015 }}>
                                <Text>{item.description}</Text>
                            </View>
                        )
                    }
                    <ProgressBar progress={item.processDay / item.totalTargetDay} color={theme!} />
                    <View style={styles.wrap}>
                        <Text>{item.processDay}/{item.totalTargetDay} {translateGlobal('Hari')}</Text>
                        <Text>{translateGlobal('Selesai')} {item.isCompleted ? '' : `: ${item.endDate}`}</Text>
                    </View>
                    <View style={styles.wrap}>
                        <Button
                            mode="contained"
                            buttonColor={theme!}
                            onPress={() => onPress(item, 'complete')}
                        >{translateGlobal('Selesai')}</Button>
                        <View style={styles.wrapButton}>
                            <Button
                                mode="outlined"
                                theme={{ colors: { outline: theme! } }}
                                textColor={theme!}
                                onPress={() => onPress(item, 'modify')}
                            >{translateGlobal('Ubah')}</Button>
                            <Button
                                mode="outlined"
                                theme={{ colors: { outline: theme! } }}
                                textColor={theme!}
                                onPress={() => onPress(item, 'delete')}
                            >{translateGlobal('Hapus')}</Button>
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