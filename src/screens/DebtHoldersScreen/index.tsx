import React, { useState } from "react";
import { ScrollView, View, Text, Button, StyleSheet, Modal } from "react-native";
import { ScreenProps } from "../../constants/types";

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
                <Text>{debtHolders[id].name}</Text>
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
                {Object.keys(debtHolders).map(key =>
                    <View style={styles.debtHolderCard} key={key}>
                        <Text>{debtHolders[key].name}</Text>
                        <Button onPress={() => viewDebtHolder(key)} title="Open" />
                    </View>
                )}
            </ScrollView>
        </>
    );
}
const styles = StyleSheet.create({
    debtHolderCard: {
        flexDirection: "row",
    }
});