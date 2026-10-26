<<<<<<< HEAD
﻿import { useEffect, useRef, useState } from 'react'
import { Button, Card, Icon, Text, TextInput } from 'react-native-paper'
=======
import { useEffect, useRef, useState } from 'react'
import { Button, Icon, Text, TextInput } from 'react-native-paper'
>>>>>>> 947ca2c2a2c15dd8ed9f59135d6717fcc61e6749
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
<<<<<<< HEAD
import funcHooks from '../function'
=======
>>>>>>> 947ca2c2a2c15dd8ed9f59135d6717fcc61e6749

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

    const bannerRef = useRef<BannerAd>(null)
    const bannerId = __DEV__ ? TestIds.BANNER : bannerIdAds

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
<<<<<<< HEAD
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                    <Card style={styles.card} mode="elevated">
                        <Card.Title
                            title={translateGlobal('Periode Rutinitas')}
                            titleStyle={{ fontSize: fontStandard + 1, fontWeight: '600' }}
                            left={(props) => <Icon {...props} source="calendar-range" color={theme!} />}
=======
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <CalendarRangePicker onDateChange={(startDate, endDate, diffDay) => {
                        setStartDate(startDate)
                        setEndDate(endDate)
                        setTotalTargetDay(diffDay)
                    }} />
                    <TextInput
                        label={translateGlobal('Nama')}
                        value={name ?? ''}
                        mode="outlined"
                        style={styles.inputText}
                        activeOutlineColor={theme!}
                        onChangeText={value => setName(value)}
                    />
                    <TextInput
                        label={translateGlobal('Deskripsi')}
                        multiline
                        mode="outlined"
                        style={{ ...styles.inputText, height: 100, marginBottom: 10 }}
                        numberOfLines={4}
                        value={description ?? ''}
                        activeOutlineColor={theme!}
                        onChangeText={value => setDescription(value)}
                    />
                    <View style={styles.reminder}>
                        <View style={styles.reminderText}>
                            <Text style={{ fontSize: fontStandard }}>{reminder ? reminder : `${translateGlobal('Mau Diingetin Jam Berapa')}?`}</Text>
                        </View>
                        <View style={styles.reminderBtn}>
                            <Button
                                mode="contained"
                                buttonColor={theme!}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Icon source="clock-outline" color={white} size={sizeIconRegular} />
                            </Button>
                        </View>
                    </View>
                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={new Date()}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={(event, date) => {
                                if (date) {
                                    setReminder(`${date.getHours()}:${date.getMinutes()}`)
                                    setShowDatePicker(false)
                                }
                            }}
>>>>>>> 947ca2c2a2c15dd8ed9f59135d6717fcc61e6749
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
<<<<<<< HEAD

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

=======
>>>>>>> 947ca2c2a2c15dd8ed9f59135d6717fcc61e6749
            <BannerAd ref={bannerRef} unitId={bannerId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}/>
        </>
    )
}

export default AddNewScreen
