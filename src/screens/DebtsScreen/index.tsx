import React, { useState, useContext } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { AddNewButton, CustomModal } from "../../components";
import { ScreenProps } from "../../constants/types";
import { DebtsContext, useAddDebt } from "../../context";
import { DebtCard } from "./DebtCard";
import { Colors } from "../../styles/colors";

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

const DebtItem = ({ item, debtId }: { item: { description: string, price: number }, debtId: string }) => {
    const { state } = useContext(DebtsContext);

    return (
        <View style={{
            flexDirection: "row",
            margin: 5,
            paddingBottom: 3,
            borderBottomWidth: 1,
            borderColor: Colors.orange,
        }}>
            <Text style={{
                fontSize: 20,
                color: Colors.lightText,
                flex: 2,
            }}>{item.description}</Text>
            <Text style={{
                fontSize: 20,
                color: Colors.lightText,
                flex: 1,
                textAlign: "right"
            }}>{item.price.toFixed(2)} {state[debtId]?.currency}</Text>
        </View>
    );
}

export const DebtsScreen = (props: DebtsScreenProps) => {
    const [modal, setModal] = useState<any>(null);
    const { state } = useContext(DebtsContext);
    const [addDebt] = useAddDebt();

    const totalAmount = (key: string) => {
        return (
            <View style={{ flexDirection: "row", padding: 5 }}>
                <Text style={{ color: Colors.orange, fontSize: 20, flex: 1 }}>Total: </Text>
                <Text style={{
                    color: Colors.orange,
                    fontSize: 20,
                    flex: 1,
                    textAlign: "right"
                }}>{state[key].items.reduce((a, b) => a + b.price, 0).toFixed(2)} {state[key].currency}</Text>
            </View>
        );
    }

    const viewDebt = (key: string) => {
        setModal(
            <CustomModal
                setModal={setModal}
                outSideContent={totalAmount(key)}
                title={state[key].description}>
                {state[key].items.map((item: any) => <DebtItem key={item.description} item={item} debtId={key} />)}
            </CustomModal>
        );
    }

    return (
        <>
            {modal}
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {Object.keys(state).map(key => <DebtCard key={key} viewDebt={viewDebt} debtId={key} />)}
            </ScrollView>
            <AddNewButton onPress={() => {
                addDebt({
                    description: "KaatokännitKaatokännitKaatokännitKaatokännitKaatokännitKaatokännitKaatokännitKaatokännitKaatokännit v" + Object.keys(state).length,
                    currency: "EUR",
                    items,
                    debtHolders: ["this-is-a-debt-holder-id"]
                })
            }} />
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