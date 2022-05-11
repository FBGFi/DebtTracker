import React from 'react';
import { StyleSheet, Text } from "react-native";
import { CustomButton } from "../index";
import { ReactComponentProps } from "../../constants/types";
import { Colors } from "../../styles/colors";

interface AddNewButtonProps extends ReactComponentProps {
    onPress: () => void;
}

export const AddNewButton = (props: AddNewButtonProps) => {
    return (<CustomButton style={styles.addButton} onPress={props.onPress}><Text style={styles.addButtonText}>+</Text></CustomButton>);
}

const styles = StyleSheet.create({
    addButton: {
        position: "absolute",
        right: 15,
        bottom: 15,
        width: 50,
        height: 50,
        borderRadius: 50
    },
    addButtonText: {
        marginTop: -12,
        fontSize: 30,
        fontFamily: "Quicksand-SemiBold",
        color: Colors.lightText,
    }
});