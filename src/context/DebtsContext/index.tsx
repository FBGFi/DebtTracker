import React, { createContext, useReducer, useContext } from 'react';
import { ReactComponentProps } from "../../constants/types";

type TAction = {
    type: string;
    value: any;
}

type TDebtItem = {
    description: string;
    price: number;
    currency: string;
}

type TDebt = {
    description: string;
    items: TDebtItem[];
    debtHolders: string[];
}

type TState = {
    [id: string]: TDebt;
}


const initialState: TState = {
    "this-is-a-debt-id": {
        description: "Kaatokännit",
        items: [
            {
                description: "Viinaa",
                price: 666.00,
                currency: "EUR"
            },
            {
                description: "Sipsejä",
                price: 420.69,
                currency: "EUR"
            }
        ],
        debtHolders: ["this-is-a-debt-holder-id"]
    }
}

function reducer(state: TState, action: TAction): TState {
    switch (action.type) {
        case 'addDebt':
            state[action.value.id] = action.value.data;
            break;
        default:
            break;
    }
    return { ...state };
}

export const DebtsContext = createContext<{ state: TState, dispatch: React.Dispatch<TAction> }>({ state: initialState, dispatch: () => { } });

export const DebtsProvider = (props: ReactComponentProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <DebtsContext.Provider value={{ state, dispatch }}>
        {props.children}
    </DebtsContext.Provider>;
}

export const useAddDebt = () => {
    const { dispatch } = useContext(DebtsContext);

    const addDebt = (debt: TDebt) => {
        dispatch({
            type: 'addDebt', value: {
                id: Date.now().toString(),
                data: debt
            }
        });
    };

    return [addDebt];
}