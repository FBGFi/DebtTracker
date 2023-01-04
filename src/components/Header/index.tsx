import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../../styles/colors";
import { CustomButton, SettingsModal } from "../index";
import { SettingsIcon } from "../../assets";

export const Header = (props: any) => {
  const [modal, setModal] = useState<any>(null);

  const openSettingsModal = () => {
    setModal(<SettingsModal setModal={setModal} />);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.route.name}</Text>
      <CustomButton
        onPress={() => openSettingsModal()}
        style={{ padding: 0, borderWidth: 0, marginTop: 4 }}>
        <SettingsIcon width="24" height="24" fill={Colors.orange} />
      </CustomButton>
      {modal}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkestBlue,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 100,
    zIndex: 100,
  },
  title: {
    color: Colors.orange,
    fontSize: 24,
  },
});
