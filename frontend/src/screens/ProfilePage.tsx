import ProfileTabs from "~/navigation/LandingGroup/BottomTabsGroup/ProfileGroup/ProfileTabs";
import Header from "~/navigation/LandingGroup/BottomTabsGroup/ProfileGroup/Header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileContextProvider } from "~/contexts/profileContext";

const Stack = createNativeStackNavigator();

export default function ProfilePage() {
  return (
    <>
      {/*<Stack.Navigator screenOptions={{ header: Header }}>*/}
      {/*  <Stack.Screen*/}
      {/*    name="ProfileTabs"*/}
      {/*    component={ProfileTabs}*/}
      {/*    options={{ title: "Profile" }}*/}
      {/*  />*/}
      {/*</Stack.Navigator>*/}
    </>
  );
}
