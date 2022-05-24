import React from 'react';
import { StyleSheet, View } from "react-native";
import { CustomButton } from "../index";
import { ReactComponentProps } from "../../constants/types";
import { PlusIcon } from "../../assets";

interface AddNewButtonProps extends ReactComponentProps {
    onPress: () => void;
}

export const AddNewButton = (props: AddNewButtonProps) => {
    return (<CustomButton style={styles.addButton} onPress={props.onPress} flex={1}>
        <View style={{height: 25, width: 25, marginLeft: 2, marginTop: 2.5, padding: 2}}>
            <PlusIcon />
        </View>
    </CustomButton>);
}

const styles = StyleSheet.create({
    addButton: {
        position: "absolute",
        right: 15,
        bottom: 15,
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: "center"
    },
});