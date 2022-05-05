import React, { useState, useContext } from "react";
import { ScrollView, View, Text, Button, StyleSheet, Modal } from "react-native";
import { CustomButton } from "../../components";
import { TouchableCard } from "../../components/TouchableCard";
import { commonConstants } from "../../constants/common";
import { ScreenProps } from "../../constants/types";
import { DebtsContext, useAddDebt } from "../../context";
import { DebtCard } from "./DebtCard";

const items = [
    {
        description: "Viinaa",
        price: 666.00,
    },
    {
        description: "Sipsejä",
        price: 420.695634,
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
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {Object.keys(state).map(key => <DebtCard key={key} viewDebt={viewDebt} debtId={key} />)}
            </ScrollView>
            <CustomButton style={styles.addButton} onPress={() => {
                addDebt({
                    description: "KaatokännitKaatokännitKaatokännitKaatokännitKaatokännitKaatokännitKaatokännitKaatokännitKaatokännit v" + Object.keys(state).length,
                    currency: "EUR",
                    items,
                    debtHolders: ["this-is-a-debt-holder-id"]
                })
            }}><Text style={styles.addButtonText}>+</Text></CustomButton>
        </>
    );
}

const styles = StyleSheet.create({
    contentContainer: {

    },
    debtCard: {
        flexDirection: "row",
    },
    addButton: {
        position: "absolute",
        right: 15,
        bottom: 15,
        width: 50,
        height: 50,
        borderRadius: 50
    },
    addButtonText: {
        marginTop: -8,
        fontSize: 30,
        fontFamily: "Quicksand-SemiBold"
    }
});