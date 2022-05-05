import React, { useState, useContext } from "react";
import { ScrollView, View, Text, Button, StyleSheet, Modal } from "react-native";
import { ScreenProps } from "../../constants/types";
import { DebtHoldersContext, useAddDebtHolder, DebtsContext } from "../../context";
import { DebtHolderCard } from "./DebtHolderCard";

interface DebtHoldersScreenProps extends ScreenProps {
    id: string;
}

export const DebtHoldersScreen = (props: DebtHoldersScreenProps) => {
    const [modal, setModal] = useState<any>(null);
    const [addDebtHolder] = useAddDebtHolder();
    const { state } = useContext(DebtHoldersContext);
    const debtsState = useContext(DebtsContext).state;

    const renderHolderDebts: any = (key: string) => {
        return debtsState[key].items.map((item: any) => <View key={item.description}>
            <Text>{item.description}</Text>
            <Text>{item.price} {item.currency}</Text>
        </View>);
    }

    const viewDebtHolder = (id: string) => {
        setModal(
            <Modal
                animationType="slide"
                onRequestClose={() => {
                    setModal(null);
                }}>
                <Text>{state[id].name}</Text>
                {Object.keys(debtsState).map(key => {
                    if (debtsState[key].debtHolders.includes(id)) return renderHolderDebts(key);
                })}
                <Button title="Close" onPress={() => setModal(null)} />
            </Modal>
        );
    }
    return (
        <>
            {modal}
            <ScrollView>
                {Object.keys(state).map(key => <DebtHolderCard key={key} debtHolderId={key} viewDebtHolder={() => viewDebtHolder(key)} />)}
            </ScrollView>
            <Button onPress={() => {
                addDebtHolder({ name: "Niko " + Object.keys(state).length, debts: {} })
            }} title="Add Debtholder" />
        </>
    );
}
const styles = StyleSheet.create({
    debtHolderCard: {
        flexDirection: "row",
    },
    text: {
        fontFamily: "Quicksand-Medium",
        fontSize: 24
    }
});