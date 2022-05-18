import React, { useContext, useState } from "react";
import { View, StyleSheet, TextInput, NativeSyntheticEvent, TextInputSubmitEditingEventData, Text } from "react-native";
import { CustomModal, DebtItems, TotalAmount, PaidAmount, UserAmount, CustomButton } from "../../components";
import { DebtsContext, useUpdateDebtDescription, useAddItemToDebt, useRemoveDebt, DebtHoldersContext } from "../../context";
import { Colors } from "../../styles/colors";
import { ReactComponentProps } from "../../constants/types";
import DropDownPicker from "react-native-dropdown-picker";

interface DebtModalProps extends ReactComponentProps {
    debtId: string;
    setModal: (modal: null) => void;
}

interface EditDebtInputProps extends ReactComponentProps {
    onSubmit: (input: string) => void;
    debtName: string;
    onBlur: () => void;
}

const EditDebtInput = (props: EditDebtInputProps) => {
    const [input, setInput] = useState(props.debtName);

    const inputChanged = (e: string) => {
        setInput(e);
    }

    const onSubmitEditing = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        props.onSubmit(input);
    };

    const submit = () => {
        props.onSubmit(input);
    }

    return (<View style={{ flexDirection: "row", marginHorizontal: 0, marginBottom: 10, marginTop: 5 }}>
        <View style={{
            flex: 5,
            paddingHorizontal: 10,
            borderTopWidth: 3,
            borderBottomWidth: 3,
            borderLeftWidth: 3,
            borderColor: Colors.orange
        }}>
            <TextInput style={{
                color: Colors.lightText,
                fontSize: 20,
                fontFamily: "Quicksand-Medium",
            }} onBlur={props.onBlur} value={input} onChangeText={inputChanged} onSubmitEditing={onSubmitEditing} autoFocus={true} />
        </View>
        <CustomButton style={{ flex: 1 }} title="Save" onPress={() => submit()} />
    </View>)
}

interface EditButtonsProps extends DebtModalProps {
    setEditActive: (active: boolean) => void;
    setAddDebtHolderActive: (active: boolean) => void;
    addDebtHolderActive: boolean;
    
}

const EditButtons = (props: EditButtonsProps) => {
    const debtHoldersState = useContext(DebtHoldersContext).state;
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [dropDownValue, setDropDownValue] = useState(null);
    const [dropDownItems, setDropDownItems] = useState(Object.entries(debtHoldersState).map(([debtHolderId, debtHolder]) => {
        return { label: debtHolder.name, value: debtHolderId }
    }));
    const [addItemToDebt] = useAddItemToDebt();
    const [removeDebt] = useRemoveDebt();

    const onRemoveDebt = () => {
        props.setModal(null);
        removeDebt(props.debtId);
    }

    return (
        <View style={{ position: "relative", flexDirection: "column", padding: 5}}>
            <View style={{ flexDirection: "row", justifyContent: "flex-end"}}>
                <CustomButton style={styles.editButton} title="Add DH" onPress={() => props.setAddDebtHolderActive(true)} />
                <CustomButton style={styles.editButton} title="Edit" onPress={() => props.setEditActive(true)} />
                <CustomButton style={styles.editButton} title="Remove" onPress={onRemoveDebt} />
                <CustomButton style={styles.editButton} title="Add" onPress={() => addItemToDebt(props.debtId, {
                    description: "-",
                    price: 0,
                })} />
            </View>
            {props.addDebtHolderActive && <View style={{elevation: 100, zIndex: 100}}><DropDownPicker
                // multiple={true}
                style={{elevation: 100}}
                open={dropDownOpen}
                setOpen={setDropDownOpen}
                value={dropDownValue}
                setValue={setDropDownValue}
                items={dropDownItems}
                setItems={setDropDownItems}
            /></View>}
        </View>
    );
}

interface PricesProps extends ReactComponentProps {
    debtId: string;
    editActive: boolean;
    setEditActive: (active: boolean) => void;
}

const Prices = (props: PricesProps) => {
    const { state } = useContext(DebtsContext);
    const [updateDebtDescription] = useUpdateDebtDescription();

    const onEditSubmit = (input: string) => {
        props.setEditActive(false);
        updateDebtDescription(props.debtId, input);
    }

    return (
        <View style={{ backgroundColor: Colors.darkestBlue, padding: 5 }}>
            <UserAmount debtId={props.debtId} />
            <PaidAmount debtId={props.debtId} />
            <TotalAmount debtId={props.debtId} />
            {props.editActive && <EditDebtInput onBlur={() => props.setEditActive(false)} debtName={state[props.debtId].description} onSubmit={onEditSubmit} />}
        </View>
    );
}

export const DebtModal = (props: DebtModalProps) => {
    const { state } = useContext(DebtsContext);
    const [addDebtHolderActive, setAddDebtHolderActive] = useState(false);
    const [editActive, setEditActive] = useState(false);

    return (
        <CustomModal
            setModal={props.setModal}
            outSideContent={<Prices debtId={props.debtId} editActive={editActive} setEditActive={setEditActive} />}
            title={state[props.debtId].description}
            headerButtons={<EditButtons addDebtHolderActive={addDebtHolderActive} setAddDebtHolderActive={setAddDebtHolderActive} setEditActive={setEditActive} debtId={props.debtId} setModal={props.setModal} />}>
            <View style={{ marginHorizontal: 5 }}>
                <DebtItems debtId={props.debtId} editable={!addDebtHolderActive} />
            </View>
        </CustomModal>);
}

const styles = StyleSheet.create({
    editButton: {
        paddingHorizontal: 5,
        paddingVertical: 3,
        marginLeft: 5
    }
});