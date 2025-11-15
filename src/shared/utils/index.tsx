import notifee, { TimestampTrigger, TriggerType, RepeatFrequency } from '@notifee/react-native';
import { English, Indonesia, listWordNotification, Melayu, notificationChannelId, notificationName, traslateIndonesia } from './constant';
import { mmkv } from '@services/stores/mmkv';
import wordsID from '@services/data/id';
import wordsEN from '@services/data/en';
import wordsMY from '@services/data/my';

export const setupNotification = async () => {
    await notifee.requestPermission();
    await notifee.createChannel({
        id: notificationChannelId,
        name: notificationName,
    });
}

export const scheduleNotification = async ({ id, title, body, dateStr, reminder }: { id: string, title: string, body: string, dateStr: string, reminder : string }) => {
    const splitReminder = reminder.split(':')
    const date = new Date(dateStr);
    date.setHours(Number(splitReminder[0]));
    date.setMinutes(Number(splitReminder[1]));
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

export const clearMMKVStorage = () => {
    try {
        mmkv.clearAll()
    } catch (e) {
        console.log(e)
    }
}

export const dateInternationalFormat = (date: Date) => {
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

export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const compare2Date = (date1: Date, date2: Date, operator: string) => {
    // date1 selalu sama dengan date2
    if(operator === '=') return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
    // date1 selalu lebih besar dari date2
    if(operator === '>') {
        if(date1.getMonth() > date2.getMonth() && date1.getFullYear() === date2.getFullYear()) return true
        if(date1.getMonth() === date2.getMonth() && date1.getFullYear() > date2.getFullYear()) return true
        if(date1.getDate() > date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()) return true
        return false
    }
    // date1 selalu lebih kecil dari date2
    if(operator === '<') {
        if(date1.getMonth() < date2.getMonth() && date1.getFullYear() === date2.getFullYear()) return true
        if(date1.getMonth() === date2.getMonth() && date1.getFullYear() < date2.getFullYear()) return true
        if(date1.getDate() < date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()) return true
        return false
    }
}


