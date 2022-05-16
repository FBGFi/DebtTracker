import React, { useState, useContext, useEffect } from "react";
import { ScrollView, View, TextInput, TouchableWithoutFeedback, NativeSyntheticEvent, TextInputSubmitEditingEventData } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { ScreenProps, ReactComponentProps } from "../../constants/types";
import { DebtHoldersContext, useAddDebtHolder } from "../../context";
import { DebtHolderCard } from "./DebtHolderCard";
import { DebtHolderModal } from "./DebtHolderModal";
import { AddNewButton, CustomButton } from "../../components";
import { Colors } from "../../styles/colors";

interface DebtHoldersScreenProps extends ScreenProps {
    id: string;
}

interface AddNewHolderInputProps extends ReactComponentProps {
    onSubmit: () => void;
}

const AddNewHolderInput = (props: AddNewHolderInputProps) => {
    const [input, setInput] = useState("");
    const [addDebtHolder] = useAddDebtHolder();
    
    const onSubmitEditing = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        addDebtHolder({name: e.nativeEvent.text, debts: {}});
        props.onSubmit();
    };

    const submit = () => {
        addDebtHolder({name: input, debts: {}});
        props.onSubmit();
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
        <CustomButton style={{flex: 1}} title="Add" onPress={() => submit()} />
    </View>)
}

export const DebtHoldersScreen = (props: DebtHoldersScreenProps) => {
    const [modal, setModal] = useState<any>(null);
    const [inputVisible, setInputVisible] = useState(false);
    const { state } = useContext(DebtHoldersContext);
    const isFocused = useIsFocused();

    const viewDebtHolder = (debtHolderId: string) => {
        setInputVisible(false);
        setModal(<DebtHolderModal debtHolderId={debtHolderId} setModal={setModal} />);
    }

    useEffect(() => {
        setInputVisible(false);
    }, [isFocused]);

    return (
        <>
            {modal}
            <TouchableWithoutFeedback onPress={() => setInputVisible(false)} touchSoundDisabled={!inputVisible}>
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <View style={{ paddingBottom: 70, flex: 1 }}>
                            {Object.keys(state).map(key => <DebtHolderCard key={key} debtHolderId={key} viewDebtHolder={() => viewDebtHolder(key)} />)}
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
            {inputVisible ? <AddNewHolderInput onSubmit={() => setInputVisible(false)} /> :
                // <AddNewButton onPress={() => addDebtHolder({ name: "Niko " + Object.keys(state).length, debts: {} })} />}
                <AddNewButton onPress={() => setInputVisible(true)} />}
        </>
    );
}