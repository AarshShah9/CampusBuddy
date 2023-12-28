import { Text, TextProps, TextInput, TextInputProps, StyleProp, TextStyle } from 'react-native';
import useThemeContext from '~/hooks/useThemeContext';

export const ThemedText = ({ style, ...props }: TextProps) => {
    const { theme } = useThemeContext();

    const stylesList: StyleProp<TextStyle> = [{ color: theme.colors.text }, style];

    return (
        <Text 
            {...props} 
            style={stylesList}
        />
    )
}

export const ThemedTextInput = ({ style, ...props }: TextInputProps) => {
    const { theme } = useThemeContext();
    
    const stylesList: StyleProp<TextStyle> = [{ color: theme.colors.text }, style];

    return (
        <TextInput
            {...props} 
            style={stylesList}
        />
    )
}