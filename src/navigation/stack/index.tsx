import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAtom } from 'jotai';
import { userAtom } from '@shared/jotai/atomSetting';
import { RootStackParamList } from '@shared/types/navigation';
import { light_gray, primary, white } from '@shared/utils/constant';
import AddNewScreen from '@modules/add-new/screens';
import DashboardScreen from '@modules/dashboard/screens';
import SettingScreen from '@modules/setting/screens';
import WelcomeScreen from '@modules/welcome/screens';
import HeaderRight from '@modules/dashboard/components/HeaderRight';
import DetailScreen from '@modules/detail/screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthenticatedStack = ({ user }: { user: string | null }) => (
    <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
            headerStyle: { backgroundColor: primary },
            headerTitleStyle: { color: white },
            headerTintColor: white,
            contentStyle: { backgroundColor: light_gray },
        }}
    >
        <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
                headerTitle: `Hai ${user}`,
                headerRight: () => <HeaderRight />,
            }}
        />
        <Stack.Screen
            name="AddNew"
            component={AddNewScreen}
            options={{ headerTitle: 'Bikin Rutinitas Baru' }}
        />
        <Stack.Screen name="Setting" component={SettingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
);

const UnauthenticatedStack = () => (
    <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
            headerStyle: { backgroundColor: primary },
            headerTitleStyle: { color: white },
            headerTintColor: white,
            contentStyle: { backgroundColor: light_gray },
        }}
    >
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
);

const StackNavigation = () => {
    const [user] = useAtom(userAtom);

    return ![null, undefined, ''].includes(user) ? (
        <AuthenticatedStack user={user} />
    ) : (
        <UnauthenticatedStack />
    );
};

export default StackNavigation;
