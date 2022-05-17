import React, { useContext, useState } from "react";
import { View, StyleSheet, TextInput, NativeSyntheticEvent, TextInputSubmitEditingEventData } from "react-native";
import { CustomModal, DebtItems, TotalAmount, PaidAmount, UserAmount, CustomButton } from "../../components";
import { DebtsContext, useUpdateDebtDescription, useAddItemToDebt, useRemoveDebt } from "../../context";
import { Colors } from "../../styles/colors";
import { ReactComponentProps } from "../../constants/types";

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
        <CustomButton style={{flex: 1}} title="Save" onPress={() => submit()} />
    </View>)
}

export const DebtModal = ({ debtId, setModal }: DebtModalProps) => {
    const { state } = useContext(DebtsContext);
    const [editActive, setEditActive] = useState(false);
    const [updateDebtDescription] = useUpdateDebtDescription();
    const [addItemToDebt] = useAddItemToDebt();
    const [removeDebt] = useRemoveDebt();

    const onEditSubmit = (input: string) => {
        setEditActive(false);
        updateDebtDescription(debtId, input);
    }

    const prices = (debtId: string) => {
        return (
            <View style={{ backgroundColor: Colors.darkestBlue, padding: 5 }}>
                <UserAmount debtId={debtId} />
                <PaidAmount debtId={debtId} />
                <TotalAmount debtId={debtId} />
                {editActive && <EditDebtInput onBlur={() => setEditActive(false)} debtName={state[debtId].description} onSubmit={onEditSubmit} />}
            </View>
        );
    }

    const onRemoveDebt = () => {
        setModal(null);
        removeDebt(debtId);
    }

    const editButtons = () => {
        return(
            <View style={{flexDirection: "row", justifyContent: "flex-end", padding: 5}}>
                <CustomButton style={styles.editButton} title="Edit" onPress={() => setEditActive(true)} />
                <CustomButton style={styles.editButton} title="Remove" onPress={onRemoveDebt} />
                <CustomButton style={styles.editButton} title="Add" onPress={() => addItemToDebt(debtId, {
                    description: "-",
                    price: 0,
                })}/>
            </View>
        );
    }

    return (
        <CustomModal
            setModal={setModal}
            outSideContent={prices(debtId)}
            title={state[debtId].description}
            headerButtons={editButtons()}>
            <View style={{ marginHorizontal: 5 }}>
                <DebtItems debtId={debtId} editable />
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