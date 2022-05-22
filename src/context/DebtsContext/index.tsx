import React, { createContext, useContext } from 'react';
import { useAddDebtToHolder, DebtHoldersContext, useRemoveDebtFromHolder } from "../index";
import AsyncStorage from "@react-native-async-storage/async-storage";

const asyncStorageKey = "DEBT_TRACKER_DEBTS";

type TAction = {
    type: string;
    value: any;
}

export type TDebtItem = {
    description: string;
    price: number;
}

export type TDebt = {
    description: string;
    currency: string;
    items: TDebtItem[];
    debtHolders: string[];
}

export type TDebtsState = {
    [id: string]: TDebt;
}

export const getDebtsStateFromStorage = async (): Promise<TDebtsState | undefined> => {
    const debts = await AsyncStorage.getItem(asyncStorageKey);
    if (debts) {
        return JSON.parse(debts);
    }
}

export const debtsInitialState: TDebtsState = {};

export function debtsReducer(state: TDebtsState, action: TAction): TDebtsState {
    switch (action.type) {
        case 'REPLACE_ALL_DEBTS':
            return { ...action.value };
        case 'addDebt':
            state[action.value.id] = action.value.data;
            break;
        case 'removeDebt':
            delete state[action.value.id];
            break;
        case 'updateDebtDescription':
            state[action.value.id].description = action.value.description;
            break;
        case 'updateDebtItemPrice':
            state[action.value.id].items[action.value.itemIndex].price = action.value.price;
            break;
        case 'updateDebtItemDescription':
            state[action.value.id].items[action.value.itemIndex].description = action.value.description;
            break;
        case 'addItemToDebt':
            state[action.value.id].items.push(action.value.debtItem);
            break;
        case 'removeItemFromDebt':
            state[action.value.id].items.splice(action.value.index, 1);
            break;
        case 'addDebtHolderToDebt':
            state[action.value.id].debtHolders.push(action.value.debtHolderId);
            break;
        case 'removeDebtHolderFromDebt':
            state[action.value.id].debtHolders.splice(
                state[action.value.id].debtHolders.findIndex(id => id === action.value.debtHolderId),
                1
            );
            break;
        default:
            break;
    }
    AsyncStorage.setItem(asyncStorageKey, JSON.stringify(state));
    return { ...state };
}

export const DebtsContext = createContext<{ state: TDebtsState, dispatch: React.Dispatch<TAction> }>({ state: debtsInitialState, dispatch: () => { } });

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
        for (const debtHolder of debt.debtHolders) {
            addDebtToHolder(debtHolder, debtId);
        }
        return debtId;
    };

    return [addDebt];
}

export const useRemoveDebt = () => {
    const { dispatch } = useContext(DebtsContext);
    const debtHoldersState = useContext(DebtHoldersContext).state;
    const [removeDebtFromHolder] = useRemoveDebtFromHolder();

    const removeDebt = (debtId: string) => {
        dispatch({
            type: 'removeDebt', value: {
                id: debtId,
            }
        });
        Object.keys(debtHoldersState).map(debtHolderId => {
            if (debtHoldersState[debtHolderId].debts[debtId] !== undefined) {
                removeDebtFromHolder(debtHolderId, debtId);
            }
        });
    }

    return [removeDebt];
}

export const useUpdateDebtDescription = () => {
    const { state, dispatch } = useContext(DebtsContext);

    const updateDebtDescription = (debtId: string, description: string) => {
        if (!state[debtId]) return;
        dispatch({
            type: 'updateDebtDescription', value: {
                id: debtId,
                description
            }
        })
    }

    return [updateDebtDescription];
}

export const useUpdateDebtItemPrice = () => {
    const { state, dispatch } = useContext(DebtsContext);

    const updateDebtItemPrice = (debtId: string, itemIndex: number, price: number) => {
        if (!state[debtId] || isNaN(price)) return;
        dispatch({
            type: 'updateDebtItemPrice', value: {
                id: debtId,
                itemIndex,
                price
            }
        })
    }

    return [updateDebtItemPrice];
}

export const useUpdateDebtItemDescription = () => {
    const { state, dispatch } = useContext(DebtsContext);

    const updateDebtItemDescription = (debtId: string, itemIndex: number, description: string) => {
        if (!state[debtId]) return;
        dispatch({
            type: 'updateDebtItemDescription', value: {
                id: debtId,
                itemIndex,
                description
            }
        })
    }

    return [updateDebtItemDescription];
}

export const useAddItemToDebt = () => {
    const { state, dispatch } = useContext(DebtsContext);

    const addItemToDebt = (debtId: string, debtItem: TDebtItem) => {
        if (!state[debtId]) return;
        dispatch({
            type: 'addItemToDebt', value: {
                id: debtId,
                debtItem
            }
        })
    }

    return [addItemToDebt];
}

export const useRemoveItemFromDebt = () => {
    const { state, dispatch } = useContext(DebtsContext);

    const removeItemFromDebt = (debtId: string, index: number) => {
        if (!state[debtId] || state[debtId].items.length < index + 1) return;
        dispatch({
            type: 'removeItemFromDebt', value: {
                id: debtId,
                index
            }
        })
    }

    return [removeItemFromDebt];
}

export const useAddDebtHolderToDebt = () => {
    const { state, dispatch } = useContext(DebtsContext);
    const debtHoldersState = useContext(DebtHoldersContext).state;
    const [addDebtToHolder] = useAddDebtToHolder();

    const addDebtHolderToDebt = (debtId: string, debtHolderId: string) => {
        if (!debtHoldersState[debtHolderId] || !state[debtId] || state[debtId].debtHolders.includes(debtHolderId)) {
            return;
        }
        dispatch({
            type: 'addDebtHolderToDebt', value: {
                id: debtId,
                debtHolderId
            }
        });
        addDebtToHolder(debtHolderId, debtId);
    }

    return [addDebtHolderToDebt];
}

export const useRemoveDebtHolderFromDebt = () => {
    const { state, dispatch } = useContext(DebtsContext);
    const debtHoldersState = useContext(DebtHoldersContext).state;
    const [removeDebtFromHolder] = useRemoveDebtFromHolder();

    const removeDebtHolderFromDebt = (debtId: string, debtHolderId: string) => {
        if (!debtHoldersState[debtHolderId] || !state[debtId] || !state[debtId].debtHolders.includes(debtHolderId)) {
            return;
        }
        dispatch({
            type: 'removeDebtHolderFromDebt', value: {
                id: debtId,
                debtHolderId
            }
        });
        removeDebtFromHolder(debtHolderId, debtId);
    }

    return [removeDebtHolderFromDebt];
}

export const useRemoveDebtHolderFromAllDebts = () => {
    const { state } = useContext(DebtsContext);
    const [removeDebtHolderFromDebt] = useRemoveDebtHolderFromDebt();

    const removeDebtHolderFromAllDebts = (debtHolderId: string) => {
        for (const debtId of Object.keys(state)) {
            if (state[debtId].debtHolders.includes(debtHolderId)) {
                removeDebtHolderFromDebt(debtId, debtHolderId);
            }
        }
    }

    return [removeDebtHolderFromAllDebts];
}