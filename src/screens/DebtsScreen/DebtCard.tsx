import React, { useContext } from 'react';
import { StyleSheet, Text } from "react-native";
import { TouchableCard } from "../../components";
import { commonConstants } from '../../constants/common';
import { DebtsContext, DebtHoldersContext } from '../../context';

interface DebtCardProps {
    debtId: string;
    viewDebt: (debtId: string) => void;
}
export const DebtCard = (props: DebtCardProps) => {
    const { state } = useContext(DebtsContext);
    const debtHoldersState = useContext(DebtHoldersContext).state;

    if (!state[props.debtId]) return null;

    const countTotal = () => state[props.debtId].items.reduce((prevSum, item) => prevSum + item.price, 0).toFixed(2);
    const combineStyles = () => {
        for (let id of state[props.debtId].debtHolders) {
            if (debtHoldersState[id].debts[props.debtId] !== true) {
                return [styles.debtCard, styles.unPaidDebt];
            }
        }
        return [styles.debtCard, styles.paidDebt];
    }
    return (
        <TouchableCard onPress={() => props.viewDebt(props.debtId)} style={combineStyles()}>
            <Text style={styles.title}>{state[props.debtId].description}</Text>
            <Text style={styles.total}>{countTotal()} {state[props.debtId].currency}</Text>
        </TouchableCard>
    );
}

const styles = StyleSheet.create({
    debtCard: {
        flexDirection: "row",
        padding: 10,
        marginBottom: commonConstants.gapAmount,
        justifyContent: "space-between",
    },
    paidDebt: {
        backgroundColor: "#95fc9c",
    },
    unPaidDebt: {
        backgroundColor: "#fa8c84"
    },
    title: {
        fontSize: 20,
        fontFamily: "Quicksand-Medium",
        flex: 2
    },
    total: {
        fontSize: 20,
        fontFamily: "Quicksand-Bold",
        flex: 1,
        textAlign: "right"
    },
});