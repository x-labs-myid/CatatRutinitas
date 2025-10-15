import { Card, Text, ProgressBar, Button } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import { dimensionHeight, dimensionWidth, white } from "@shared/utils/constant"
import { useAtom } from "jotai"
import useGlobal from "@shared/hooks"
import { descRoutineAtom, themeAtom } from "@shared/atom/atomSetting"
import Badge from "./Badge"
import { languageAtom } from "@shared/atom/atomSetting"

const RoutineItem = ({ item, onPress }: { item: any, onPress: (detail: unknown, type: string) => void }) => {
    const [theme] = useAtom(themeAtom)
    const [language] = useAtom(languageAtom)
    const [descRoutine] = useAtom(descRoutineAtom)
    const { translateGlobal, dateWithMonthTextFormat } = useGlobal()

    function routineTodayComplete() {
        const today = new Date()
        const completeDate = new Date(item.completeDate)
        return today >= completeDate
    }
    return (
        <>
            <Card style={styles.card}>
                <Card.Title title={item.name} right={() => item.isCompleted ? <Badge isComplete={item.totalTargetDay == item.processDay} /> : null} />
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
                        <Text>{translateGlobal('Selesai')}: {dateWithMonthTextFormat(item.endDate, language!)}</Text>
                    </View>
                    <View style={styles.wrap}>
                        <Button
                            mode="contained"
                            buttonColor={theme!}
                            textColor={white}
                            onPress={() => onPress(item, 'complete')}
                            disabled={item.isCompleted || routineTodayComplete()}
                            icon={item.isCompleted || routineTodayComplete() ? 'check' : ''}
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
        marginBottom: dimensionHeight * 0.015
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