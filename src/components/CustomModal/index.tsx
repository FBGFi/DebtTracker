import React from "react";
import {
  Modal,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from "react-native";
import { ReactComponentProps } from "../../constants/types";
import { CustomButton } from "../index";
import { Colors } from "../../styles/colors";
import { XIcon } from "../../assets";

interface CustomModalProps extends ReactComponentProps {
  setModal: (modal: null) => void;
  title: string;
  outSideContent?: JSX.Element | JSX.Element[] | any;
  multiScreen?: boolean;
  onModalPress?: (event: GestureResponderEvent) => void;
  headerButtons?: JSX.Element | JSX.Element[] | any;
  scrollEnabled?: boolean;
}

export const CustomModal = (props: CustomModalProps) => {
  return (
    <Modal
      animationType="slide"
      onRequestClose={() => {
        props.setModal(null);
      }}>
      <TouchableWithoutFeedback
        disabled={
          props.scrollEnabled !== undefined || !props.onModalPress
            ? !props.scrollEnabled
            : false
        }
        onPress={props.onModalPress}
        touchSoundDisabled={true}>
        <View style={{ backgroundColor: Colors.dark, flex: 1 }}>
          <View style={{ backgroundColor: Colors.darkestBlue }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text
                style={{
                  color: Colors.orange,
                  fontSize: 20,
                  padding: 10,
                  flex: 1,
                }}>
                {props.title}
              </Text>
              <CustomButton
                style={styles.closeButton}
                onPress={() => props.setModal(null)}>
                <View style={{ height: 25, width: 25 }}>
                  <XIcon fill={Colors.orange} />
                </View>
              </CustomButton>
            </View>
            {props.headerButtons ? <View>{props.headerButtons}</View> : null}
          </View>
          <View style={{ position: "relative", flex: 1 }}>
            {!props.multiScreen ? (
              <ScrollView
                scrollEnabled={props.scrollEnabled}
                contentContainerStyle={{ backgroundColor: Colors.dark }}>
                {props.children}
              </ScrollView>
            ) : (
              props.children
            )}
          </View>
          {props.outSideContent}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    borderWidth: 0,
  },
  closeButtonText: {
    fontSize: 20,
    width: 30,
    height: 30,
    position: "absolute",
    top: -1.5,
    left: 5.5,
    zIndex: 10,
    color: Colors.lightText,
  },
});
