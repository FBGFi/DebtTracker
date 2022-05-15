import React, { useMemo } from 'react';
import { TouchableOpacity, View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { commonConstants } from "../../constants/common";
import { ReactComponentProps } from "../../constants/types";
import { Colors } from "../../styles/colors";

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
        <TouchableOpacity activeOpacity={props.disabled ? 1 : 0.6} onPress={props.onPress}>
            <View style={memoizedStyles}>
                {props.children}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: Colors.darkestBlue,
        borderWidth: 3,
        borderColor: Colors.orange,
        borderRadius: 10,
        padding: 15,
        flexDirection: "row",
        margin: commonConstants.gapAmount,
        justifyContent: "space-between",
    },
    wrapperDisabled: {
        backgroundColor: Colors.darkestBlue,
        borderWidth: 3,
        borderColor: Colors.orange,
        borderRadius: 10,
        padding: 15,
        flexDirection: "row",
        margin: commonConstants.gapAmount,
        justifyContent: "space-between",
    }
})