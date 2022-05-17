import React, { useState, useContext } from "react";
import { GestureResponderEvent } from "react-native";
import { ReactComponentProps } from "../../constants/types";
import { DebtHoldersContext, DebtsContext, useRemoveDebtHolder } from "../../context";
import { CustomButton, CustomModal } from "../../components";
import { DebtPickerCard } from "./DebtPickerCard";

interface DebtHolderModalProps extends ReactComponentProps {
    debtHolderId: string;
    setModal: (modal: any) => void;
}

const RemoveDebtHolder = (props: DebtHolderModalProps) => {
    const [removeDebtHolder] = useRemoveDebtHolder();

    const onPress = () => {
        removeDebtHolder(props.debtHolderId);
        props.setModal(null);
    }

    return <CustomButton onPress={onPress} title="Remove debtholder" />;
}

export const DebtHolderModal = (props: DebtHolderModalProps) => {
    const { state } = useContext(DebtHoldersContext);
    const [focusedDebtId, setFocusedDebtId] = useState<string | undefined>(undefined);
    const debtsState = useContext(DebtsContext).state;

    // This does not trigger if the picker card is clicked, due to it being Touchable
    const onModalPress = (event: GestureResponderEvent) => {
        setFocusedDebtId(undefined);
    }

    const onDebtPickerCardPress = (debtId?: string) => {
        // Handle double pressing
        if(focusedDebtId === debtId) {
            setFocusedDebtId(undefined);
        } else {
            setFocusedDebtId(debtId);
        }
    }

    return <CustomModal
        setModal={() => {
            props.setModal(null);
        }}
        onModalPress={onModalPress}
        outSideContent={RemoveDebtHolder(props)}
        title={state[props.debtHolderId].name}>
        {Object.keys(state[props.debtHolderId].debts).map(key => {
            if (debtsState[key].debtHolders.includes(props.debtHolderId)) {
                return (<DebtPickerCard
                    key={key}
                    onInteract={onDebtPickerCardPress}
                    debtId={key}
                    focusedDebtId={focusedDebtId}
                    debtHolderId={props.debtHolderId} />);
            }
        })}
    </CustomModal>
}