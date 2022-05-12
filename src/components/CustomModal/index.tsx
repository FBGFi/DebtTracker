import React from 'react';
import { Modal, StyleSheet, ScrollView, View, Text } from "react-native";
import { ReactComponentProps } from "../../constants/types";
import { CustomButton } from "../index";
import { Colors } from "../../styles/colors";

interface CustomModalProps extends ReactComponentProps {
    setModal: (modal: null) => void;
    title: string;
    outSideContent?: JSX.Element | JSX.Element[] | any;
}

export const CustomModal = (props: CustomModalProps) => {
    return (<Modal
        animationType="slide"
        onRequestClose={() => {
            props.setModal(null);
        }}>
        <View style={{ backgroundColor: Colors.dark, flex: 1 }}>
            <View style={{ backgroundColor: Colors.darkestBlue }}>
                <Text style={{
                    color: Colors.orange,
                    fontSize: 20,
                    textAlign: "center",
                    padding: 10,
                }}>{props.title}</Text>
            </View>
            <ScrollView contentContainerStyle={{ backgroundColor: Colors.dark }}>
                {props.children}
            </ScrollView>
            {props.outSideContent}
            <CustomButton title="Close" onPress={() => props.setModal(null)} />
        </View>
    </Modal>)
}

const styles = StyleSheet.create({

});