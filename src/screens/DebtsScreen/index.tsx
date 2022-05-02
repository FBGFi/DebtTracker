import React, { useState, useContext } from "react";
import { ScrollView, View, Text, Button, StyleSheet, Modal } from "react-native";
import { ScreenProps } from "../../constants/types";
import { DebtsContext, useAddDebt } from "../../context";

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
];
interface DebtsScreenProps extends ScreenProps {

}

export const DebtsScreen = (props: DebtsScreenProps) => {
    const [modal, setModal] = useState<any>(null);
    const { state } = useContext(DebtsContext);
    const [addDebt] = useAddDebt();

    const viewDebt = (key: string) => {
        setModal(
            <Modal
                animationType="slide"
                onRequestClose={() => {
                    setModal(null);
                }}>
                {state[key].items.map((item: any) => <View key={item.description}>
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
                {Object.keys(state).map(key =>
                    <View style={styles.debtCard} key={key}>
                        <Text>{key}</Text>
                        <Button onPress={() => viewDebt(key)} title="Open" />
                    </View>
                )}
                <Button onPress={() => {
                    addDebt({
                        description: "Kaatokännit v" + Object.keys(state).length,
                        items,
                        debtHolders: ["this-is-a-debt-holder-id"]
                    })
                }} title="Add Debt" />
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    debtCard: {
        flexDirection: "row",
    }
});