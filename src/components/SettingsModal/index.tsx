import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import { CustomModal, CustomInput } from "../index";
import { ReactComponentProps } from "../../constants/types";
import { Colors } from "../../styles/colors";
import { SettingsContext, useSaveUserName, useSaveMobilePay, useSaveBankAccount } from "../../context";


interface SettingsModalProps extends ReactComponentProps {
    setModal: (modal: null) => void;
}

export const SettingsModal = (props: SettingsModalProps) => {
    const { state } = useContext(SettingsContext);
    const [username, setUserName] = useState(state.username);
    const [bankAccount, setBankAccount] = useState(state.bankAccount);
    const [mobilePay, setMobilePay] = useState(state.mobilePay);
    const [saveUserName] = useSaveUserName();
    const [saveBankAccount] = useSaveBankAccount();
    const [saveMobilePay] = useSaveMobilePay();



    return (<CustomModal setModal={props.setModal} title="Settings">
        <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Username:</Text>
            <CustomInput
                style={styles.inputText}
                multiline={false}
                wrapperStyle={styles.inputWrapper}
                defaultValue={username}
                onChange={(e: NativeSyntheticEvent<TextInputFocusEventData>) => setUserName(e.nativeEvent.text)}
                onBlur={() => {
                    if (username) saveUserName(username);
                }} />
        </View>
        <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Bank account:</Text>
            <CustomInput
                style={styles.inputText}
                multiline={false}
                defaultValue={bankAccount}
                onChange={(e: NativeSyntheticEvent<TextInputFocusEventData>) => setBankAccount(e.nativeEvent.text)}
                onBlur={() => {
                    if (bankAccount) saveBankAccount(bankAccount);
                }}
                wrapperStyle={styles.inputWrapper} />
        </View>
        <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Mobile pay:</Text>
            <CustomInput
                style={styles.inputText}
                multiline={false}
                defaultValue={mobilePay}
                onChange={(e: NativeSyntheticEvent<TextInputFocusEventData>) => setMobilePay(e.nativeEvent.text)}
                onBlur={() => {
                    if (mobilePay) saveMobilePay(mobilePay);
                }}
                wrapperStyle={styles.inputWrapper} />
        </View>
    </CustomModal>)
};

const styles = StyleSheet.create({
    inputContainer: {
        padding: 10,
    },
    labelText: {
        color: Colors.lightText,
        fontSize: 16,
        fontFamily: "Quicksand-Medium",
        paddingHorizontal: 15,
        paddingBottom: 5
    },
    inputWrapper: {
        borderWidth: 3,
        borderColor: Colors.orange,
        backgroundColor: Colors.darkestBlue,
    },
    inputText: {
        color: Colors.lightText,
        fontSize: 18,
        fontFamily: "Quicksand-Medium",
        paddingHorizontal: 15,
    }
});
