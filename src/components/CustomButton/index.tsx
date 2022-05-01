import React from 'react';
import { TouchableOpacity, Text, View, ViewStyle, StyleProp } from 'react-native';
import { ReactComponentProps } from '../../constants/types';

interface CustomButtonProps extends ReactComponentProps {
    title: string;
    style?: StyleProp<ViewStyle>;
}

export const CustomButton = (props: CustomButtonProps) => {
    return (
        <TouchableOpacity>
            <View style={props.style}>
                <Text>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
}