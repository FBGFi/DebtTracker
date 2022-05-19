import React, { useMemo } from 'react';
import { TouchableOpacity, Text, View, ViewStyle, StyleProp, StyleSheet, GestureResponderEvent } from 'react-native';
import { ReactComponentProps } from '../../constants/types';
import { Colors } from "../../styles/colors";

interface CustomButtonProps extends ReactComponentProps {
    title?: string;
    style?: StyleProp<ViewStyle>;
    disabled?: boolean;
    onPress?: (event: GestureResponderEvent) => void;
    flex?: number;
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
        <TouchableOpacity delayPressIn={50} activeOpacity={0.6} onPress={props.onPress} style={{ flex: props.flex }}>
            <View style={memoizedStyles}>
                {props.title ? <Text style={{
                    fontSize: 20,
                    fontFamily: "Quicksand-SemiBold",
                    color: Colors.lightText,
                }}>{props.title}</Text> : props.children}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        backgroundColor: Colors.darkestBlue,
        borderWidth: 3,
        borderColor: Colors.orange,
        alignItems: "center",
        justifyContent: "center"
    },
    wrapperDisabled: {

    },
})