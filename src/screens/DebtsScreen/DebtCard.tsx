import React, { useContext } from 'react';
import { StyleSheet, Text, StyleProp } from "react-native";
import { TouchableCard } from "../../components";
import { DebtsContext, DebtHoldersContext } from '../../context';
import { Colors } from "../../styles/colors";

interface DebtCardProps {
    debtId: string;
    viewDebt: (debtId: string) => void;
}
export const DebtCard = (props: DebtCardProps) => {
    const { state } = useContext(DebtsContext);
    const debtHoldersState = useContext(DebtHoldersContext).state;

    if (!state[props.debtId]) return null;

    const countTotal = () => state[props.debtId].items.reduce((prevSum, item) => prevSum + item.price, 0).toFixed(2);

    const isPaid = () => {
        if(state[props.debtId].debtHolders.length === 0) return false;
        
        for (let id of state[props.debtId].debtHolders) {
            if (debtHoldersState[id].debts[props.debtId] !== true) {
                return false;
            }
        }
        return true;
    }

    const combineStyles = (baseStyle: StyleProp<any>, paidStyle: StyleProp<any>, unPaidStyle: StyleProp<any>) => {
        return isPaid() ? [baseStyle, paidStyle] : [baseStyle, unPaidStyle];
    }

    return (
        <TouchableCard onPress={() => props.viewDebt(props.debtId)} style={combineStyles(styles.debtCard, styles.paidDebt, styles.unPaidDebt)}>
            <Text style={styles.title}>{state[props.debtId].description}</Text>
            <Text style={combineStyles(styles.total, styles.totalPaid, styles.totalUnPaid)}>{countTotal()} {state[props.debtId].currency}</Text>
        </TouchableCard>
    );
}

const styles = StyleSheet.create({
    debtCard: {
    },
    paidDebt: {
        borderColor: Colors.paidColor,
    },
    unPaidDebt: {
        borderColor: Colors.unPaidColor,
    },
    title: {
        fontSize: 20,
        fontFamily: "Quicksand-Medium",
        flex: 2,
        color: Colors.lightText,
    },
    total: {
        fontSize: 20,
        fontFamily: "Quicksand-Bold",
        flex: 1,
        textAlign: "right",
        color: Colors.lightText,
    },
    totalPaid: {
        color: Colors.paidColor,
    },
    totalUnPaid: {
        color: Colors.unPaidColor,
    },
});