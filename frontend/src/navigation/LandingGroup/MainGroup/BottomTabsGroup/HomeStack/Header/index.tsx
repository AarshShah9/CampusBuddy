import { View, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useThemeContext from '~/hooks/useThemeContext';
import RightHeaderItem from './RightHeaderItem';

export default function Header() {
    const { theme } = useThemeContext();
    const insets = useSafeAreaInsets();

    return (
        <View 
            style={[
                styles.container, 
                { 
                    backgroundColor: theme.colors.primary, 
                    paddingTop: insets.top + 18,
                    paddingBottom: 18
                }
            ]}
        >
            <Text style={[styles.homeHeading, { color: theme.colors.onPrimary }]}>Campus Buddy</Text>
            <RightHeaderItem />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 34,
        paddingHorizontal: 20,
        paddingBottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    homeHeading: {
        fontSize: 21,
        fontWeight: 'bold'
    }
})