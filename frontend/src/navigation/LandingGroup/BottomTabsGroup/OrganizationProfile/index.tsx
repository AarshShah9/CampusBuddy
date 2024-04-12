import Header from "~/components/OrganizationProfileHeader";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrganizationEvents from "~/screens/OrganizationEvents";
import { useRoute } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function OrganizationProfile() {
  const {
    params: { id },
  } = useRoute<any>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrganizationTabs"
        component={OrganizationEvents}
        initialParams={{ self: false, id }}
        options={{
          title: "Profile",
          header: Header,
        }}
      />
    </Stack.Navigator>
  );
}
