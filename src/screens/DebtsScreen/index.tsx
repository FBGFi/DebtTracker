import React, { useState, useContext } from "react";
import { ScrollView, TouchableWithoutFeedback, View, StyleSheet, NativeSyntheticEvent, TextInputSubmitEditingEventData, TextInput } from "react-native";
import { AddNewButton, CustomButton } from "../../components";
import { ScreenProps, ReactComponentProps } from "../../constants/types";
import { DebtsContext, useAddDebt } from "../../context";
import { DebtCard } from "./DebtCard";
import { DebtModal } from "./DebtModal";
import { Colors } from "../../styles/colors";

interface AddNewDebtInputProps extends ReactComponentProps {
    onSubmit: (debtId?: string) => void;
}

const AddNewDebtInput = (props: AddNewDebtInputProps) => {
    const [input, setInput] = useState("");
    const [addDebt] = useAddDebt();

    const onSubmitEditing = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        if(input === ""){ 
            props.onSubmit(undefined);
            return;
        }
        const debtId = addDebt({
            description: input,
            currency: "EUR",
            items: [],
            debtHolders: []
        });
        props.onSubmit(debtId);
    };

    const submit = () => {
        if(input === ""){ 
            props.onSubmit(undefined);
            return;
        }
        const debtId = addDebt({
            description: input,
            currency: "EUR",
            items: [],
            debtHolders: []
        });
        props.onSubmit(debtId);
    }

    return (<View style={{ flexDirection: "row", marginHorizontal: 10, marginBottom: 10 }}>
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
            }} onChangeText={(e) => setInput(e)} onSubmitEditing={onSubmitEditing} autoFocus={true} />
        </View>
        <CustomButton style={{ flex: 1 }} title="Add" onPress={() => submit()} />
    </View>)
}

interface DebtsScreenProps extends ScreenProps {

}

export const DebtsScreen = (props: DebtsScreenProps) => {
    const [modal, setModal] = useState<any>(null);
    const [inputVisible, setInputVisible] = useState(false);
    const { state } = useContext(DebtsContext);

    const viewDebt = (debtId: string) => {
        setModal(<DebtModal setModal={setModal} debtId={debtId} />);
    }

    const onNewDebtSubmit = (debtId?: string) => {
        setInputVisible(false);
        if(debtId){
            viewDebt(debtId);
        }
    }

    return (
        <>
            {modal}
            <TouchableWithoutFeedback onPress={() => setInputVisible(false)} touchSoundDisabled={!inputVisible}>
                <View style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        <View style={{ paddingBottom: 70 }}>
                            {Object.keys(state).map(key => <DebtCard key={key} viewDebt={viewDebt} debtId={key} />)}
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
            {inputVisible ? <AddNewDebtInput onSubmit={onNewDebtSubmit} /> :
                <AddNewButton onPress={() => setInputVisible(true)} />}
        </>
    );
}

const styles = StyleSheet.create({
    contentContainer: {

    },
    debtCard: {
        flexDirection: "row",
    },
});