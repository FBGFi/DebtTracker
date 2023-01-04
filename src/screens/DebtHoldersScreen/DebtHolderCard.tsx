import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableCard } from "../../components";
import { DebtHoldersContext } from "../../context";
import { Colors } from "../../styles/colors";

interface DebtHolderCardProps {
  debtHolderId: string;
  viewDebtHolder: (debtId: string) => void;
}
export const DebtHolderCard = (props: DebtHolderCardProps) => {
  const { state } = useContext(DebtHoldersContext);
  if (!state[props.debtHolderId]) return null;

  return (
    <TouchableCard
      onPress={() => props.viewDebtHolder(props.debtHolderId)}
      style={styles.debtHolderCard}>
      <Text style={styles.title}>{state[props.debtHolderId].name}</Text>
    </TouchableCard>
  );
};

const styles = StyleSheet.create({
  debtHolderCard: {},
  title: {
    fontSize: 20,
    fontFamily: "Quicksand-Medium",
    flex: 2,
    color: Colors.lightText,
  },
});
