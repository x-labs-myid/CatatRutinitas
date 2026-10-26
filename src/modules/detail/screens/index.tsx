import React, { useEffect, useRef, useState } from 'react'
import { Animated, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator, Button, Card, Icon, Text, TextInput } from 'react-native-paper'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { useAtom } from 'jotai'
import { themeAtom } from '@shared/atom/atomSetting'
import useGlobal from '@shared/hooks'
import funcHooks from '../function'
import DateTimePicker from '@react-native-community/datetimepicker';
import { bannerIdAds, fontStandard, sizeIconRegular, white, border_radius_button } from '@shared/utils/constant'
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads'

const DetailScreen = ({ route }: { route: any }) => {
    const navigation = useNavigation()
    const { data } = route.params
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
    const [name, setName] = useState<string | null>(data?.name)
    const [description, setDescription] = useState<string | null>(data?.description)
    const [reminder, setReminder] = useState<string | null>(data?.reminder)
    const [loading, setLoading] = useState<boolean>(false)
    const [theme] = useAtom(themeAtom)
    const { translateGlobal } = useGlobal()
    const { onSubmit } = funcHooks()

    const bannerRef = useRef<BannerAd>(null)
    const bannerId = __DEV__ ? TestIds.BANNER : bannerIdAds
    const scaleAnim = useRef(new Animated.Value(1)).current

    useForeground(() => {
        Platform.OS === 'ios' && bannerRef.current?.load()
    })

    useEffect(() => {
        return () => {
            setName(null)
            setDescription(null)
            setReminder(null)
        }
    }, [])

    const onPressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.98,
            useNativeDriver: true,
            speed: 20,
            bounciness: 8,
        }).start()
    }

    const onPressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            speed: 20,
            bounciness: 8,
        }).start()
    }

    const handleSubmit = async () => {
        if (loading) return
        setLoading(true)
        try {
            const result = await onSubmit({ name: name!, description: description!, reminder: reminder!, data })
            if (result) {
                navigation.goBack()
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={80}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
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

                    {!data?.isCompleted && (
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
                    )}
                </ScrollView>
            </TouchableWithoutFeedback>

            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={reminder ? (() => {
                        const d = new Date()
                        const [h, m] = reminder.split(':').map(Number)
                        if (!isNaN(h) && !isNaN(m)) { d.setHours(h); d.setMinutes(m); d.setSeconds(0); d.setMilliseconds(0) }
                        return d
                    })() : new Date()}
                    mode="time"
                    is24Hour={true}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, date) => {
                        if (event.type === 'dismissed') {
                            setShowDatePicker(false)
                            return
                        }
                        if (date) {
                            const hours = date.getHours().toString().padStart(2, '0')
                            const minutes = date.getMinutes().toString().padStart(2, '0')
                            setReminder(`${hours}:${minutes}`)
                            setShowDatePicker(false)
                        } else {
                            setShowDatePicker(false)
                        }
                    }}
                />
            )}

            <View style={styles.bottomBar}>
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <TouchableOpacity
                        onPressIn={onPressIn}
                        onPressOut={onPressOut}
                        onPress={handleSubmit}
                        disabled={loading}
                        activeOpacity={0.9}
                        style={{
                            backgroundColor: theme!,
                            borderRadius: border_radius_button,
                            paddingVertical: 12,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            gap: 8,
                            opacity: loading ? 0.8 : 1,
                            elevation: 2,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 3,
                        }}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color={white} />
                        ) : (
                            <Icon source="content-save-outline" color={white} size={sizeIconRegular} />
                        )}
                        <Text style={{ color: white, fontSize: fontStandard, fontWeight: '600' }}>
                            {loading ? translateGlobal('Menyimpan') : translateGlobal('Ubah')}
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
            <BannerAd ref={bannerRef} unitId={bannerId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}/>
        </KeyboardAvoidingView>
    )
}

export default DetailScreen
