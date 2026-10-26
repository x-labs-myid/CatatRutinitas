import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-paper";
import { white, sizeIconRegular, interstitialIdAds } from "@shared/utils/constant";
import { useNavigation } from "@react-navigation/native";
import { DashboardScreenNavigationProp } from "@shared/types/navigation";
import { AdEventType, InterstitialAd, TestIds } from "react-native-google-mobile-ads";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { themeAtom } from "@shared/atom/atomSetting";
import useGlobal from "@shared/hooks";

const HeaderRightDashboard = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const [theme] = useAtom(themeAtom);
  const { translateGlobal } = useGlobal();
  const [loaded, setLoaded] = useState(false);

  const interstitialAdRef = useRef(
    InterstitialAd.createForAdRequest(__DEV__ ? TestIds.INTERSTITIAL : interstitialIdAds)
  );
  const interstitialAd = interstitialAdRef.current;

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
    <View style={styles.container}>
      <TouchableOpacity
        onPress={showAd}
        style={[styles.btnSupport, { backgroundColor: theme! }]}
      >
        <Icon source="coffee" color={white} size={sizeIconRegular - 4} />
        <Text style={styles.text}>{translateGlobal("Buat Ngopi")}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("AddNew")}>
        <Icon source="plus" color={white} size={sizeIconRegular} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
        <Icon source="cog" color={white} size={sizeIconRegular} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  btnSupport: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    padding: 5,
    borderRadius: 5,
    // opacity: 0.6,
    borderColor: white,
    borderWidth: 1,
  },
  text: { color: white, fontSize: 10 },
});

export default HeaderRightDashboard;
