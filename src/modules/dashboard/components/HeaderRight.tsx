import { TouchableOpacity, View } from "react-native"
import { Icon } from "react-native-paper"
import { white, sizeIconRegular } from "@shared/utils/constant"
import { useNavigation } from "@react-navigation/native"
import { DashboardScreenNavigationProp } from "@shared/types/navigation"

const HeaderRight = () => {
    const navigation = useNavigation<DashboardScreenNavigationProp>();
    return (
        <>
            <TouchableOpacity onPress={() => navigation.navigate('AddNew')}>
                <Icon source="plus" color={white} size={sizeIconRegular} />
            </TouchableOpacity>
            <View style={{ width: 16 }} />
            <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                <Icon source="cog" color={white} size={sizeIconRegular} />
            </TouchableOpacity>
        </>
    )
}

export default HeaderRight