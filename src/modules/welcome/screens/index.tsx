import { ToastAndroid, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper'
import styles from './styles';
import { useState } from 'react';
import { userAtom } from '@shared/atom/atomSetting';
import { useAtom } from 'jotai';
import { themeAtom } from '@shared/atom/atomSetting';
import useGlobal from '@shared/hooks';

const WelcomeScreen = () => {
    const [name, setName] = useState<string>('')
    const [user, setUser] = useAtom(userAtom)
    const [theme] = useAtom(themeAtom)
    const { translateGlobal } = useGlobal()

    function next() {
        const trimmed = name.trim()
        if(trimmed == '') return ToastAndroid.show(`${translateGlobal('Isi nama kamu dulu')}`, ToastAndroid.SHORT)
        setUser(trimmed)
    }

    return (
        <>
            <View style={styles.container}>
                <View>
                    <Text variant='headlineMedium' style={styles.textCenter}>{translateGlobal('Selamat Datang di')}</Text>
                    <Text variant='headlineLarge' style={{ ...styles.textCenter, color: theme! }}>CatatRutinitas</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <TextInput
                        placeholder={translateGlobal('Masukin nama kamu')}
                        mode='outlined'
                        activeOutlineColor={theme!}
                        left={<TextInput.Icon icon="account" />}
                        value={name}
                        onChangeText={value => setName(value)}
                        style={styles.inputText}
                        onSubmitEditing={next}
                        returnKeyType="done"
                    />
                </View>
            </View>
            <View style={styles.wrapBottom}>
                <Button
                    mode="contained"
                    buttonColor={theme!}
                    onPress={next}
                >
                    {translateGlobal('Lanjut')}
                </Button>
            </View>
        </>
    )
}

export default WelcomeScreen
