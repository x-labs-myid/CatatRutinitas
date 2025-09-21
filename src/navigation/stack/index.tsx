import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAtom } from 'jotai';
import { themeAtom, userAtom } from '@shared/atom/atomSetting';
import { RootStackParamList } from '@shared/types/navigation';
import { white } from '@shared/utils/constant';
import AddNewScreen from '@modules/add-new/screens';
import DashboardScreen from '@modules/dashboard/screens';
import SettingScreen from '@modules/setting/screens';
import WelcomeScreen from '@modules/welcome/screens';
import HeaderRightDashboard from '@modules/dashboard/components/HeaderRight';
import DetailScreen from '@modules/detail/screens';
import HeaderRightAddNew from '@modules/add-new/components/HeaderRight';
import useGlobal from '@shared/hooks';
import { useEffect, useState } from 'react';
import SplashScreen from '@shared/components/SplashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthenticatedStack = ({ user, theme }: { user: string | null, theme: string }) => {
    const { translateGlobal } = useGlobal()
    return (
        <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                headerStyle: { backgroundColor: theme },
                headerTitleStyle: { color: white },
                headerTintColor: white,
                contentStyle: { backgroundColor: white },
            }}
        >
            <Stack.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    headerTitle: `${translateGlobal(`Hai`)} ${user}`,
                    headerRight: () => <HeaderRightDashboard />,
                }}
            />
            <Stack.Screen
                name="AddNew"
                component={AddNewScreen}
                options={{
                    headerTitle: translateGlobal('Bikin Rutinitas Baru'),
                    headerRight: () => <HeaderRightAddNew />
                }}
            />
            <Stack.Screen name="Setting" component={SettingScreen} options={{ headerTitle: translateGlobal('Pengaturan') }} />
            <Stack.Screen name="Detail" component={DetailScreen} options={{ headerTitle: translateGlobal('Detail') }} />
        </Stack.Navigator>
    )
}

const UnauthenticatedStack = ({ theme }: { theme: string }) => (
    <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
            headerStyle: { backgroundColor: theme },
            headerTitleStyle: { color: white },
            headerTintColor: white,
            contentStyle: { backgroundColor: white },
        }}
    >
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
);

const StackNavigation = () => {
    const [user] = useAtom(userAtom);
    const [theme] = useAtom(themeAtom);
    const [splash, setSplash] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => {
            setSplash(false)
        }, 700);
    }, [])

    if (splash) {
        return <SplashScreen />
    } else {
        if (![null, undefined, ''].includes(user)) return <AuthenticatedStack user={user} theme={theme!} />
        else return <UnauthenticatedStack theme={theme!} />
    }
};

export default StackNavigation;
