import React, { createContext, useReducer, useContext } from 'react';
import { ReactComponentProps } from "../../constants/types";
import { useAddDebtToHolder } from "../index";

type TAction = {
    type: string;
    value: any;
}

type TDebtItem = {
    description: string;
    price: number;
}

type TDebt = {
    description: string;
    currency: string;
    items: TDebtItem[];
    debtHolders: string[];
}

type TState = {
    [id: string]: TDebt;
}


export const debtsInitialState: TState = {
    "this-is-a-debt-id": {
        description: "Kaatokännit",
        currency: "EUR",
        items: [
            {
                description: "Viinaa",
                price: 666.00
            },
            {
                description: "Sipsejä",
                price: 420.69
            }
        ],
        debtHolders: ["this-is-a-debt-holder-id"]
    }
}

export function debtsReducer(state: TState, action: TAction): TState {
    switch (action.type) {
        case 'addDebt':
            state[action.value.id] = action.value.data;
            break;
        default:
            break;
    }
    return { ...state };
}

export const DebtsContext = createContext<{ state: TState, dispatch: React.Dispatch<TAction> }>({ state: debtsInitialState, dispatch: () => { } });

export const useAddDebt = () => {
    const { dispatch } = useContext(DebtsContext);
    const [addDebtToHolder] = useAddDebtToHolder();

    const addDebt = (debt: TDebt) => {
        const debtId = Date.now().toString();
        dispatch({
            type: 'addDebt', value: {
                id: debtId,
                data: debt
            }
        });
        for(const debtHolder of debt.debtHolders){
            addDebtToHolder(debtHolder, debtId);
        }
    };

    return [addDebt];
}