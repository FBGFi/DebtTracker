import React from "react";
import { StyleSheet, View } from "react-native";
import { CustomButton } from "../index";
import { ReactComponentProps } from "../../constants/types";
import { PlusIcon } from "../../assets";

interface AddNewButtonProps extends ReactComponentProps {
  onPress: () => void;
}

export const AddNewButton = (props: AddNewButtonProps) => {
  return (
    <CustomButton
      touchableStyle={styles.touchable}
      style={styles.addButton}
      onPress={props.onPress}>
      <View
        style={{
          height: 25,
          width: 25,
          marginLeft: 2,
          marginTop: 2.5,
          padding: 2,
        }}>
        <PlusIcon />
      </View>
    </CustomButton>
  );
};

const styles = StyleSheet.create({
  touchable: {
    position: "absolute",
    width: 60,
    height: 60,
    right: 15,
    bottom: 15,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: "center",
  },
});
