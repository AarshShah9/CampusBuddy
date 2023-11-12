import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useThemeContext from '~/hooks/useThemeContext';
import Carpool from '~/screens/Carpool';
import DrawerIcon from '../DrawerIcon';
import UserIcon from '../UserIcon';
import React from "react";

const Stack = createNativeStackNavigator();

export default function CarpoolScreenStack() {
    const { theme } = useThemeContext();
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: theme.colors.onSurfaceVariant,
                headerStyle: {
                    backgroundColor: theme.colors.surfaceVariant
                }
            }}
        >
            <Stack.Screen 
                name="CarpoolScreen" component={Carpool} 
                options={({ navigation }) => ({ 
                    title: 'Carpool',
                    headerLeft: () => <DrawerIcon {...{ navigation }} />,
                    headerRight: () => <UserIcon />,
                })}
            />
        </Stack.Navigator>
    )
}