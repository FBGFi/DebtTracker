import React, { createContext, useReducer, useContext } from 'react';
import { ReactComponentProps } from "../../constants/types";

type TAction = {
    type: string;
    value: any;
}

type TDebtHolder = {
    name: string;
    debts: {
        [id: string]: boolean;
    }
}

type TState = {
    [id: string]: TDebtHolder;
}

export const debtHoldersInitialState: TState = {
    "this-is-a-debt-holder-id": {
        name: "Niko",
        debts: {
            "this-is-a-debt-id": false
        }
    }
}

export function debtHoldersReducer(state: TState, action: TAction): TState {
    switch (action.type) {
        case 'addDebtHolder':
            state[action.value.id] = action.value.data;
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

export const DebtHoldersContext = createContext<{ state: TState, dispatch: React.Dispatch<TAction> }>({ state: debtHoldersInitialState, dispatch: () => { } });

export const useAddDebtHolder = () => {
    const { dispatch } = useContext(DebtHoldersContext);

    const addDebtHolder = (debtHolder: TDebtHolder) => {
        // TODO remove return value in prod
        const id =  Date.now().toString();
        dispatch({
            type: 'addDebtHolder', value: {
                id: id,
                data: debtHolder
            }
        });
        return id;
    };

    return [addDebtHolder];
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