import { TDebt, TDebtHoldersState, TDebtsState } from "../context";

export const calculateTotalDebt = (debt: TDebt) => {
    return debt.items.reduce((a, b) => a + b.price, 0);
}

export const calculateUserDebt = (debt: TDebt) => {
    const totalDebt = calculateTotalDebt(debt);
    if (debt.debtHolders.length === 0) return totalDebt;
    return (totalDebt / debt.debtHolders.length);
}

export const calculatePaidDebt = (debt: TDebt, debtId: string, debtHoldersState: TDebtHoldersState) => {
    if (debt.debtHolders.length === 0) return 0;
    const userDebt = calculateUserDebt(debt);
    let paidDebt: number = 0;
    Object.keys(debtHoldersState).map(id => {
        if (debtHoldersState[id].debts[debtId]) paidDebt += userDebt;
    });
    return paidDebt;
}

export const isPaid = (debtsState: TDebtsState, debtId: string, debtHoldersState: TDebtHoldersState) => {
    if(debtsState[debtId].debtHolders.length === 0) return false;
    
    for (let id of debtsState[debtId].debtHolders) {
        if (debtHoldersState[id].debts[debtId] !== true) {
            return false;
        }
    }
    return true;
}