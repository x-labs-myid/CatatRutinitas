import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Dashboard: undefined;
    Welcome: undefined;
    Setting: undefined;
    AddNew: undefined;
    Detail: undefined;
}

export type DashboardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>
export type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>
export type SettingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Setting'>
export type AddNewScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddNew'>
export type DetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Detail'>