import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

export const createNotificationChannel = () => {
    PushNotification.createChannel(
        {
            channelId: 'catat-rutinitas-channel', // harus sama dengan yg dipakai di notif
            channelName: 'Catat Rutinitas Notifications',
            importance: 4,
            vibrate: true,
        },
        (created) => console.log(`createChannel returned '${created}'`)
    )
}

export const scheduleRoutineNotification = (title: string, message: string, date: Date) => {
    PushNotification.localNotificationSchedule({
        channelId: 'catat-rutinitas-channel', // Sesuai yang kamu buat
        title: title,
        message: message,
        date: date, // Tipe: JavaScript Date object
        allowWhileIdle: true,
        repeatType: 'day', // 'day', 'week', dst
        soundName: 'default',
        playSound: true,
    })
}

export const setAsyncStorage = async (key: string, value: unknown) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
        console.log(e)
    }
}

export const getAsyncStorage = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return JSON.parse(value)
        }
        return null
    } catch (e) {
        console.log(e)
    }
}

export const removeAsyncStorage = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        console.log(e)
    }
}

export const clearAsyncStorage = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        console.log(e)
    }
}


