import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee from '@notifee/react-native';
import { TimestampTrigger, TriggerType, RepeatFrequency } from '@notifee/react-native';
import { notificationChannelId, notificationName } from './constant';

export const setupNotification = async () => {
    await notifee.requestPermission();
    await notifee.createChannel({
        id: notificationChannelId,
        name: notificationName,
    });
}

export const scheduleNotification = async ({ id, title, body, dateStr }: { id: string, title: string, body: string, dateStr: string }) => {
    const date = new Date(dateStr);
    date.setHours(5);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    // Cek apakah waktu yang diset sudah lewat dari waktu sekarang
    if (date.getTime() < new Date().getTime()) {
        console.log("Scheduled time is in the past, adjusting to tomorrow.");
        date.setDate(date.getDate() + 1); // Jika sudah lewat, set ke hari berikutnya
    }

    const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime(),
        repeatFrequency: RepeatFrequency.DAILY, // Ulang setiap hari
    };

    try {
        await notifee.createTriggerNotification(
            {
                id: id,
                title: title,
                body: body,
                android: {
                    channelId: notificationChannelId, // Pastikan channel sudah benar
                },
                ios: {
                    categoryId: notificationChannelId, // Pastikan category sudah benar
                },
            },
            trigger
        );
        console.log("Notification scheduled successfully.");
    } catch (error) {
        console.error("Error scheduling notification:", error);
    }
}

export const cancelNotification = async (id: string) => {
    await notifee.cancelTriggerNotification(id);
}

export const cancelAllNotification = async () => {
    await notifee.cancelAllNotifications();
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
        return null
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

export const dateToDay = (date: Date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
}

export const countDiffDay = (startDate: Date, endDate: Date) => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
}


