<<<<<<< HEAD
﻿import { useRef, useState } from "react"
import { Animated, StyleSheet, TouchableOpacity } from "react-native"
import { ActivityIndicator, Icon } from "react-native-paper"
=======
import { StyleSheet, TouchableOpacity } from "react-native"
import { Icon } from "react-native-paper"
>>>>>>> 947ca2c2a2c15dd8ed9f59135d6717fcc61e6749
import { white, sizeIconRegular, border_radius_button } from "@shared/utils/constant"

import { useNavigation } from '@react-navigation/native'

import funcHooks from '../function'

const HeaderRightAddNew = () => {
    const { onSubmit } = funcHooks()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const scaleAnim = useRef(new Animated.Value(1)).current

<<<<<<< HEAD
    const onPressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.9,
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
            bouncious: 8,
        }).start()
    }

    const handlePress = async () => {
        if (loading) return
        setLoading(true)
        try {
            const result = await onSubmit()
            if (result) {
                navigation.goBack()
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                style={[styles.btn, loading && { opacity: 0.8 }]}
                onPress={handlePress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                disabled={loading}
                activeOpacity={0.9}
            >
                {loading ? (
                    <ActivityIndicator size="small" color={white} />
                ) : (
                    <Icon source="check" color={white} size={sizeIconRegular} />
                )}
=======
    return (
        <>
            <TouchableOpacity 
                style={styles.btn} 
                onPress={async () => {
                    const result = await onSubmit()
                    if(result) {
                        navigation.goBack()
                    }
                }}
            >
                <Icon source="check" color={white} size={sizeIconRegular} />
>>>>>>> 947ca2c2a2c15dd8ed9f59135d6717fcc61e6749
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    btn: {
        borderRadius: border_radius_button,
        borderWidth: 1,
        borderColor: white,
        paddingHorizontal: 6,
        paddingVertical: 4,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 34,
        minHeight: 34,
    }
})

export default HeaderRightAddNew
