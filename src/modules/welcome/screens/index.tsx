import { ToastAndroid, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper'
import styles from './styles';
import { primary } from '@shared/utils/constant';
import { useState } from 'react';
import { userAtom } from '@shared/jotai/atomSetting';
import { useAtom } from 'jotai';

const WelcomeScreen = () => {
    const [name, setName] = useState<string>('')
    const [user, setUser] = useAtom(userAtom)

    function next() {
        if(name == '') return ToastAndroid.show('Isi nama kamu dulu!', ToastAndroid.SHORT)
        setUser(name)
    }

    return (
        <>
            <View style={styles.container}>
                <View>
                    <Text variant='headlineMedium' style={styles.textCenter}>Selamat Datang di</Text>
                    <Text variant='headlineLarge' style={{ ...styles.textCenter, color: primary }}>CatatRutinitas</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <TextInput
                        placeholder="Masukin nama kamu"
                        mode='outlined'
                        activeOutlineColor={primary}
                        left={<TextInput.Icon icon="account" />}
                        value={name}
                        onChangeText={value => setName(value)}
                        style={styles.inputText}
                    />
                </View>
            </View>
            <View style={styles.wrapBottom}>
                <Button
                    mode="contained"
                    buttonColor={primary}
                    onPress={next}
                >
                    Lanjut
                </Button>
            </View>
        </>
    )
}

export default WelcomeScreen