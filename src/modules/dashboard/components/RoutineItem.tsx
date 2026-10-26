import { Card, Text, ProgressBar, Button, Icon } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import { dimensionHeight, dimensionWidth, fontSmall, fontStandard, fontTitle, sizeIconMedium, white } from "@shared/utils/constant"
import { useAtom } from "jotai"
import useGlobal from "@shared/hooks"
import { descRoutineAtom, themeAtom } from "@shared/atom/atomSetting"
import Badge from "./Badge"
import { languageAtom } from "@shared/atom/atomSetting"
import funcHooks from "../function"

const RoutineItem = ({ item, onPress }: { item: any, onPress: (detail: unknown, type: string) => void }) => {
    // jotai
    const [theme] = useAtom(themeAtom)
    const [language] = useAtom(languageAtom)
    const [descRoutine] = useAtom(descRoutineAtom)
    // hooks
    const { translateGlobal, dateWithMonthTextFormat } = useGlobal()
    const { routineTodayComplete } = funcHooks()

    return (
        <>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.wrapCardContent}>
                        <View style={styles.wrapCardContentDay}>
                            <View style={{ ...styles.box, backgroundColor: theme! }}>
                                {!item.isCompleted && <Icon source="calendar-blank-outline" size={sizeIconMedium} color={white} />}
                                {item.isCompleted && <Icon source={item.totalTargetDay == item.processDay ? 'emoticon-excited' : 'emoticon-cry'} size={sizeIconMedium} color={white} />}
                                <Text style={{ color: white, fontSize: fontStandard }}>{item.processDay}/{item.totalTargetDay} {translateGlobal('Hari')}</Text>
                            </View>
                            {descRoutine && <Text style={{ fontSize: fontSmall, textAlign: 'center' }}>{dateWithMonthTextFormat(item.endDate, language!)}</Text>}
                        </View>
                        <View style={styles.wrapCardContentDetail}>
                            <View style={styles.detailTitle}>
                                <View style={styles.detailTitleContent}>
                                    <View style={{ flex: item.isCompleted ? 0.75 : 1 }}>
                                        <Text style={{ fontSize: fontStandard, fontWeight: 'bold' }}>{item.name}</Text>
                                    </View>
                                    {item.isCompleted && (
                                        <View style={{ flex: 0.25 }}>
                                            <Badge isComplete={item.totalTargetDay == item.processDay} />
                                        </View>
                                    )}
                                </View>
                                {
                                    descRoutine && item.description && (
                                        <View style={{ marginTop: dimensionHeight * 0.015 }}>
                                            <Text style={{ fontSize: fontStandard }}>{item.description}</Text>
                                        </View>
                                    )
                                }
                            </View>
                            <ProgressBar progress={item.processDay / item.totalTargetDay} color={theme!} />
                            {!descRoutine && (
                                <View style={{ marginTop: dimensionHeight * 0.01 }}>
                                    <Text style={{ fontSize: fontStandard }}>{translateGlobal('Selesai')}: {dateWithMonthTextFormat(item.endDate, language!)}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={styles.wrapBtn}>
                        <Button
                            mode="contained"
                            buttonColor={theme!}
                            textColor={white}
                            onPress={() => onPress(item, 'complete')}
                            disabled={item.isCompleted || routineTodayComplete(item.completeDate)}
                            icon="check"
                            labelStyle={{
                                fontSize: fontStandard
                            }}
                            compact={true}
                        >{translateGlobal('Selesai')}</Button>
                        <View style={styles.wrapBtnChangeData}>
                            <Button
                                mode="outlined"
                                theme={{ colors: { outline: theme! } }}
                                textColor={theme!}
                                onPress={() => onPress(item, 'modify')}
                                icon="pencil"
                                labelStyle={{
                                    fontSize: fontStandard
                                }}
                                compact={true}
                            >{translateGlobal('Ubah')}</Button>
                            <Button
                                mode="outlined"
                                theme={{ colors: { outline: theme! } }}
                                textColor={theme!}
                                onPress={() => onPress(item, 'delete')}
                                icon="delete"
                                labelStyle={{
                                    fontSize: fontStandard
                                }}
                                compact={true}
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
    wrapCardContent: { flexDirection: 'row', gap: 4, alignItems: 'center' },
    wrapCardContentDay: { flex: 0.25 },
    box: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingVertical: dimensionHeight * 0.014, marginBottom: 4, borderRadius: 8 },
    wrapCardContentDetail: { flex: 0.75, paddingLeft: dimensionWidth * 0.02 },
    detailTitle: { marginBottom: dimensionHeight * 0.015 },
    detailTitleContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 2 },
    wrapBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: dimensionHeight * 0.015
    },
    wrapBtnChangeData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: dimensionWidth * 0.02
    }
})

export default RoutineItem