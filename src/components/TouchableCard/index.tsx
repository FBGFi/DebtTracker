import React, { useMemo } from 'react';
import { TouchableOpacity, View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { ReactComponentProps } from "../../constants/types";

interface TouchableCardProps extends ReactComponentProps {
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    disabled?: boolean;
}

export const TouchableCard = (props: TouchableCardProps) => {
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
                {props.children}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper: {

    },
    wrapperDisabled: {

    }
})