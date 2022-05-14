import React, { createContext, useReducer, useContext } from 'react';
import { ReactComponentProps } from "../../constants/types";

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

export const debtHoldersInitialState: TDebtHoldersState = {
    "this-is-a-debt-holder-id": {
        name: "Niko",
        debts: {
            "this-is-a-debt-id": false
        }
    }
}

export function debtHoldersReducer(state: TDebtHoldersState, action: TAction): TDebtHoldersState {
    switch (action.type) {
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
    return { ...state };
}

export const DebtHoldersContext = createContext<{ state: TDebtHoldersState, dispatch: React.Dispatch<TAction> }>({ state: debtHoldersInitialState, dispatch: () => { } });

export const useAddDebtHolder = () => {
    const { dispatch } = useContext(DebtHoldersContext);

    const addDebtHolder = (debtHolder: TDebtHolder) => {
        dispatch({
            type: 'addDebtHolder', value: {
                id: Date.now().toString(),
                data: debtHolder
            }
        });
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