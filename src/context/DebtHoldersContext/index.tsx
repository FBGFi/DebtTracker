import React, { createContext, useContext } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const asyncStorageKey = "DEBT_TRACKER_DEBTHOLDERS";

type TAction = {
    type: string;
    value: any;
}

export type TDebtHolder = {
    name: string;
    debts: {
        [id: string]: boolean;
    }
}

export type TDebtHoldersState = {
    [id: string]: TDebtHolder;
}

export const getDebtHoldersStateFromStorage = async (): Promise<TDebtHoldersState> => {
    const debtHolders = await AsyncStorage.getItem(asyncStorageKey);
    if (debtHolders) {
        return JSON.parse(debtHolders);
    }
    return {};
}

export const debtHoldersInitialState: TDebtHoldersState = {};

export function debtHoldersReducer(state: TDebtHoldersState, action: TAction): TDebtHoldersState {
    switch (action.type) {
        case 'REPLACE_ALL_DEBTHOLDERS':
            return {...action.value};
        case 'addDebtHolder':
            state[action.value.id] = action.value.data;
            break;
        case 'removeDebtHolder':
            delete state[action.value.id];
            break;
        case 'updateDebtHolderName':
            state[action.value.id].name = action.value.name;
            break;
        case 'switchDebtPaidState':
            state[action.value.debtHolderId].debts[action.value.debtId] = !state[action.value.debtHolderId].debts[action.value.debtId]
            break;
        case 'addDebtToHolder':
            state[action.value.debtHolderId].debts[action.value.debtId] = false;
            break;
        case 'removeDebtFromHolder':
            delete state[action.value.debtHolderId].debts[action.value.debtId];
            break;
        default:
            break;
    }
    AsyncStorage.setItem(asyncStorageKey, JSON.stringify(state));
    return { ...state };
}

export const DebtHoldersContext = createContext<{ state: TDebtHoldersState, dispatch: React.Dispatch<TAction> }>({ state: debtHoldersInitialState, dispatch: () => { } });

export const useAddDebtHolder = () => {
    const { dispatch } = useContext(DebtHoldersContext);

    const addDebtHolder = (debtHolder: TDebtHolder) => {
        const debtHolderId = Date.now().toString();
        dispatch({
            type: 'addDebtHolder', value: {
                id: debtHolderId,
                data: debtHolder
            }
        });
        return debtHolderId;
    };

    return [addDebtHolder];
}

export const useRemoveDebtHolder = () => {
    const { dispatch } = useContext(DebtHoldersContext);

    const removeDebtHolder = (debtHolderId: string) => {
        dispatch({
            type: 'removeDebtHolder', value: {
                id: debtHolderId
            }
        });
    };

    return [removeDebtHolder];
}

export const useUpdateDebtHolderName = () => {
    const { dispatch } = useContext(DebtHoldersContext);

    const updateDebtHolderName = (debtHolderId: string, name: string) => {
        dispatch({
            type: 'updateDebtHolderName', value: {
                id: debtHolderId,
                name
            }
        });
    };

    return [updateDebtHolderName];
}

export const useSwitchDebtPaidState = () => {
    const { state, dispatch } = useContext(DebtHoldersContext);

    const switchDebtPaidState = (debtHolderId: string, debtId: string) => {
        if (!state[debtHolderId]) return;
        dispatch({
            type: 'switchDebtPaidState', value: {
                debtHolderId,
                debtId
            }
        });
    };

    return [switchDebtPaidState];
}

export const useAddDebtToHolder = () => {
    const { state, dispatch } = useContext(DebtHoldersContext);

    const addDebtToHolder = (debtHolderId: string, debtId: string) => {
        if (!state[debtHolderId]) return;
        dispatch({
            type: 'addDebtToHolder', value: {
                debtHolderId,
                debtId
            }
        });
    }

    return [addDebtToHolder];
}

export const useRemoveDebtFromHolder = () => {
    const { state, dispatch } = useContext(DebtHoldersContext);

    const removeDebtFromHolder = (debtHolderId: string, debtId: string) => {
        if (!state[debtHolderId]) return;
        dispatch({
            type: 'removeDebtFromHolder', value: {
                debtHolderId,
                debtId
            }
        });
    }

    return [removeDebtFromHolder];
}