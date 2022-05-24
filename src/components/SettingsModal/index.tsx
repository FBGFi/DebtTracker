import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import { CustomModal, CustomInput } from "../index";
import { ReactComponentProps } from "../../constants/types";
import { Colors } from "../../styles/colors";
import { SettingsContext, useSaveUserName, useSaveMobilePay, useSaveBankAccount } from "../../context";


interface SettingsModalProps extends ReactComponentProps {
    setModal: (modal: null) => void;
}

const removeSpaces = (value: string) => value.replace(/ /g, "");

const validateBankAccount = (bankAccount: string) => {
    const characters = removeSpaces(bankAccount).split("");
    if (characters.length !== 18) return false;
    for (let i = 2; i < characters.length; i++) {
        if (isNaN(parseInt(characters[i]))) return false;
    }
    return isNaN(parseInt(bankAccount[0])) && isNaN(parseInt(bankAccount[1]));
}

const validateMobilePay = (mobilePay: string) => {
    return !isNaN(parseInt(removeSpaces(mobilePay))) && parseInt(removeSpaces(mobilePay)).toString().length === 9;
}

const splitToChunks = (value: string, chunkSize: number) => value.split("").reduce((resultArray: string[][], item: string, index: number) => {
    const chunkIndex = Math.floor(index / chunkSize);

    if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
}, []).map(chunk => {
    return chunk.join("");
});

const parseMobilePay = (mobilePay: string) => {
    let formattedMobilePay = splitToChunks(removeSpaces(mobilePay), 3);
    for(let i = formattedMobilePay.length - 1; i > 2; i--) {
        formattedMobilePay[2] = [...formattedMobilePay[2], ...formattedMobilePay[i]].join("");
        formattedMobilePay.pop();
    }
    return formattedMobilePay.join(" ");    
}

const parseUserName = (userName: string) => {
    let formattedUserName: string | string[] = userName.toLowerCase();
    formattedUserName = formattedUserName.split("");
    formattedUserName[0] = formattedUserName[0].toUpperCase();
    formattedUserName = formattedUserName.join("");
    return formattedUserName;
}

const parseBankAccount = (bankAccount: string) => {
    const formattedBankAccount: string | string[] = removeSpaces(bankAccount.toUpperCase());
    return splitToChunks(formattedBankAccount, 4).join(" ");
}

export const SettingsModal = (props: SettingsModalProps) => {
    const { state } = useContext(SettingsContext);
    const [username, setUserName] = useState(state.username);
    const [bankAccount, setBankAccount] = useState(state.bankAccount);
    const [mobilePay, setMobilePay] = useState(state.mobilePay);
    const [saveUserName] = useSaveUserName();
    const [saveBankAccount] = useSaveBankAccount();
    const [saveMobilePay] = useSaveMobilePay();
    const [validBankAccount, isValidBankAccount] = useState(validateBankAccount(state.bankAccount));
    const [validMobilePay, isValidMobilePay] = useState(validateMobilePay(state.mobilePay));

    const formatAndSaveUserName = () => {
        if (username === "") {
            setUserName(state.username);
            return;
        }
        const parsedUserName = parseUserName(username);
        setUserName(parsedUserName);
        saveUserName(parsedUserName);
    }
    const formatAndSaveBankAccount = () => {
        if (bankAccount === "") {
            setBankAccount(state.bankAccount);
            return;
        }
        isValidBankAccount(validateBankAccount(bankAccount));
        const parsedBankAccount = parseBankAccount(bankAccount);
        setBankAccount(parsedBankAccount);
        saveBankAccount(parsedBankAccount);
    }
    const formatAndSaveMobilePay = () => {
        if (mobilePay === "") {
            setMobilePay(state.mobilePay);
            return;
        }
        isValidMobilePay(validateMobilePay(mobilePay));
        const parsedMobilePay = parseMobilePay(mobilePay);
        setMobilePay(parsedMobilePay);
        saveMobilePay(parsedMobilePay);
    }

    return (<CustomModal setModal={props.setModal} title="Settings">
        <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Username:</Text>
            <CustomInput
                style={styles.inputText}
                multiline={false}
                wrapperStyle={styles.inputWrapper}
                value={username}
                onChange={(e: NativeSyntheticEvent<TextInputFocusEventData>) => setUserName(e.nativeEvent.text)}
                onBlur={formatAndSaveUserName} />
        </View>
        <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Bank account:</Text>
            <CustomInput
                style={styles.inputText}
                multiline={false}
                value={bankAccount}
                onChange={(e: NativeSyntheticEvent<TextInputFocusEventData>) => setBankAccount(e.nativeEvent.text)}
                onBlur={formatAndSaveBankAccount}
                wrapperStyle={[styles.inputWrapper, !validBankAccount && { borderColor: Colors.unPaidColor }]} />
        </View>
        <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Mobile pay:</Text>
            <CustomInput
                style={styles.inputText}
                multiline={false}
                value={mobilePay}
                onChange={(e: NativeSyntheticEvent<TextInputFocusEventData>) => setMobilePay(e.nativeEvent.text)}
                onBlur={formatAndSaveMobilePay}
                wrapperStyle={[styles.inputWrapper, !validMobilePay && { borderColor: Colors.unPaidColor }]} />
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
