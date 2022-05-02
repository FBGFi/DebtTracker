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

export const debtHoldersInitialState: TState = {
    "this-is-a-debt-holder-id": {
        name: "Niko"
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

// export const DebtHoldersProvider = (props: ReactComponentProps) => {
//     const [state, dispatch] = useReducer(reducer, debtHoldersInitialState);
//     return <DebtHoldersContext.Provider value={{ state, dispatch }}>
//         {props.children}
//     </DebtHoldersContext.Provider>;
// }

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