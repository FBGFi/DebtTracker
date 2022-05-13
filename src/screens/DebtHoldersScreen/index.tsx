import React, { useState, useContext } from "react";
import { ScrollView, View, Text, Button, StyleSheet } from "react-native";
import { ScreenProps } from "../../constants/types";
import { DebtHoldersContext, useAddDebtHolder, DebtsContext, useSwitchDebtPaidState, useAddDebtHolderToDebt } from "../../context";
import { DebtHolderCard } from "./DebtHolderCard";
import { AddNewButton, CustomModal } from "../../components";
import { DebtCard } from "../DebtsScreen/DebtCard";

interface DebtHoldersScreenProps extends ScreenProps {
    id: string;
}

export const DebtHoldersScreen = (props: DebtHoldersScreenProps) => {
    const [modal, setModal] = useState<any>(null);
    const [addDebtHolder] = useAddDebtHolder();
    const [switchDebtPaidState] = useSwitchDebtPaidState();
    const [addDebtHolderToDebt] = useAddDebtHolderToDebt();
    const { state } = useContext(DebtHoldersContext);
    const debtsState = useContext(DebtsContext).state;

    // const renderHolderDebts: any = (key: string) => {
    //     return debtsState[key].items.map((item: any) => <View key={item.description}>
    //         <Text>{item.description}</Text>
    //         <Text>{item.price} {item.currency}</Text>
    //     </View>);
    // }

    const viewDebtHolder = (id: string) => {
        setModal(
            <CustomModal
                setModal={() => {
                    setModal(null);
                }}
                title={state[id].name}>
                {Object.keys(state[id].debts).map(key => {
                    // TODO calculate the amount of debt per person
                    if (debtsState[key].debtHolders.includes(id)) {
                        return (<DebtCard
                            key={key}
                            debtId={key}
                            viewDebt={() => {
                                switchDebtPaidState(id, key);
                            }} />);
                    }
                })}
            </CustomModal>
        );
    }
    return (
        <>
            {modal}
            <ScrollView>
                {Object.keys(state).map(key => <DebtHolderCard key={key} debtHolderId={key} viewDebtHolder={() => viewDebtHolder(key)} />)}
            </ScrollView>
            <AddNewButton onPress={() => {
                const dhId = addDebtHolder({ name: "Niko " + Object.keys(state).length, debts: {} });
                addDebtHolderToDebt("this-is-a-debt-id", dhId);
            }} />
        </>
    );
}
const styles = StyleSheet.create({
    debtHolderCard: {
        flexDirection: "row",
    },
    text: {
        fontFamily: "Quicksand-Medium",
        fontSize: 24
    }
});