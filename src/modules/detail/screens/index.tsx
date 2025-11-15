import React, { useEffect, useRef, useState } from 'react'
import { Button, Icon, Text, TextInput } from 'react-native-paper'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, View } from 'react-native'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { useAtom } from 'jotai'
import { themeAtom } from '@shared/atom/atomSetting'
import useGlobal from '@shared/hooks'
import funcHooks from '../function'
import DateTimePicker from '@react-native-community/datetimepicker';
import { bannerIdAds, fontStandard, sizeIconRegular, white } from '@shared/utils/constant'
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads'

const DetailScreen = ({ route }: { route: any }) => {
    const navigation = useNavigation() // navigation
    const { data } = route.params // data param
    // state
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
    const [name, setName] = useState<string | null>(data?.name)
    const [description, setDescription] = useState<string | null>(data?.description)
    const [reminder, setReminder] = useState<string | null>(data?.reminder)
    // jotai
    const [theme] = useAtom(themeAtom)
    // hooks
    const { translateGlobal } = useGlobal()
    const { onSubmit } = funcHooks()

    const bannerRef = useRef<BannerAd>(null)
    const bannerId = __DEV__ ? TestIds.BANNER : bannerIdAds

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

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={80}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.container}>
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
                        style={{ ...styles.inputText, height: 100 }}
                        numberOfLines={4}
                        value={description ?? ''}
                        activeOutlineColor={theme!}
                        onChangeText={value => setDescription(value)}
                    />
                    {!data?.isCompleted && (
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
                    )}
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
                        />
                    )}
                    <View style={styles.wrapBtn}>
                        <Button
                            mode="contained"
                            buttonColor={theme!}
                            onPress={() => {
                                if(onSubmit({ name: name!, description: description!, reminder: reminder!, data })) {
                                    navigation.goBack()
                                }
                            }}
                            labelStyle={{ fontSize: fontStandard }}
                        >{translateGlobal('Ubah')}</Button>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            <BannerAd ref={bannerRef} unitId={bannerId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}/>
        </KeyboardAvoidingView>
    )
}

export default DetailScreen