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
import {
    settingsInitialState,
    settingsReducer,
    SettingsContext,
    getSettingsStateFromStorage,
} from "./SettingsContext";
export * from "./DebtHoldersContext";
export * from "./DebtsContext";
export * from "./SettingsContext";

interface StateProviderProps extends ReactComponentProps {
    onStorageLoad: () => void;
}

export const StateProvider = (props: StateProviderProps) => {
    const [debtsState, debtsDispatch] = useReducer(debtsReducer, debtsInitialState);
    const [debtHoldersState, debtHoldersDispatch] = useReducer(debtHoldersReducer, debtHoldersInitialState);
    const [settingsState, settingsDispatch] = useReducer(settingsReducer, settingsInitialState);

    const loadAppState = async () => {
        const debts = await getDebtsStateFromStorage();
        const debtHolders = await getDebtHoldersStateFromStorage();
        const settings = await getSettingsStateFromStorage();
        if (debts) {
            debtsDispatch({
                type: "REPLACE_ALL_DEBTS",
                value: debts
            });
        }
        if (debtHolders) {
            debtHoldersDispatch({
                type: "REPLACE_ALL_DEBTHOLDERS",
                value: debtHolders
            })
        }
        if(settings){
            settingsDispatch({
                type: "REPLACE_SETTINGS",
                value: settings
            });
        }
        props.onStorageLoad();
    }

    useEffect(() => {
        loadAppState();
    }, []);

    return (
        <SettingsContext.Provider value={{ state: settingsState, dispatch: settingsDispatch }}>
            <DebtHoldersContext.Provider value={{ state: debtHoldersState, dispatch: debtHoldersDispatch }}>
                <DebtsContext.Provider value={{ state: debtsState, dispatch: debtsDispatch }}>
                    {props.children}
                </DebtsContext.Provider>
            </DebtHoldersContext.Provider>
        </SettingsContext.Provider>
    );
};