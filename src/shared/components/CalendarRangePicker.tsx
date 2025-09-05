import { primary } from '@shared/utils/constant'
import { countDiffDay } from '@shared/utils/index'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars'

const CalendarRangePicker = ({onDateChange}: {onDateChange: (startDate: string, endDate: string, diffDay: number) => void}) => {
    const [startDate, setStartDate] = useState<string | null>(null)
    const [endDate, setEndDate] = useState<string | null>(null)
    const [totalTargetDay, setTotalTargetDay] = useState<number | 0>(0)

    const onDayPress = (day: any) => {
        const selectedDate = day.dateString

        if (!startDate || (startDate && endDate)) {
            setStartDate(selectedDate)
            setEndDate(null)
        } else if (startDate && !endDate) {
            if (selectedDate < startDate) {
                setStartDate(selectedDate)
            } else {
                setEndDate(selectedDate)
                const start = new Date(startDate)
                const end = new Date(selectedDate)
                const diffDay = countDiffDay(start, end)
                setTotalTargetDay(diffDay)
            }
        }
    }

    const generateMarkedDates = () => {
        if (!startDate) return {}

        let markedDates: Record<string, any> = {
            [startDate]: {
                startingDay: true,
                color: primary,
                textColor: 'white',
            },
        }

        if (!endDate) {
            markedDates[startDate] = {
                ...markedDates[startDate],
                endingDay: true,
            }
            return markedDates
        }

        let currentDate = new Date(startDate)
        const end = new Date(endDate)

        while (currentDate <= end) {
            const dateStr = currentDate.toISOString().split('T')[0]

            if (dateStr === startDate) {
                markedDates[dateStr] = {
                    startingDay: true,
                    color: primary,
                    textColor: 'white',
                }
            } else if (dateStr === endDate) {
                markedDates[dateStr] = {
                    endingDay: true,
                    color: primary,
                    textColor: 'white',
                }
            } else {
                markedDates[dateStr] = {
                    color: primary,
                    textColor: 'white',
                }
            }

            currentDate.setDate(currentDate.getDate() + 1)
        }

        return markedDates
    }

    useEffect(() => {
        if(startDate && endDate) onDateChange(startDate, endDate, totalTargetDay)
    }, [startDate, endDate])

    return (
        <View style={styles.container}>
            <Calendar
                markingType="period"
                markedDates={generateMarkedDates()}
                onDayPress={onDayPress}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 16,
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 4,
    },
})

export default CalendarRangePicker