import { StyleProp, TextStyle } from 'react-native';
import type { PropsWithChildren } from 'react';
//import useThemeContext from '../hooks/useThemeContext';
import { Text } from 'react-native-paper';

type themedText = PropsWithChildren<{
    style?: StyleProp<TextStyle>
}>;
export const ThemedText = ({ style, children }: themedText) => {
    //const { theme } = useThemeContext();

    //const styles = style ? [{ color: theme.colors.text }, style] : { color: theme.colors.text };
    
    return (
        <Text style={style}>{children}</Text>
    )
}