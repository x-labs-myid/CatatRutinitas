import { useEffect, useRef, useState } from "react"
import { bannerIdAds, dark, interstitialIdAds, white } from "@shared/utils/constant"
import { Platform, ScrollView, View, Text, Linking, ToastAndroid } from "react-native"
import { Button, Card, List, TextInput, Switch } from "react-native-paper"
import styles from "./styles"
import { useAtom } from "jotai"
import { descRoutineAtom, languageAtom, themeAtom, userAtom } from "@shared/atom/atomSetting"
import ScrollKeyboard from "@shared/components/ScrollKeyboard"
import BottomSheetLanguage from "../components/BottomSheetLanguage"
import { SheetManager } from "react-native-actions-sheet"
import BottomSheetTheme from "../components/BottomSheetTheme"
import useGlobal from "@shared/hooks"
import BottomSheetInfo from "../components/BottomSheetInfo"
import { AdEventType, BannerAd, BannerAdSize, InterstitialAd, TestIds, useForeground } from "react-native-google-mobile-ads"

const SettingScreen = () => {
    const [name, setName] = useState<string>('')
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useAtom(userAtom)
    const [language, setLanguage] = useAtom(languageAtom)
    const { translateGlobal } = useGlobal()
    const [descRoutine, setDescRoutine] = useAtom(descRoutineAtom)
    const [theme] = useAtom(themeAtom)

    const interstitialAdRef = useRef(
        InterstitialAd.createForAdRequest(__DEV__ ? TestIds.INTERSTITIAL : interstitialIdAds)
    );
    const interstitialAd = interstitialAdRef.current;
    const bannerId = __DEV__ ? TestIds.BANNER : bannerIdAds
    const bannerRef = useRef<BannerAd>(null)

    const updateName = () => {
        setUser(name)
        setName('')
        ToastAndroid.show(`${translateGlobal('Nama berhasil diubah')}`, ToastAndroid.SHORT)
    }

    useForeground(() => {
        Platform.OS === 'ios' && bannerRef.current?.load()
    })

    useEffect(() => {
        const unsubscribeLoaded = interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
            console.log("✅ Interstitial ad loaded");
            setLoaded(true);
        });

        const unsubscribeFailed = interstitialAd.addAdEventListener(AdEventType.ERROR, (error) => {
            console.log("❌ Failed to load interstitial ad:", error);
            setLoaded(false);
        });

        const unsubscribeClosed = interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
            console.log("🧹 Ad closed, reload new ad...");
            interstitialAd.load();
        });

        // load pertama kali
        interstitialAd.load();

        return () => {
            unsubscribeLoaded();
            unsubscribeFailed();
            unsubscribeClosed();
        };
    }, []);

    const showAd = () => {
        if (loaded) {
            interstitialAd.show();
            setLoaded(false);
        } else {
            console.log("⚠️ Iklan belum siap, coba memuat ulang...");
            interstitialAd.load();
        }
    };

    return (
        <>
            <ScrollKeyboard>
                <ScrollView contentContainerStyle={styles.container}>
                    <Card style={{ ...styles.cardName, backgroundColor: theme! }}>
                        <Card.Content>
                            <View style={styles.wrap}>
                                <Text style={styles.text}>{user?.toLocaleUpperCase()}</Text>
                                <Button
                                    mode="outlined"
                                    theme={{ colors: { outline: white } }}
                                    textColor={white}
                                    onPress={updateName}
                                    disabled={name === user || name === ''}
                                >{translateGlobal('Ubah')}</Button>
                            </View>
                            <TextInput
                                placeholder={translateGlobal('Ubah nama kamu di sini')}
                                mode='outlined'
                                activeOutlineColor={theme!}
                                left={<TextInput.Icon icon="account" />}
                                value={name}
                                onChangeText={value => setName(value)}
                                style={styles.inputText}
                            />
                        </Card.Content>
                    </Card>
                    <Card style={styles.cardSetting}>
                        <Card.Title title={translateGlobal('Umum')} />
                        <Card.Content>
                            <List.Item
                                title={translateGlobal('Tema')}
                                titleStyle={styles.textList}
                                onPress={() => SheetManager.show('theme', { context: 'global' })}
                                left={() => <List.Icon color={dark} icon="palette" />}
                                right={() => <View style={{ backgroundColor: theme!, width: 20, height: 20, borderRadius: 100 }}></View>}
                            />
                            <List.Item
                                title={translateGlobal('Bahasa')}
                                titleStyle={styles.textList}
                                onPress={() => SheetManager.show('language', { context: 'global' })}
                                left={() => <List.Icon color={dark} icon="flag" />}
                                right={() => <Text style={styles.textList}>{language ? language : 'Indonesia'}</Text>}
                            />
                            <List.Item
                                title={translateGlobal('Tampilin Deskripsi')}
                                titleStyle={styles.textList}
                                left={() => <List.Icon color={dark} icon="book" />}
                                right={() => <Switch color={theme!} value={descRoutine} onValueChange={() => setDescRoutine(!descRoutine)} />}
                            />
                            <List.Item
                                title={translateGlobal('Website')}
                                titleStyle={styles.textList}
                                left={() => <List.Icon color={dark} icon="web" />}
                                onPress={() => Linking.openURL('https://x-labs.my.id')}
                            />
                            <List.Item
                                title={translateGlobal('Info')}
                                titleStyle={styles.textList}
                                onPress={() => SheetManager.show('info', { context: 'global' })}
                                left={() => <List.Icon color={dark} icon="information-outline" />}
                            />
                            <List.Item
                                title={translateGlobal('Kasih Nilai')}
                                titleStyle={styles.textList}
                                left={() => <List.Icon color={dark} icon="star" />}
                                onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=my.id.diamsyah.apps.catatrutinitas')}
                            />
                            <List.Item
                                title={translateGlobal('Support Iklan')}
                                titleStyle={styles.textList}
                                left={() => <List.Icon color={dark} icon="heart" />}
                                onPress={() => showAd()}
                            />
                        </Card.Content>
                    </Card>
                </ScrollView>
            </ScrollKeyboard>
            <BottomSheetLanguage id="language" />
            <BottomSheetTheme id="theme" />
            <BottomSheetInfo id="info" />
            <BannerAd ref={bannerRef} unitId={bannerId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
        </>
    )
}

export default SettingScreen