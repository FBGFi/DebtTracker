import React, { useReducer, useEffect } from "react";
import { ReactComponentProps } from "../constants/types";
import {
    debtHoldersInitialState,
    debtHoldersReducer,
    DebtHoldersContext,
    getDebtHoldersStateFromStorage,
} from "./DebtHoldersContext";
import {
    debtsInitialState,
    debtsReducer,
    DebtsContext,
    getDebtsStateFromStorage,
} from "./DebtsContext";
export * from "./DebtHoldersContext";
export * from "./DebtsContext";

interface StateProviderProps extends ReactComponentProps {
    onStorageLoad: () => void;
}

export const StateProvider = (props: StateProviderProps) => {
    const [debtsState, debtsDispatch] = useReducer(debtsReducer, debtsInitialState);
    const [debtHoldersState, debtHoldersDispatch] = useReducer(debtHoldersReducer, debtHoldersInitialState);

    const loadAppState = async () => {
        const debts = await getDebtsStateFromStorage();
        const debtHolders = await getDebtHoldersStateFromStorage(); 
        if(Object.keys(debts).length > 0) {
            debtsDispatch({
                type: "REPLACE_ALL_DEBTS",
                value: debts
            });
        }
        if(Object.keys(debtHolders).length > 0) {
            debtHoldersDispatch({
                type: "REPLACE_ALL_DEBTHOLDERS",
                value: debtHolders
            })
        }
        props.onStorageLoad();
    }

    useEffect(() => {
        loadAppState();
    }, []);

    return (
        <DebtHoldersContext.Provider value={{ state: debtHoldersState, dispatch: debtHoldersDispatch }}>
            <DebtsContext.Provider value={{ state: debtsState, dispatch: debtsDispatch }}>
                {props.children}
            </DebtsContext.Provider>
        </DebtHoldersContext.Provider>
    );
};