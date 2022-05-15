import React, { useState, useContext } from 'react';
import { Text, StyleSheet, StyleProp, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import DropDownPicker from "react-native-dropdown-picker";
import { DebtsContext, useSwitchDebtPaidState, DebtHoldersContext, useRemoveDebtHolderFromDebt } from "../../context";
import { ReactComponentProps } from "../../constants/types";
import { calculateUserDebt, isPaid } from "../../constants/utils";
import { Colors } from "../../styles/colors";
import { TouchableCard, DebtItems, CustomButton } from "../../components";

interface DebtPickerCardProps extends ReactComponentProps {
    debtId: string;
    debtHolderId: string;
}

export const DebtPickerCard = (props: DebtPickerCardProps) => {
    const [contentHidden, isContentHidden] = useState(true);
    const { state } = useContext(DebtsContext);
    const debtHoldersState = useContext(DebtHoldersContext).state;
    const [switchDebtPaidState] = useSwitchDebtPaidState();
    const [removeDebtHolderFromDebt] = useRemoveDebtHolderFromDebt();

    const showContent = () => {
        if (contentHidden) isContentHidden(false);
    }

    const hideContent = () => {
        if (!contentHidden) isContentHidden(true);
    }

    const combineStyles = (baseStyle: StyleProp<any>, paidStyle: StyleProp<any>, unPaidStyle: StyleProp<any>) => {
        return isPaid(state, props.debtId, debtHoldersState) ? [baseStyle, paidStyle] : [baseStyle, unPaidStyle];
    }

    const isPaidByUser = () => {
        return debtHoldersState[props.debtHolderId]?.debts[props.debtId];
    }

    const Content = () => {
        return <View style={styles.content}>
            <DebtItems debtId={props.debtId} />
            <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingVertical: 10 }}>
                <CustomButton title="Remove" onPress={() => removeDebtHolderFromDebt(props.debtId, props.debtHolderId)} />
                <Text style={styles.text}>Paid: </Text>
                <CheckBox
                    tintColors={{ true: Colors.paidColor, false: Colors.unPaidColor }}
                    disabled={false}
                    value={isPaidByUser()}
                    onChange={() => switchDebtPaidState(props.debtHolderId, props.debtId)} />
            </View>
            <CustomButton title="Close" onPress={hideContent} />
        </View>
    }

    return (
        <TouchableCard
            onPress={showContent}
            style={combineStyles(styles.debtCard, styles.paidDebt, styles.unPaidDebt)}
            disabled={!contentHidden}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.text}>{state[props.debtId].description}</Text>
                <Text style={combineStyles(styles.total, styles.totalPaid, styles.totalUnPaid)}>{calculateUserDebt(state[props.debtId]).toFixed(2)} {state[props.debtId].currency}</Text>
            </View>
            {contentHidden ? null : <Content />}
        </TouchableCard>
    );
};

const styles = StyleSheet.create({
    content: {
    },
    debtCard: {
        flexDirection: "column"
    },
    paidDebt: {
        borderColor: Colors.paidColor,
    },
    unPaidDebt: {
        borderColor: Colors.unPaidColor,
    },
    text: {
        color: Colors.lightText,
        fontFamily: "Quicksand-Medium",
        fontSize: 20
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