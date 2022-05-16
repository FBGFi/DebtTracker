import React, { useState, useContext } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { AddNewButton, CustomModal, DebtItems, TotalAmount, PaidAmount, UserAmount } from "../../components";
import { ScreenProps } from "../../constants/types";
import { DebtsContext, useAddDebt } from "../../context";
import { DebtCard } from "./DebtCard";
import { Colors } from "../../styles/colors";
interface DebtsScreenProps extends ScreenProps {

}

const DebtModal = ({ debtId, setModal }: { debtId: string, setModal: React.Dispatch<any> }) => {
    const { state } = useContext(DebtsContext);

    const prices = (debtId: string) => {
        return (
            <View style={{ backgroundColor: Colors.darkestBlue, padding: 5 }}>
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