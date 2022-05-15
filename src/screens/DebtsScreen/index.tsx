import React, { useState, useContext } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { AddNewButton, CustomModal, DebtItems } from "../../components";
import { ScreenProps } from "../../constants/types";
import { calculateTotalDebt, calculateUserDebt, calculatePaidDebt } from "../../constants/utils";
import { DebtsContext, useAddDebt, DebtHoldersContext } from "../../context";
import { DebtCard } from "./DebtCard";
import { Colors } from "../../styles/colors";
interface DebtsScreenProps extends ScreenProps {

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
            <View style={{ marginHorizontal: 5 }}>
                <DebtItems debtId={debtId} />
            </View>
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
                    items: [
                        {
                            description: "Viinaa",
                            price: 666.00,
                        },
                        {
                            description: "Sipsejä",
                            price: 420.695634,
                        }
                    ],
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