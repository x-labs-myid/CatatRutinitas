import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@types/navigation';
import AddNewScreen from '@screens/add-new';
import DashboardScreen from '@screens/dashboard';
import SettingScreen from '@screens/setting';
import WelcomeScreen from '@screens/welcome';
import HeaderRight from '@components/dashboard/HeaderRight';
import { light_gray, primary, white } from '@utils/constant';
import { useAtom } from 'jotai';
import { userAtom } from '@store/persist';

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
