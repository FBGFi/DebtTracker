import React, { useContext } from 'react';
import { StyleSheet, Text } from "react-native";
import { TouchableCard } from "../../components";
import { commonConstants } from '../../constants/common';
import { DebtHoldersContext } from '../../context';

interface DebtHolderCardProps {
    debtHolderId: string;
    viewDebtHolder: (debtId: string) => void;
}
export const DebtHolderCard = (props: DebtHolderCardProps) => {
    const { state } = useContext(DebtHoldersContext);
    if (!state[props.debtHolderId]) return null;

    return (
        <TouchableCard onPress={() => props.viewDebtHolder(props.debtHolderId)} style={styles.debtHolderCard}>
            <Text style={styles.title}>{state[props.debtHolderId].name}</Text>
        </TouchableCard>
    );
}

const styles = StyleSheet.create({
    debtHolderCard: {
        flexDirection: "row",
        padding: 10,
        backgroundColor: "#95fc9c",
        marginBottom: commonConstants.gapAmount,
        justifyContent: "space-between",
    },
    title: {
        fontSize: 20,
        fontFamily: "Quicksand-Medium",
        flex: 2
    },
});