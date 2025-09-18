import { useNavigation } from "@react-navigation/native"
import { DashboardScreenNavigationProp } from "@shared/types/navigation"
import { dimensionHeight, primary, sizeIconRegular } from "@shared/utils/constant"
import { StyleSheet, View } from "react-native"
import { Button, Icon, Text } from "react-native-paper"

const Empty = () => {
    const navigation = useNavigation<DashboardScreenNavigationProp>()
    return (
        <View style={styles.container}>
            <View style={styles.wrapIcon}>
                <Icon source="plus" color={primary} size={sizeIconRegular} />
            </View>
            <View style={styles.wrapText}>
                <Text variant="titleLarge" style={styles.textCenter}>Rutinitas Ga ada</Text>
                <Text variant="bodyMedium" style={styles.textCenter}>Buat rutinitas baru dan kerjain konsisten!</Text>
            </View>
            <Button
                mode="contained"
                buttonColor={primary}
                onPress={() => navigation.navigate('AddNew')}
            >
                Skuy Mulai
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
        borderColor: primary,
        borderRadius: '100%',
    }
})

export default Empty
