import React from 'react';
import { Modal, StyleSheet, ScrollView } from "react-native";
import { ReactComponentProps } from "../../constants/types";
import { CustomButton } from "../index";
import { Colors } from "../../styles/colors";

interface CustomModalProps extends ReactComponentProps {
    setModal: (modal: null) => void;
}

export const CustomModal = (props: CustomModalProps) => {
    return (<Modal
        animationType="slide"
        onRequestClose={() => {
            props.setModal(null);
        }}>
        <ScrollView contentContainerStyle={{ backgroundColor: Colors.dark, flex: 1 }}>
            {props.children}
        </ScrollView>
        <CustomButton title="Close" onPress={() => props.setModal(null)} />
    </Modal>)
}

const styles = StyleSheet.create({

});