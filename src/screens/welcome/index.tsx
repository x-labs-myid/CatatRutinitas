import { Alert, TouchableOpacity, View } from 'react-native';
import { List, Text, TextInput } from 'react-native-paper'
import ActionSheetStatic from '@components/ActionSheetStatic'
import styles from './styles';
import { primary, white } from '@utils/constant';
import ButtonCustom from '@components/ButtonCustom';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { WelcomeScreenNavigationProp } from '@types/navigation';
import { useAtom } from 'jotai';
import { userAtom } from '@store/persist';

const WelcomeScreen = () => {
    const navigation = useNavigation<WelcomeScreenNavigationProp>()
    const [user, setUser] = useAtom(userAtom)
    return (
        <>
            <View style={styles.container}>
                <Text variant='headlineMedium' style={styles.textCenter}>Welcome to</Text>
                <Text variant='headlineLarge' style={{...styles.textCenter, color: primary}}>CatatRutinitas</Text>
            </View>
            <ActionSheetStatic>
                <List.Item
                    title="Rutinitas Baru"
                    description="Buat rutinitas baru kamu di sini."
                    titleStyle={styles.textTitle}
                    descriptionStyle={styles.textDesc}
                    left={props => <List.Icon {...props} icon="fire" />}
                />
                <List.Item
                    title="Cek rutinitas"
                    description="Cek rutinitas kamu yang sudah berhasil diselesain."
                    titleStyle={styles.textTitle}
                    descriptionStyle={styles.textDesc}
                    left={props => <List.Icon {...props} icon="check" />}
                />
                <List.Item
                    title="Cari riwayat rutinitas"
                    description="Nyari riwayat rutinitas kamu yang berhasil diselesain."
                    titleStyle={styles.textTitle}
                    descriptionStyle={styles.textDesc}
                    left={props => <List.Icon {...props} icon="folder" />}
                />
                <List.Item
                    title="Bagikan rutinitas"
                    description="Bagikan rutinitas kamu ke sosial media dan pamerin."
                    titleStyle={styles.textTitle}
                    descriptionStyle={styles.textDesc}
                    left={props => <List.Icon {...props} icon="share" />}
                />
                <List.Item
                    title="Ganti bahasa"
                    description="Kamu bisa ganti bahasa sesuai selera kamu."
                    titleStyle={styles.textTitle}
                    descriptionStyle={styles.textDesc}
                    left={props => <List.Icon {...props} icon="flag" />}
                />
                <View style={styles.wrapBottom}>
                    <TextInput
                        placeholder="Masukin nama kamu"
                        mode='outlined'
                        activeOutlineColor={primary}
                        left={<TextInput.Icon icon="account" />}
                        value={user || ''}
                        onChangeText={value => setUser(value)}
                        style={styles.inputText}
                    />
                    <ButtonCustom
                        title="Lanjut"
                        onPress={() => {
                            if(user == null) return Alert.alert('Error', 'Nama ga boleh kosong!')
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [
                                        { name: 'Dashboard' }
                                    ]
                                })
                            )
                        }}
                    />
                </View>
            </ActionSheetStatic>
        </>
    )
}

export default WelcomeScreen