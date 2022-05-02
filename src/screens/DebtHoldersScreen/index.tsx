import React, { useState, useContext } from "react";
import { ScrollView, View, Text, Button, StyleSheet, Modal } from "react-native";
import { ScreenProps } from "../../constants/types";
import { DebtHoldersContext, useAddDebtHolder } from "../../context";

const items = [
    {
        description: "Viinaa",
        price: 666.00,
        currency: "EUR"
    },
    {
        description: "Sipsejä",
        price: 420.69,
        currency: "EUR"
    }
]

const debtHolders: any = {
    "this-is-a-debt-holder-id": {
        name: "Niko"
    }
};

const debts: any = {
    "this-is-a-debt-description": {
        items,
        debtHolders: ["this-is-a-debt-holder-id"]
    }
};

interface DebtHoldersScreenProps extends ScreenProps {
    id: string;
}

export const DebtHoldersScreen = (props: DebtHoldersScreenProps) => {
    const [modal, setModal] = useState<any>(null);
    const [addDebtHolder] = useAddDebtHolder();
    const { state } = useContext(DebtHoldersContext);

    const renderHolderDebts: any = (key: string) => {
        return debts[key].items.map((item: any) => <View key={item.description}>
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
                {Object.keys(debts).map(key => {
                    if (debts[key].debtHolders.includes(id)) return renderHolderDebts(key);
                })}
                <Button title="Close" onPress={() => setModal(null)} />
            </Modal>
        );
    }
    return (
        <>
            {modal}
            <ScrollView>
                {Object.keys(state).map(key => <View style={styles.debtHolderCard} key={key}>
                    <Text>{state[key].name}</Text>
                    <Button onPress={() => viewDebtHolder(key)} title="Open" />
                </View>)}
                <Button onPress={() => {
                    addDebtHolder({ name: "Niko " + Object.keys(state).length })
                }} title="Add Debtholder" />
            </ScrollView>
        </>
    );
}
const styles = StyleSheet.create({
    debtHolderCard: {
        flexDirection: "row",
    }
});