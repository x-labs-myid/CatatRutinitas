import { useNavigation } from "@react-navigation/native"
import { DashboardScreenNavigationProp } from "@shared/types/navigation"
import { dimensionHeight, sizeIconRegular } from "@shared/utils/constant"
import { StyleSheet, View } from "react-native"
import { Button, Icon, Text } from "react-native-paper"
import { useAtom } from "jotai"
import { themeAtom } from "@shared/atom/atomSetting"
import useGlobal from "@shared/hooks"

const Empty = () => {
    const navigation = useNavigation<DashboardScreenNavigationProp>()
    const { translateGlobal } = useGlobal()
    const [theme] = useAtom(themeAtom)
    return (
        <View style={styles.container}>
            <View style={{...styles.wrapIcon, borderColor: theme!}}>
                <Icon source="plus" color={theme!} size={sizeIconRegular} />
            </View>
            <View style={styles.wrapText}>
                <Text variant="titleLarge" style={styles.textCenter}>{translateGlobal('Rutinitas Ga ada')}</Text>
                <Text variant="bodyMedium" style={styles.textCenter}>{translateGlobal('Buat rutinitas baru dan kerjain konsisten')}!</Text>
            </View>
            <Button
                mode="contained"
                buttonColor={theme!}
                onPress={() => navigation.navigate('AddNew')}
            >
                {translateGlobal('Skuy Mulai')}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapText: {
        marginVertical: dimensionHeight * 0.015
    },
    textCenter: {
        textAlign: 'center'
    },
    wrapIcon: {
        padding: 3,
        borderWidth: 1.2,
        borderRadius: '100%',
    }
})

export default Empty
