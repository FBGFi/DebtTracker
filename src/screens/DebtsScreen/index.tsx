import React, { useState, useContext } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AddNewButton, CustomModal } from "../../components";
import { ScreenProps } from "../../constants/types";
import { DebtsContext, useAddDebt, useRemoveItemFromDebt, DebtHoldersContext, TDebt, TDebtHoldersState } from "../../context";
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

const calculateTotalDebt = (debt: TDebt) => {
    return debt.items.reduce((a, b) => a + b.price, 0);
}

const calculateUserDebt = (debt: TDebt) => {
    const totalDebt = calculateTotalDebt(debt);
    if (debt.debtHolders.length === 0) return totalDebt;
    return (totalDebt / debt.debtHolders.length);
}

const calculatePaidDebt = (debt: TDebt, debtId: string, debtHoldersState: TDebtHoldersState) => {
    if (debt.debtHolders.length === 0) return 0;
    const userDebt = calculateUserDebt(debt);
    let paidDebt: number = 0;
    Object.keys(debtHoldersState).map(id => {
        if (debtHoldersState[id].debts[debtId]) paidDebt += userDebt;
    });
    return paidDebt;
}

const DebtItem = ({ item, debtId, index }: { item: { description: string, price: number }, debtId: string, index: number }) => {
    const { state } = useContext(DebtsContext);
    const [removeItemFromDebt] = useRemoveItemFromDebt();

    return (
        <TouchableOpacity onPress={() => removeItemFromDebt(debtId, index)}>
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
        </TouchableOpacity>
    );
}

const DebtModal = ({ debtId, setModal }: { debtId: string, setModal: React.Dispatch<any> }) => {
    const { state } = useContext(DebtsContext);

    const TotalAmount = ({ debtId }: { debtId: string }) => {
        const { state } = useContext(DebtsContext);

        return (
            <View style={{ flexDirection: "row", padding: 5 }}>
                <Text style={{ color: Colors.orange, fontSize: 20, flex: 1 }}>Total:</Text>
                <Text style={{
                    color: Colors.lightText,
                    fontSize: 20,
                    flex: 1,
                    textAlign: "right"
                }}>{calculateTotalDebt(state[debtId]).toFixed(2)} {state[debtId].currency}</Text>
            </View>
        );
    }

    const UserAmount = ({ debtId }: { debtId: string }) => {
        const { state } = useContext(DebtsContext);

        return (
            <View style={{ flexDirection: "row", padding: 5 }}>
                <Text style={{ color: Colors.orange, fontSize: 20, flex: 1 }}>Per person:</Text>
                <Text style={{
                    color: Colors.lightText,
                    fontSize: 20,
                    flex: 1,
                    textAlign: "right"
                }}>{calculateUserDebt(state[debtId]).toFixed(2)} {state[debtId].currency}</Text>
            </View>
        );
    }

    const PaidAmount = ({ debtId }: { debtId: string }) => {
        const { state } = useContext(DebtsContext);
        const debtHoldersState = useContext(DebtHoldersContext).state;

        return (
            <View style={{ flexDirection: "row", padding: 5 }}>
                <Text style={{ color: Colors.orange, fontSize: 20, flex: 1 }}>Paid:</Text>
                <Text style={{
                    color: Colors.lightText,
                    fontSize: 20,
                    flex: 1,
                    textAlign: "right"
                }}>{calculatePaidDebt(state[debtId], debtId, debtHoldersState).toFixed(2)} {state[debtId].currency}</Text>
            </View>
        );
    }

    const prices = (debtId: string) => {
        return (
            <View style={{ backgroundColor: Colors.darkestBlue, paddingVertical: 5 }}>
                <UserAmount debtId={debtId} />
                <PaidAmount debtId={debtId} />
                <TotalAmount debtId={debtId} />
            </View>
        );
    }

    return (
        <CustomModal
            setModal={setModal}
            outSideContent={prices(debtId)}
            title={state[debtId].description}>
            {state[debtId].items.map((item: any, index: number) => <DebtItem key={item.description + index} item={item} debtId={debtId} index={index} />)}
        </CustomModal>);
}

export const DebtsScreen = (props: DebtsScreenProps) => {
    const [modal, setModal] = useState<any>(null);
    const { state } = useContext(DebtsContext);
    const [addDebt] = useAddDebt();

    const viewDebt = (debtId: string) => {
        setModal(<DebtModal setModal={setModal} debtId={debtId} />);
    }

    return (
        <>
            {modal}
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={{ paddingBottom: 70 }}>
                    {Object.keys(state).map(key => <DebtCard key={key} viewDebt={viewDebt} debtId={key} />)}
                </View>
            </ScrollView>
            <AddNewButton onPress={() => {
                addDebt({
                    description: "Kaatokännit v" + Object.keys(state).length,
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