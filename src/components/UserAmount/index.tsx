import React, { useContext } from "react";
import { Text, View } from "react-native";
import { DebtsContext } from "../../context";
import { Colors } from "../../styles/colors";
import { calculateUserDebt } from "../../constants/utils";

export const UserAmount = ({ debtId }: { debtId: string }) => {
    const { state } = useContext(DebtsContext);

    return (
        <View style={{ flexDirection: "row", paddingVertical: 5 }}>
            <Text style={{ color: Colors.orange, fontSize: 20, flex: 1 }}>Per person:</Text>
            <Text style={{
                color: Colors.lightText,
                fontSize: 20,
                flex: 1,
                textAlign: "right"
            }}>{calculateUserDebt(state[debtId]).toFixed(2)} {state[debtId].currency}</Text>
        </View>
    );
}