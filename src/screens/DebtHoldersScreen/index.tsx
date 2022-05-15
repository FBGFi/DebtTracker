import React, { useState, useContext } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { ScreenProps, ReactComponentProps } from "../../constants/types";
import { DebtHoldersContext, useAddDebtHolder, DebtsContext, useSwitchDebtPaidState } from "../../context";
import { DebtHolderCard } from "./DebtHolderCard";
import { AddNewButton, CustomModal } from "../../components";
import { DebtPickerCard } from "./DebtPickerCard";

interface DebtHoldersScreenProps extends ScreenProps {
    id: string;
}

interface DebtHoldersModalProps extends ReactComponentProps {
    debtHolderId: string;
    setModal: (modal: any) => void;
}

const DebtHoldersModal = (props: DebtHoldersModalProps) => {
    const { state } = useContext(DebtHoldersContext);
    const debtsState = useContext(DebtsContext).state;
    return <CustomModal
        setModal={() => {
            props.setModal(null);
        }}
        title={state[props.debtHolderId].name}>
        {Object.keys(state[props.debtHolderId].debts).map(key => {
            // TODO calculate the amount of debt per person
            if (debtsState[key].debtHolders.includes(props.debtHolderId)) {
                return (<DebtPickerCard
                    key={key}
                    debtId={key}
                    debtHolderId={props.debtHolderId} />);
            }
        })}
    </CustomModal>
}

export const DebtHoldersScreen = (props: DebtHoldersScreenProps) => {
    const [modal, setModal] = useState<any>(null);
    const [addDebtHolder] = useAddDebtHolder();
    const { state } = useContext(DebtHoldersContext);

    // const renderHolderDebts: any = (key: string) => {
    //     return debtsState[key].items.map((item: any) => <View key={item.description}>
    //         <Text>{item.description}</Text>
    //         <Text>{item.price} {item.currency}</Text>
    //     </View>);
    // }

    const viewDebtHolder = (debtHolderId: string) => {
        setModal(<DebtHoldersModal debtHolderId={debtHolderId} setModal={setModal} />);
    }
    return (
        <>
            {modal}
            <ScrollView>
                <View style={{ paddingBottom: 70 }}>
                    {Object.keys(state).map(key => <DebtHolderCard key={key} debtHolderId={key} viewDebtHolder={() => viewDebtHolder(key)} />)}
                </View>
            </ScrollView>
            <AddNewButton onPress={() => addDebtHolder({ name: "Niko " + Object.keys(state).length, debts: {} })} />
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