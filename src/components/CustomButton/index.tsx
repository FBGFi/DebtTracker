import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ReactComponentProps } from '../../constants/types';

interface CustomButtonProps extends ReactComponentProps {

}

export const CustomButton = (props: CustomButtonProps) => {
    return (
        <TouchableOpacity>{props.children}</TouchableOpacity>
    );
}