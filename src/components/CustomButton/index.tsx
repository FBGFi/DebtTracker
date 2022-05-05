import React, { useMemo } from 'react';
import { TouchableOpacity, Text, View, ViewStyle, StyleProp, StyleSheet, GestureResponderEvent } from 'react-native';
import { ReactComponentProps } from '../../constants/types';

interface CustomButtonProps extends ReactComponentProps {
    title?: string;
    style?: StyleProp<ViewStyle>;
    disabled?: boolean;
    onPress?: (event: GestureResponderEvent) => void;
}

export const CustomButton = (props: CustomButtonProps) => {
    const combineStyles = (): any => {
        if (props.disabled) {
            return [styles.wrapperDisabled, props.style];
        } else {
            return [styles.wrapper, props.style];
        }
    }

    const memoizedStyles = useMemo(combineStyles, [props.style, props.disabled]);
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            <View style={memoizedStyles}>
                {props.title ? <Text style={{
                    fontSize: 20,
                    fontFamily: "Quicksand-SemiBold",
                }}>{props.title}</Text> : props.children}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        backgroundColor: "turquoise",
        alignItems: "center",
        justifyContent: "center"
    },
    wrapperDisabled: {

    },
})