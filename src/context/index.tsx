import React, { useReducer, useEffect } from "react";
import { ReactComponentProps } from "../constants/types";
import { debtHoldersInitialState, debtHoldersReducer, DebtHoldersContext } from "./DebtHoldersContext";
import { debtsInitialState, debtsReducer, DebtsContext } from "./DebtsContext";

export * from "./DebtHoldersContext";
export * from "./DebtsContext";

interface StateProviderProps extends ReactComponentProps {
    onStorageLoad: () => void;
}

export const StateProvider = (props: StateProviderProps) => {
    const [debtsState, debtsDispatch] = useReducer(debtsReducer, debtsInitialState);
    const [debtHoldersState, debtHoldersDispatch] = useReducer(debtHoldersReducer, debtHoldersInitialState);
    
    // TODO load persistent storage
    useEffect(() => {
        props.onStorageLoad();
    }, []);

    return (
        <DebtHoldersContext.Provider value={{ state: debtHoldersState, dispatch: debtHoldersDispatch }}>
            <DebtsContext.Provider value={{ state: debtsState, dispatch: debtsDispatch }}>
                {props.children}
            </DebtsContext.Provider>
        </DebtHoldersContext.Provider>
    );
};