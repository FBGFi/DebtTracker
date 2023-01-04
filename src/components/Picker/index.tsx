import CheckBox from "@react-native-community/checkbox";
import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Text,
  TouchableOpacity,
} from "react-native";
import { ReactComponentProps } from "../../constants/types";
import { Colors } from "../../styles/colors";

type TPickerEntry = {
  id: string;
  value?: boolean;
  label: string;
};

interface PickerEntryProps extends ReactComponentProps {
  data: TPickerEntry;
  onValueChange: (id: string, value: boolean) => void;
  onPress: (id: string) => void;
}

const PickerEntry = (props: PickerEntryProps) => {
  const getPickerTintColor = () => {
    return {
      true: props.data.value ? Colors.paidColor : Colors.unPaidColor,
      false: Colors.lightText,
    };
  };

  const getPickerTextStyle = () => {
    if (props.data.value !== undefined) {
      return [
        styles.pickerText,
        {
          color: props.data.value ? Colors.paidColor : Colors.unPaidColor,
        },
      ];
    }
    return styles.pickerText;
  };

  const getPickerWrapperStyle = () => {
    if (props.data.value !== undefined) {
      return [
        styles.pickerWrapper,
        {
          borderColor: props.data.value ? Colors.paidColor : Colors.unPaidColor,
        },
      ];
    }
    return styles.pickerWrapper;
  };

  return (
    <TouchableOpacity
      disabled={props.data.value === undefined}
      onPress={() => props.onPress(props.data.id)}>
      <View style={getPickerWrapperStyle()}>
        <Text style={getPickerTextStyle()}>{props.data.label}</Text>
        <CheckBox
          tintColors={getPickerTintColor()}
          value={props.data.value !== undefined}
          onChange={() =>
            props.onValueChange(props.data.id, props.data.value === undefined)
          }
        />
      </View>
    </TouchableOpacity>
  );
};

interface PickerProps extends ReactComponentProps {
  style?: StyleProp<ViewStyle>;
  data: TPickerEntry[];
  onValueChange: (id: string, value: boolean) => void;
  onPress: (id: string) => void;
}

export const Picker = (props: PickerProps) => {
  return (
    <View style={[styles.wrapper, props.style]}>
      <ScrollView>
        {props.data.map((entry) => (
          <PickerEntry
            key={entry.id}
            onPress={props.onPress}
            data={entry}
            onValueChange={props.onValueChange}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.darkestBlue,
    flex: 1,
  },
  pickerWrapper: {
    flexDirection: "row",
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
    borderColor: Colors.orange,
    margin: 5,
    justifyContent: "space-between",
  },
  pickerText: {
    color: Colors.lightText,
    fontSize: 24,
    fontFamily: "Quicksand-Medium",
  },
});
