import { View } from 'react-native';
import { List, Text } from 'react-native-paper'
import ActionSheetStatic from '@components/ActionSheetStatic'
import styles from './styles';
import { primary } from '@utils/constant';
import ButtonCustom from '@components/ButtonCustom';
import ModalInputName from '@components/welcome/ModalInputName';
import { useState } from 'react';

const WelcomeScreen = () => {
    const [visible, setVisible] = useState<boolean>(false)

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
                    <ButtonCustom
                        title="Lanjut"
                        onPress={() => setVisible(true)}
                    />
                </View>
            </ActionSheetStatic>
            <ModalInputName visible={visible} hideModal={() => setVisible(false)} />
        </>
    )
}

export default WelcomeScreen