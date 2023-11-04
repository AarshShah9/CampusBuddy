import { StyleProp, Text, TextStyle } from 'react-native';
import type { PropsWithChildren } from 'react';
import useAppContext from '../hooks/useAppContext';

type themedText = PropsWithChildren<{
    style?: StyleProp<TextStyle>
  }>;
export const ThemedText = ({ style, children }: themedText) => {
    const { inDarkMode } = useAppContext();

    const styles = style ? [{ color: inDarkMode ? 'white' : 'black' }, style] : { color: inDarkMode ? 'white' : 'black' };
    
    return (
        <Text style={styles}>{children}</Text>
    )
}