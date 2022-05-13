import React, { createContext, useContext } from 'react';
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
        case 'removeDebt':
            delete state[action.value.id];
            break;
        case 'updateDebtDescription':
            state[action.value.id].description = action.value.description;
            break;
        case 'addItemToDebt':
            state[action.value.id].items.push(action.value.debtItem);
            break;
        case 'removeItemFromDebt':
            state[action.value.id].items.splice(action.value.index, 1);
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

export const useRemoveDebt = () => {
    const { dispatch } = useContext(DebtsContext);
    // TODO call debtholder hook to remove debt

    const removeDebt = (debtId: string) => {
        dispatch({
            type: 'removeDebt', value: {
                id: debtId,
            }
        })
    }

    return [removeDebt];
}

export const useUpdateDebtDescription = () => {
    const { state, dispatch } = useContext(DebtsContext);

    const updateDebtDescription = (debtId: string, description: string) => {
        if(!state[debtId]) return;
        dispatch({
            type: 'updateDebtDescription', value: {
                id: debtId,
                description
            }
        })
    }

    return [updateDebtDescription];
}

export const useAddItemToDebt = () => {
    const { state, dispatch } = useContext(DebtsContext);

    const addItemToDebt = (debtId: string, debtItem: TDebtItem) => {
        if(!state[debtId]) return;
        dispatch({
            type: 'addItemToDebt', value: {
                id: debtId,
                debtItem
            }
        })
    }

    return [addItemToDebt];
}

// TODO does not trigger re render
export const useRemoveItemFromDebt = () => {
    const { state, dispatch } = useContext(DebtsContext);

    const removeItemFromDebt = (debtId: string, index: number) => {
        if(!state[debtId] || state[debtId].items.length < index + 1) return;
        dispatch({
            type: 'removeItemFromDebt', value: {
                id: debtId,
                index
            }
        })
    }

    return [removeItemFromDebt];
}