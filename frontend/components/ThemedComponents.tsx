import { StyleProp, Text, TextStyle } from 'react-native';
import type { PropsWithChildren } from 'react';
import useThemeContext from '../hooks/useThemeContext';

type themedText = PropsWithChildren<{
    style?: StyleProp<TextStyle>
}>;
export const ThemedText = ({ style, children }: themedText) => {
    const { theme } = useThemeContext();

    const styles = style ? [{ color: theme.colors.text }, style] : { color: theme.colors.text };
    
    return (
        <Text style={styles}>{children}</Text>
    )
}