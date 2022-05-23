import React, {  useContext } from 'react';
import { Text, StyleSheet, StyleProp, View, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { DebtsContext, useSwitchDebtPaidState, DebtHoldersContext, useRemoveDebtHolderFromDebt } from "../../context";
import { ReactComponentProps } from "../../constants/types";
import { calculateUserDebt, isPaid } from "../../constants/utils";
import { Colors } from "../../styles/colors";
import { TouchableCard, DebtItems, CustomButton, TotalAmount } from "../../components";
import { TrashIcon, XIcon } from "../../assets";

interface DebtPickerCardProps extends ReactComponentProps {
    debtId: string;
    debtHolderId: string;
    focusedDebtId?: string;
    onInteract: (debtId?: string) => void;
}

export const DebtPickerCard = (props: DebtPickerCardProps) => {
    const { state } = useContext(DebtsContext);
    const debtHoldersState = useContext(DebtHoldersContext).state;
    const [switchDebtPaidState] = useSwitchDebtPaidState();
    const [removeDebtHolderFromDebt] = useRemoveDebtHolderFromDebt();

    const combineStyles = (baseStyle: StyleProp<any>, paidStyle: StyleProp<any>, unPaidStyle: StyleProp<any>) => {
        return isPaid(state, props.debtId, debtHoldersState) ? [baseStyle, paidStyle] : [baseStyle, unPaidStyle];
    }

    const isPaidByUser = () => {
        return debtHoldersState[props.debtHolderId]?.debts[props.debtId];
    }

    const onRemovalPress = () => {
        Alert.alert(
            "Confirm removal",
            `Are you sure you want to remove ${state[props.debtId].description}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => {
                        removeDebtHolderFromDebt(props.debtId, props.debtHolderId)
                    },
                    style: "default"
                }
            ]
        );
    }

    const Content = () => {
        return <View style={styles.content}>
            <DebtItems debtId={props.debtId} />
            <TotalAmount debtId={props.debtId} />
            <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingVertical: 10, marginTop: 10 }}>
                <View style={{ flexDirection: "row", flex: 1 }}>
                    <Text style={styles.text}>Paid: </Text>
                    <CheckBox
                        tintColors={{ true: Colors.paidColor, false: Colors.unPaidColor }}
                        disabled={false}
                        value={isPaidByUser()}
                        onChange={() => switchDebtPaidState(props.debtHolderId, props.debtId)} />
                </View>
                <CustomButton style={{ marginLeft: 10, padding: 0, borderWidth: 0 }} onPress={() => onRemovalPress()}>
                    <View style={{ height: 25, width: 25 }}>
                        <TrashIcon />
                    </View>
                </CustomButton>
                <CustomButton style={{ marginLeft: 10, padding: 0, borderWidth: 0 }} onPress={() => props.onInteract()}>
                    <View style={{ height: 25, width: 25 }}>
                        <XIcon />
                    </View>
                </CustomButton>
            </View>
        </View>
    }

    return (
        <TouchableCard
            onPress={() => props.onInteract(props.debtId)}
            style={combineStyles(styles.debtCard, styles.paidDebt, styles.unPaidDebt)}
            disabled={props.debtId === props.focusedDebtId}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.text}>{state[props.debtId].description}</Text>
                <Text style={combineStyles(styles.total, styles.totalPaid, styles.totalUnPaid)}>{calculateUserDebt(state[props.debtId]).toFixed(2)} {state[props.debtId].currency}</Text>
            </View>
            {props.debtId === props.focusedDebtId ? <Content /> : null}
        </TouchableCard>
    );
};

const styles = StyleSheet.create({
    content: {
        marginTop: 10,
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