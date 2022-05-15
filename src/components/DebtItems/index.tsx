import React, { useContext } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { DebtsContext, useRemoveItemFromDebt, TDebtItem } from "../../context";
import { Colors } from "../../styles/colors";
import { ReactComponentProps } from "../../constants/types";

interface DebtItemProps extends ReactComponentProps {
    item: TDebtItem;
    debtId: string;
    index: number;
}


export const DebtItem = (props: DebtItemProps) => {
    const { state } = useContext(DebtsContext);
    // TODO not like this
    const [removeItemFromDebt] = useRemoveItemFromDebt();

    return (
        <TouchableOpacity onPress={() => removeItemFromDebt(props.debtId, props.index)}>
            <View style={{
                flexDirection: "row",
                marginVertical: 3,
                paddingBottom: 3,
                borderBottomWidth: 1,
                borderColor: Colors.orange,
            }}>
                <Text style={styles.description}>{props.item.description}</Text>
                <Text style={styles.currency}>{props.item.price.toFixed(2)} {state[props.debtId]?.currency}</Text>
            </View>
        </TouchableOpacity>
    );
}

export const DebtItems = (props: { debtId: string }) => {
    const { state } = useContext(DebtsContext);
    return (
        <>
            {state[props.debtId].items.map((item, index) => <DebtItem key={item.description + index} item={item} index={index} debtId={props.debtId} />)}
        </>
    );
};

const styles = StyleSheet.create({
    description: {
        fontSize: 20,
        color: Colors.lightText,
        flex: 2,
        fontFamily: "Quicksand-Medium"
    },
    currency: {
        fontSize: 20,
        color: Colors.lightText,
        flex: 1,
        textAlign: "right",
        fontFamily: "Quicksand-Medium"
    }
})