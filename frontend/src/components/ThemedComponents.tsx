import {StyleProp, TextStyle} from 'react-native';
import type {PropsWithChildren} from 'react';
import {Text} from 'react-native-paper';

type themedText = PropsWithChildren<{
    style?: StyleProp<TextStyle>
}>;
export const ThemedText = ({ style, children }: themedText) => {
    return (
        <Text style={style}>{children}</Text>
    )
}