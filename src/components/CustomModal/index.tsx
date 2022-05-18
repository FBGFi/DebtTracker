import React from 'react';
import { Modal, StyleSheet, ScrollView, View, Text, TouchableWithoutFeedback, GestureResponderEvent } from "react-native";
import { ReactComponentProps } from "../../constants/types";
import { CustomButton } from "../index";
import { Colors } from "../../styles/colors";

interface CustomModalProps extends ReactComponentProps {
    setModal: (modal: null) => void;
    title: string;
    outSideContent?: JSX.Element | JSX.Element[] | any;
    onModalPress?: (event: GestureResponderEvent) => void;
    headerButtons?: JSX.Element | JSX.Element[] | any;
}

export const CustomModal = (props: CustomModalProps) => {
    return (<Modal
        animationType="slide"
        onRequestClose={() => {
            props.setModal(null);
        }}>
        <TouchableWithoutFeedback onPress={props.onModalPress} touchSoundDisabled={true}>
            <View style={{ backgroundColor: Colors.dark, flex: 1 }}>
                <View style={{ backgroundColor: Colors.darkestBlue}}>
                    <Text style={{
                        color: Colors.orange,
                        fontSize: 20,
                        textAlign: "center",
                        padding: 10,
                    }}>{props.title}</Text>
                    <View style={{ position: "absolute", right: 10, top: 10 }}>
                        <CustomButton style={styles.closeButton} onPress={() => props.setModal(null)}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </CustomButton>
                    </View>
                    {props.headerButtons ? <View>{props.headerButtons}</View> : null}
                </View>
                <View style={{elevation: -1, flex: 1}}>
                    <ScrollView contentContainerStyle={{ backgroundColor: Colors.dark }}>
                        {props.children}
                    </ScrollView>
                </View>
                {props.outSideContent}
            </View>
        </TouchableWithoutFeedback>
    </Modal>)
}

const styles = StyleSheet.create({
    closeButton: {
        width: 30,
        height: 30,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeButtonText: {
        fontSize: 20,
        width: 30,
        height: 30,
        position: "absolute",
        top: -1.5,
        left: 5.5,
        zIndex: 10,
        color: Colors.lightText,
    }
});