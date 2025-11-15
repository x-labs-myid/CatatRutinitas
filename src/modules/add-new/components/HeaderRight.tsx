import { StyleSheet, TouchableOpacity } from "react-native"
import { Icon } from "react-native-paper"
import { white, sizeIconRegular, border_radius_button } from "@shared/utils/constant"

import { useNavigation } from '@react-navigation/native'

import funcHooks from '../function'

const HeaderRightAddNew = () => {
    const { onSubmit } = funcHooks()
    const navigation = useNavigation()

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
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    btn: {
        borderRadius: border_radius_button,
        borderWidth: 1,
        borderColor: white
    }
})

export default HeaderRightAddNew