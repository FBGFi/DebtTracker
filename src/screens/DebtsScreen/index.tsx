import React, { useState, useContext } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AddNewButton, CustomModal } from "../../components";
import { ScreenProps } from "../../constants/types";
import { DebtsContext, useAddDebt, useRemoveItemFromDebt, DebtHoldersContext } from "../../context";
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

    const TotalAmount = ({debtId}: {debtId: string}) => {
        return (
            <View style={{ flexDirection: "row", padding: 5 }}>
                <Text style={{ color: Colors.orange, fontSize: 20, flex: 1 }}>Total:</Text>
                <Text style={{
                    color: Colors.lightText,
                    fontSize: 20,
                    flex: 1,
                    textAlign: "right"
                }}>{state[debtId].items.reduce((a, b) => a + b.price, 0).toFixed(2)} {state[debtId].currency}</Text>
            </View>
        );
    }

    const UserAmount = ({debtId}: {debtId: string}) => {
        const { state } = useContext(DebtsContext);

        const calculateUserDebt = () => {
            if(state[debtId].debtHolders.length === 0) return "";
            return (state[debtId].items.reduce((a, b) => a + b.price, 0) / state[debtId].debtHolders.length).toFixed(2);
        }

        return (
            <View style={{ flexDirection: "row", padding: 5 }}>
                <Text style={{ color: Colors.orange, fontSize: 20, flex: 1 }}>Per person:</Text>
                <Text style={{
                    color: Colors.lightText,
                    fontSize: 20,
                    flex: 1,
                    textAlign: "right"
                }}>{calculateUserDebt()} {state[debtId].currency}</Text>
            </View>
        );
    }

    const PaidAmount = ({debtId}: {debtId: string}) => {
        const { state } = useContext(DebtsContext);
        const debtHoldersState = useContext(DebtHoldersContext).state;

        const calculateUserDebt = () => {
            return state[debtId].items.reduce((a, b) => a + b.price, 0) / state[debtId].debtHolders.length;
        }

        const calculatePaidDebt = () => {
            if(state[debtId].debtHolders.length === 0) return "";
            const userDebt = calculateUserDebt();
            let paidDebt: number = 0;
            Object.keys(debtHoldersState).map(id => {
                if(debtHoldersState[id].debts[debtId]) paidDebt += userDebt;
            });
            return paidDebt.toFixed(2);
        }

        return (
            <View style={{ flexDirection: "row", padding: 5 }}>
                <Text style={{ color: Colors.orange, fontSize: 20, flex: 1 }}>Paid:</Text>
                <Text style={{
                    color: Colors.lightText,
                    fontSize: 20,
                    flex: 1,
                    textAlign: "right"
                }}>{calculatePaidDebt()} {state[debtId].currency}</Text>
            </View>
        );
    }

    const prices = (debtId: string) => {
        return (
            <View style={{backgroundColor: Colors.darkestBlue, paddingVertical: 5}}>
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
        // return;
        setModal(<DebtModal setModal={setModal} debtId={debtId} />);
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