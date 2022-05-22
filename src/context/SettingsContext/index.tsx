import React, { createContext, useContext } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const asyncStorageKey = "DEBT_TRACKER_SETTINGS";

type TAction = {
    type: string;
    value: any;
}

export type TSettingsState = {
    username: string;
    bankAccount: string;
    mobilePay: string;
}

export const getSettingsStateFromStorage = async (): Promise<TSettingsState | undefined> => {
    const debts = await AsyncStorage.getItem(asyncStorageKey);
    if (debts) {
        return JSON.parse(debts);
    }
}

export const settingsInitialState: TSettingsState = {
    username: "",
    bankAccount: "",
    mobilePay: "",
};

export function settingsReducer(state: TSettingsState, action: TAction): TSettingsState {
    switch (action.type) {
        case "REPLACE_SETTINGS":
            return {
                username: action.value.username,
                bankAccount: action.value.bankAccount,
                mobilePay: action.value.mobilePay
            }
        case "saveUserName":
            state.username = action.value;
            break;
        case "saveBankAccount":
            state.bankAccount = action.value;
            break;
        case "saveMobilePay":
            state.mobilePay = action.value;
            break;
        default:
            break;
    }
    AsyncStorage.setItem(asyncStorageKey, JSON.stringify(state));
    return {...state};
}

export const SettingsContext = createContext<{ state: TSettingsState, dispatch: React.Dispatch<TAction>}>({state: settingsInitialState, dispatch: () => { }});

export const useSaveUserName = () => {
    const {dispatch} = useContext(SettingsContext);

    const saveUserName = (username: string) => {
        dispatch({
            type: 'saveUserName', value: username
        })
    }

    return [saveUserName];
}

export const useSaveBankAccount = () => {
    const {dispatch} = useContext(SettingsContext);

    const saveBankAccount = (bankAccount: string) => {
        dispatch({
            type: 'saveBankAccount', value: bankAccount
        })
    }

    return [saveBankAccount];
}

export const useSaveMobilePay = () => {
    const {dispatch} = useContext(SettingsContext);

    const saveMobilePay = (mobilePay: string) => {
        dispatch({
            type: 'saveMobilePay', value: mobilePay
        })
    }

    return [saveMobilePay];
}