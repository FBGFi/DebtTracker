import React, { useContext, useState, useRef } from "react";
import { Dimensions, ScrollView, View, StyleSheet, TextInput, NativeSyntheticEvent, TextInputSubmitEditingEventData, NativeScrollEvent, } from "react-native";
import { CustomModal, DebtItems, TotalAmount, PaidAmount, UserAmount, CustomButton, Picker } from "../../components";
import { useAddDebtHolderToDebt, useRemoveDebtHolderFromDebt, useSwitchDebtPaidState, DebtsContext, useUpdateDebtDescription, useAddItemToDebt, useRemoveDebt, DebtHoldersContext } from "../../context";
import { Colors } from "../../styles/colors";
import { ReactComponentProps } from "../../constants/types";
import { PenIcon, TrashIcon, PlusIcon } from "../../assets";

interface DebtModalProps extends ReactComponentProps {
    debtId: string;
    setModal: (modal: null) => void;
}

interface EditDebtInputProps extends ReactComponentProps {
    onSubmit: (input: string) => void;
    debtName: string;
    onBlur: () => void;
}

const EditDebtInput = (props: EditDebtInputProps) => {
    const [input, setInput] = useState(props.debtName);

    const inputChanged = (e: string) => {
        setInput(e);
    }

    const onSubmitEditing = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        props.onSubmit(input);
    };

    const submit = () => {
        props.onSubmit(input);
    }

    return (<View style={{ flexDirection: "row", marginHorizontal: 0, marginBottom: 10, marginTop: 5 }}>
        <View style={{
            flex: 5,
            paddingHorizontal: 10,
            borderTopWidth: 3,
            borderBottomWidth: 3,
            borderLeftWidth: 3,
            borderColor: Colors.orange
        }}>
            <TextInput style={{
                color: Colors.lightText,
                fontSize: 20,
                fontFamily: "Quicksand-Medium",
            }} onBlur={props.onBlur} value={input} onChangeText={inputChanged} onSubmitEditing={onSubmitEditing} autoFocus={true} />
        </View>
        <CustomButton style={{ flex: 1 }} title="Save" onPress={() => submit()} />
    </View>)
}

interface EditButtonsProps extends DebtModalProps {
    setEditActive: (active: boolean) => void;
}

const EditButtons = (props: EditButtonsProps) => {
    const [addItemToDebt] = useAddItemToDebt();
    const [removeDebt] = useRemoveDebt();

    const onRemoveDebt = () => {
        props.setModal(null);
        removeDebt(props.debtId);
    }

    return (
        <View style={{ position: "relative", flexDirection: "column", padding: 5 }}>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <CustomButton style={styles.editButton} onPress={onRemoveDebt}>
                    <View style={{ height: 25, width: 25 }}>
                        <TrashIcon />
                    </View>
                </CustomButton>
                <CustomButton style={styles.editButton} onPress={() => addItemToDebt(props.debtId, {
                    description: "-",
                    price: 0,
                })}>
                    <View style={{ height: 25, width: 25 }}>
                        <PlusIcon />
                    </View>
                </CustomButton>
                <CustomButton style={styles.editButton} onPress={() => props.setEditActive(true)}>
                    <View style={{ height: 25, width: 25 }}>
                        <PenIcon />
                    </View>
                </CustomButton>
            </View>
        </View>
    );
}

interface PricesProps extends ReactComponentProps {
    debtId: string;
    editActive: boolean;
    setEditActive: (active: boolean) => void;
}

const Prices = (props: PricesProps) => {
    const { state } = useContext(DebtsContext);
    const [updateDebtDescription] = useUpdateDebtDescription();

    const onEditSubmit = (input: string) => {
        props.setEditActive(false);
        updateDebtDescription(props.debtId, input);
    }

    return (
        <View style={{ backgroundColor: Colors.darkestBlue, padding: 5 }}>
            <UserAmount debtId={props.debtId} />
            <PaidAmount debtId={props.debtId} />
            <TotalAmount debtId={props.debtId} />
            {props.editActive && <EditDebtInput onBlur={() => props.setEditActive(false)} debtName={state[props.debtId].description} onSubmit={onEditSubmit} />}
        </View>
    );
}

const PickerSwiper = (props: { debtId: string }) => {
    const debtHoldersState = useContext(DebtHoldersContext).state;
    const swiperRef = useRef<any>(null);
    const [page, setPage] = useState<0 | 1>(0);
    const [switchDebtPaidState] = useSwitchDebtPaidState();
    const [addDebtHolderToDebt] = useAddDebtHolderToDebt();
    const [removeDebtHolderFromDebt] = useRemoveDebtHolderFromDebt();

    const onPickerCheck = (debtHolderId: string, value: boolean) => {
        if (value) {
            addDebtHolderToDebt(props.debtId, debtHolderId);
        } else {
            removeDebtHolderFromDebt(props.debtId, debtHolderId);
        }
    }

    const onPickerPress = (debtHolderId: string) => {
        if (debtHoldersState[debtHolderId].debts[props.debtId] !== undefined) {
            switchDebtPaidState(debtHolderId, props.debtId);
        }
    }

    const getPickerEntries = () => {
        return Object.entries(debtHoldersState).map(([debtHolderId, debtHolder]) => {
            return {
                id: debtHolderId,
                value: debtHolder.debts[props.debtId],
                label: debtHolder.name,
            };
        });
    }

    const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const xOffset = e.nativeEvent.contentOffset.x;
        const screenWidth = Dimensions.get('window').width;
        
        // Scroll to right
        if((xOffset >= screenWidth * 0.3 && page === 0) || xOffset > screenWidth * 0.7){
            swiperRef.current.scrollTo({y: 0, x: screenWidth});
            setPage(1);
        } else {
            swiperRef.current.scrollTo({y: 0, x: 0});
            setPage(0);
        }
    }

    return (
        <View style={styles.pickerSwiperWrapper}>
            <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}
                decelerationRate={0.1}
                ref={swiperRef}
                onScrollEndDrag={onScrollEnd}>
                <ScrollView contentContainerStyle={{ backgroundColor: Colors.dark }}>
                    <View style={{ paddingHorizontal: 5, width: Dimensions.get('window').width }}>
                        <DebtItems debtId={props.debtId} editable />
                    </View>
                </ScrollView>
                <Picker
                    style={{ width: Dimensions.get('window').width }}
                    data={getPickerEntries()}
                    onPress={onPickerPress}
                    onValueChange={onPickerCheck} />
            </ScrollView>
        </View>
    );
}

export const DebtModal = (props: DebtModalProps) => {
    const { state } = useContext(DebtsContext);
    const [editActive, setEditActive] = useState(false);

    return (
        <CustomModal
            setModal={props.setModal}
            outSideContent={<Prices debtId={props.debtId} editActive={editActive} setEditActive={setEditActive} />}
            title={state[props.debtId].description}
            headerButtons={<EditButtons setEditActive={setEditActive} debtId={props.debtId} setModal={props.setModal} />}
            multiScreen
            scrollEnabled={false}>
            <PickerSwiper debtId={props.debtId} />
        </CustomModal>);
}

const styles = StyleSheet.create({
    pickerSwiperWrapper: {
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
    },
    editButton: {
        paddingHorizontal: 5,
        paddingVertical: 3,
        marginLeft: 5,
        borderWidth: 0
    }
});