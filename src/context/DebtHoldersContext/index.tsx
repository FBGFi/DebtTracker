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
        default:
            break;
    }
    return { ...state };
}

export const DebtHoldersContext = createContext<{ state: TState, dispatch: React.Dispatch<TAction> }>({ state: debtHoldersInitialState, dispatch: () => { } });

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