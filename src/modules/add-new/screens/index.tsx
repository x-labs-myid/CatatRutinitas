import { useEffect, useRef, useState } from 'react'
import { Button, Card, Icon, Text, TextInput } from 'react-native-paper'
import { Platform, ScrollView, View } from 'react-native'
import styles from './styles'
import CalendarRangePicker from '@shared/components/CalendarRangePicker'
import { useAtom } from 'jotai'
import { atomDescription, atomEndDate, atomName, atomReminder, atomStartDate, atomTotalTargetDay } from '../atom'
import ScrollKeyboard from '@shared/components/ScrollKeyboard'
import { themeAtom } from '@shared/atom/atomSetting'
import useGlobal from '@shared/hooks'
import DateTimePicker from '@react-native-community/datetimepicker';
import { sizeIconRegular, bannerIdAds, white, fontStandard } from '@shared/utils/constant'
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads'
import funcHooks from '../function'

const AddNewScreen = () => {
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
    const [name, setName] = useAtom(atomName)
    const [description, setDescription] = useAtom(atomDescription)
    const [startDate, setStartDate] = useAtom(atomStartDate)
    const [endDate, setEndDate] = useAtom(atomEndDate)
    const [, setTotalTargetDay] = useAtom(atomTotalTargetDay)
    const [reminder, setReminder] = useAtom(atomReminder)
    const [theme] = useAtom(themeAtom)
    const { translateGlobal } = useGlobal()
    const { getReminderDate } = funcHooks()

    const bannerRef = useRef<BannerAd>(null)
    const bannerId = __DEV__ ? TestIds.BANNER : bannerIdAds

    useForeground(() => {
        Platform.OS === 'ios' && bannerRef.current?.load()
    })

    useForeground(() => {
        Platform.OS === 'ios' && bannerRef.current?.load()
    })

    useEffect(() => {
        return () => {
            setName(null)
            setDescription(null)
            setStartDate(null)
            setEndDate(null)
            setTotalTargetDay(0)
            setReminder(null)
        }
    }, [])

    const cardBg = theme ? undefined : undefined

    return (
        <>
            <ScrollKeyboard>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                    <Card style={styles.card} mode="elevated">
                        <Card.Title
                            title={translateGlobal('Periode Rutinitas')}
                            titleStyle={{ fontSize: fontStandard + 1, fontWeight: '600' }}
                            left={(props) => <Icon {...props} source="calendar-range" color={theme!} />}
                        />
                        <Card.Content style={styles.cardContent}>
                            <CalendarRangePicker onDateChange={(startDate, endDate, diffDay) => {
                                setStartDate(startDate)
                                setEndDate(endDate)
                                setTotalTargetDay(diffDay)
                            }} />
                        </Card.Content>
                    </Card>

                    <Card style={[styles.card]} mode="elevated">
                        <Card.Title
                            title={translateGlobal('Detail Rutinitas')}
                            titleStyle={{ fontSize: fontStandard + 1, fontWeight: '600' }}
                            left={(props) => <Icon {...props} source="note-edit-outline" color={theme!} />}
                        />
                        <Card.Content style={styles.cardContent}>
                            <TextInput
                                label={translateGlobal('Nama')}
                                value={name ?? ''}
                                mode="outlined"
                                style={styles.inputText}
                                activeOutlineColor={theme!}
                                outlineColor="#d8d8d8"
                                onChangeText={value => setName(value)}
                            />
                            <TextInput
                                label={translateGlobal('Deskripsi')}
                                multiline
                                mode="outlined"
                                style={[styles.inputText, { minHeight: 100, textAlignVertical: 'top' }]}
                                value={description ?? ''}
                                activeOutlineColor={theme!}
                                outlineColor="#d8d8d8"
                                onChangeText={value => setDescription(value)}
                            />
                        </Card.Content>
                    </Card>

                    <Card style={[styles.card]} mode="elevated">
                        <Card.Title
                            title={translateGlobal('Pengingat')}
                            titleStyle={{ fontSize: fontStandard + 1, fontWeight: '600' }}
                            left={(props) => <Icon {...props} source="bell-outline" color={theme!} />}
                        />
                        <Card.Content style={styles.cardContent}>
                            <View style={styles.reminderRow}>
                                <View style={styles.reminderInfo}>
                                    <Icon source="clock-time-four-outline" color={theme!} size={sizeIconRegular} />
                                    <Text style={styles.reminderText}>
                                        {reminder ? reminder : `${translateGlobal('Mau Diingetin Jam Berapa')}?`}
                                    </Text>
                                </View>
                                <View style={styles.reminderBtn}>
                                    <Button
                                        mode="contained"
                                        buttonColor={theme!}
                                        contentStyle={{ paddingHorizontal: 6 }}
                                        onPress={() => setShowDatePicker(true)}
                                    >
                                        <Icon source="clock-edit-outline" color={white} size={sizeIconRegular} />
                                    </Button>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                </ScrollView>
            </ScrollKeyboard>

            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={getReminderDate()}
                    mode="time"
                    is24Hour
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, date) => {
                        setShowDatePicker(false)
                        if (event.type === 'set' && date) {
                            const hours = date.getHours().toString().padStart(2, '0')
                            const minutes = date.getMinutes().toString().padStart(2, '0')
                            setReminder(`${hours}:${minutes}`)
                        }
                    }}
                />
            )}

            <BannerAd ref={bannerRef} unitId={bannerId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}/>
        </>
    )
}

export default AddNewScreen
