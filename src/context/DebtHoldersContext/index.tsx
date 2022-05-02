import React, { createContext, useReducer, useContext } from 'react';
import { ReactComponentProps } from "../../constants/types";

type TAction = {
    type: string;
    value: any;
}

type TDebtHolder = {
    name: string;
}

type TState = {
    [id: string]: TDebtHolder;
}

const initialState: TState = {
    "this-is-a-debt-holder-id": {
        name: "Niko"
    }
}

function reducer(state: TState, action: TAction): TState {
    switch (action.type) {
        case 'addDebtHolder':
            state[action.value.id] = action.value.data;
            break;
        default:
            break;
    }
    return { ...state };
}

export const DebtHoldersContext = createContext<{ state: TState, dispatch: React.Dispatch<TAction> }>({ state: initialState, dispatch: () => { } });

export const DebtHoldersProvider = (props: ReactComponentProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <DebtHoldersContext.Provider value={{ state, dispatch }}>
        {props.children}
    </DebtHoldersContext.Provider>;
}

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