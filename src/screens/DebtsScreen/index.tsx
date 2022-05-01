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

interface DebtsScreenProps extends ScreenProps {

}

export const DebtsScreen = (props: DebtsScreenProps) => {
    const [modal, setModal] = useState<any>(null);
    const viewDebt = (key: string) => {
        setModal(
            <Modal
                animationType="slide"
                onRequestClose={() => {
                    setModal(null);
                }}>
                {debts[key].items.map((item: any) => <View key={item.description}>
                    <Text>{item.description}</Text>
                    <Text>{item.price} {item.currency}</Text>
                </View>)}
                <Button title="Close" onPress={() => setModal(null)} />
            </Modal>
        );
    }

    return (
        <>
            {modal}
            <ScrollView>
                {Object.keys(debts).map(key =>
                    <View style={styles.debtCard} key={key}>
                        <Text>{key}</Text>
                        <Button onPress={() => viewDebt(key)} title="Open" />
                    </View>
                )}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    debtCard: {
        flexDirection: "row",
    }
});