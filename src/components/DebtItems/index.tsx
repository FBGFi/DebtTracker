import React, { useContext, useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet, TextInput, NativeSyntheticEvent, TextInputSubmitEditingEventData } from "react-native";
import { DebtsContext, useRemoveItemFromDebt, useUpdateDebtItemPrice, TDebtItem, useUpdateDebtItemDescription } from "../../context";
import { Colors } from "../../styles/colors";
import { ReactComponentProps } from "../../constants/types";
import { CustomButton } from "../CustomButton";

interface DebtItemProps extends ReactComponentProps {
    item: TDebtItem;
    debtId: string;
    index: number;
    editable?: boolean;
}


export const DebtItem = (props: DebtItemProps) => {
    const { state } = useContext(DebtsContext);
    const [descriptionInput, setDescriptionInput] = useState(props.item.description);
    const [priceInput, setPriceInput] = useState(props.item.price.toFixed(2));
    const [removeItemFromDebt] = useRemoveItemFromDebt();
    const [updateDebtItemPrice] = useUpdateDebtItemPrice();
    const [updateDebtItemDescription] = useUpdateDebtItemDescription();

    const onRemovePress = () => {
        removeItemFromDebt(props.debtId, props.index);
    }

    const onDescriptionChange = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        setDescriptionInput(e.nativeEvent.text);
    }

    const onDescriptionBlur = () => {
        const input = descriptionInput !== "" ? descriptionInput : "-";
        updateDebtItemDescription(props.debtId, props.index, input);
    }

    const onPriceBlur = () => {
        updateDebtItemPrice(props.debtId, props.index, parseFloat(priceInput));
    }

    const onPriceChange = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        const input = parseFloat(e.nativeEvent.text);        
        if (!isNaN(input)) setPriceInput(input.toFixed(2));
        else setPriceInput("0");
    }

    return (
        <View style={{
            flexDirection: "row",
            marginVertical: 3,
            paddingBottom: 3,
            borderBottomWidth: 1,
            borderColor: Colors.orange,
        }}>
            {props.editable ?
                <TextInput
                    style={styles.descriptionInput}
                    defaultValue={props.item.description}
                    onChange={onDescriptionChange}
                    onBlur={onDescriptionBlur} />
                :
                <Text style={styles.description}>{props.item.description}</Text>}
            {props.editable ?
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <TextInput
                    onChange={onPriceChange}
                    onBlur={onPriceBlur}
                    style={styles.priceInput}
                    keyboardType="numeric"
                    defaultValue={props.item.price.toFixed(2)} />
                    <View style={{justifyContent: 'center'}}><Text style={styles.currencyInput}> {state[props.debtId]?.currency}</Text></View>
                </View>
                :
                <Text style={styles.currency}>{props.item.price.toFixed(2)} {state[props.debtId]?.currency}</Text>}
            {props.editable && <CustomButton onPress={onRemovePress} title="x" />}
        </View>
    );
}

interface DebtItemsProps extends ReactComponentProps {
    debtId: string;
    editable?: boolean;
}

export const DebtItems = (props: DebtItemsProps) => {
    const { state } = useContext(DebtsContext);
    return (
        <>
            {state[props.debtId].items.map((item, index) => <DebtItem key={item.description + index} item={item} index={index} debtId={props.debtId} editable={props.editable} />)}
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
    },
    descriptionInput: {
        fontSize: 20,
        padding: 0,
        color: Colors.lightText,
        flex: 2,
        fontFamily: "Quicksand-Medium"
    },
    priceInput: {
        fontSize: 20,
        padding: 0,
        flex: 1,
        color: Colors.lightText,
        textAlign: "right",
        fontFamily: "Quicksand-Medium"
    },
    currencyInput: {
        fontSize: 20,
        color: Colors.lightText,
        textAlign: "right",
        fontFamily: "Quicksand-Medium"
    },
})