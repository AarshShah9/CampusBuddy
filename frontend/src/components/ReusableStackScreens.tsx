import ProfilePage from "~/screens/ProfilePage";
import EventDetails from "~/screens/EventDetails";
import LookingForDetails from "~/screens/LookingForDetails";
import LookingForCommentsScreen from "~/screens/LookingForCommentsScreen";
import MarketPlaceDetail from "~/screens/MarketPlaceDetail";
import Attendees from "~/screens/Attendees";
import MapDetails from "~/screens/MapDetails";
import CreateEvent from "~/screens/CreateEvent";
import QRCodeScanner from "~/screens/QRCodeEventScanner";
import EventPricing from "~/screens/EventPricing";
import EventPayment from "~/screens/EventPayment";
import OrganizationProfile from "~/navigation/LandingGroup/BottomTabsGroup/OrganizationProfile";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import useThemeContext from "~/hooks/useThemeContext";
import { CurrentMainTab } from "~/types/Navigation";
import { memo } from "react";
import { TouchableOpacity, Text } from "react-native";
import { Feather } from '@expo/vector-icons';
import useNavigationContext from "~/hooks/useNavigationContext";

const MapDetailsLeftHeader = () => {
    const { navigateBack } = useNavigationContext();
    
    return (
        <TouchableOpacity onPress={navigateBack} 
            style={{ 
                marginLeft: -15,
                flexDirection: "row",
                alignItems: "center"
            }}
        >
          <Feather name="chevron-left" size={32} color="white" />
          <Text style={{ color: "white", fontSize: 17 }}>Back</Text>
        </TouchableOpacity>
    )
}

const Stack = createNativeStackNavigator();

type Props = {
    name: CurrentMainTab,
    component: () => JSX.Element | null,
    options?: NativeStackNavigationOptions
}

function ReusableStackScreens({ name, component, options }: Props) {
    const { theme } = useThemeContext();
    return (
        <Stack.Navigator>
            <Stack.Screen name={name} component={component} options={options}/>
            {/*  TODO ALL OF THESE SCREENS STACKING IS BOGGING DOWN THE APP */}
            <Stack.Screen
                name={`UserProfile-${name}`}
                component={ProfilePage}
                options={{
                    title: "",
                    headerShown: true,
                    headerBackTitle: "Back",
                    headerTintColor: theme.colors.onSecondary,
                    headerStyle: { backgroundColor: theme.colors.primary },
                }}
            />
            <Stack.Screen
                name={`EventDetails-${name}`}
                component={EventDetails}
                options={{
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTitle: "",
                    headerShown: true,
                    headerBackTitle: "Back",
                    headerTintColor: theme.colors.onSecondary,
                }}
            />
            <Stack.Screen
                name={`LookingForDetails-${name}`}
                component={LookingForDetails}
                options={{
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTitle: "",
                    headerShown: true,
                    headerBackTitle: "Back",
                    headerTintColor: theme.colors.onSecondary,
                }}
            />
            <Stack.Screen
                name={`LookingForCommentsScreen-${name}`}
                component={LookingForCommentsScreen}
                options={{
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTitle: "",
                    headerShown: true,
                    headerBackTitle: "Back",
                    headerTintColor: theme.colors.onSecondary,
                }}
            />
            <Stack.Screen
                name={`MarketPlaceDetail-${name}`}
                component={MarketPlaceDetail}
                options={{
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTitle: "",
                    headerShown: true,
                    headerBackTitle: "Back",
                    headerTintColor: theme.colors.onSecondary,
                }}
            />
            <Stack.Screen
                name={`Attendees-${name}`}
                component={Attendees}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={`MapDetails-${name}`}
                component={MapDetails}
                options={{
                    headerTitle: "",
                    headerLeft: MapDetailsLeftHeader,
                    presentation: "modal",
                    headerStyle: { backgroundColor: theme.colors.primary },
                }}
            />
            <Stack.Screen
                name={`OrganizationProfile-${name}`}
                component={OrganizationProfile}
                options={{
                    title: "",
                    headerShown: true,
                    headerBackTitle: "Back",
                    headerTintColor: theme.colors.onSecondary,
                    headerStyle: { backgroundColor: theme.colors.primary },
                }}
            />
            <Stack.Screen
                name={`EditEvent-${name}`}
                component={CreateEvent}
                options={{
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTitle: "",
                    headerShown: true,
                    headerBackTitle: "Back",
                    headerTintColor: theme.colors.onSecondary,
                }}
            />
            <Stack.Screen
                name={`QRCodeScanner-${name}`}
                component={QRCodeScanner}
                options={{
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTitle: "",
                    headerShown: true,
                    headerBackTitle: "Back",
                    headerTintColor: theme.colors.onSecondary,
                }}
            />
            <Stack.Screen
                name={`EventPricing-${name}`}
                component={EventPricing}
                options={{
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTitle: "",
                    headerShown: true,
                    headerBackTitle: "Back",
                    headerTintColor: theme.colors.onSecondary,
                }}
            />
            <Stack.Screen
                name={`EventPayment-${name}`}
                component={EventPayment}
                options={{
                    headerTitleStyle: {
                        color: theme.colors.onSecondary,
                    },
                    presentation: "modal",
                    headerStyle: { backgroundColor: theme.colors.primary },
                }}
            />
        </Stack.Navigator>
    )
}

export default memo(ReusableStackScreens)