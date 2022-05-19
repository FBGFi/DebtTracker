import React, { useContext } from "react";
import { Text, View } from "react-native";
import { DebtsContext, DebtHoldersContext } from "../../context";
import { Colors } from "../../styles/colors";
import { calculatePaidDebt } from "../../constants/utils";

export const PaidAmount = ({ debtId }: { debtId: string }) => {
    const { state } = useContext(DebtsContext);
    const debtHoldersState = useContext(DebtHoldersContext).state;

    return (
        <View style={{ flexDirection: "row", paddingVertical: 5 }}>
            <Text style={{ color: Colors.orange, fontSize: 20, flex: 1, fontFamily: "Quicksand-Medium" }}>Paid:</Text>
            <Text style={{
                color: Colors.lightText,
                fontSize: 20,
                flex: 1,
                textAlign: "right",
                fontFamily: "Quicksand-Medium"
            }}>{calculatePaidDebt(state[debtId], debtId, debtHoldersState).toFixed(2)} {state[debtId].currency}</Text>
        </View>
    );
}