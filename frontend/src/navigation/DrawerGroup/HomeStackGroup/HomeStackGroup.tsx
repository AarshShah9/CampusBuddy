import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabsGroup from './BottomTabsGroup/BottomTabsGroup';
import EventDetails from '~/screens/EventDetails';
import useThemeContext from '~/hooks/useThemeContext';

const Stack = createNativeStackNavigator();

export default function HomeStackGroup() {
    const { theme } = useThemeContext();
    
    return (
        <Stack.Navigator>
            <Stack.Screen  
                name="BottomTabGroup" 
                component={BottomTabsGroup}
                options={{ headerShown: false }}
            />
            <Stack.Screen  
                name="EventDetails" 
                component={EventDetails}
                options={{ presentation: 'modal', headerStyle:  { backgroundColor: theme.colors.surfaceVariant } }}
            />
        </Stack.Navigator>
    )
}