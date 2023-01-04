import React, { useMemo, useState, useEffect } from "react";
import {
  Animated,
  TouchableOpacity,
  Text,
  View,
  ViewStyle,
  StyleProp,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { ReactComponentProps } from "../../constants/types";
import { Colors } from "../../styles/colors";

interface CustomButtonProps extends ReactComponentProps {
  title?: string;
  style?: StyleProp<ViewStyle>;
  touchableStyle?: StyleProp<any>;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  flex?: number;
  onPressAlertText?: string;
}

const FadeInAlert = (props: {
  opacity: Animated.Value | number;
  onPressAlertText: string;
}) => {
  return (
    <Animated.View
      style={{
        opacity: props.opacity,
        position: "absolute",
        top: -20,
        minWidth: 70,
      }}
      pointerEvents="none">
      <Text
        style={{
          textAlign: "center",
          color: Colors.lightText,
          fontFamily: "Quicksand-Medium",
          fontSize: 14,
        }}>
        {props.onPressAlertText}
      </Text>
    </Animated.View>
  );
};

export const CustomButton = (props: CustomButtonProps) => {
  const [fadeAnimation, setFadeAnimation] = useState<any>(0);

  const combineStyles = (): any => {
    if (props.disabled) {
      return [styles.wrapperDisabled, props.style];
    } else {
      return [styles.wrapper, props.style];
    }
  };

  const onPress = (event: GestureResponderEvent) => {
    console.log("press");

    if (props.onPress) {
      props.onPress(event);
    }
    if (props.onPressAlertText) {
      setFadeAnimation(new Animated.Value(1));
    }
  };

  useEffect(() => {
    if (fadeAnimation !== 0) {
      Animated.timing(fadeAnimation, {
        useNativeDriver: true,
        toValue: 0,
        duration: 1500,
      }).start();
      setTimeout(() => setFadeAnimation(0), 1500);
    }
  }, [fadeAnimation]);

  const memoizedStyles = useMemo(combineStyles, [props.style, props.disabled]);
  return (
    <TouchableOpacity
      delayPressIn={50}
      activeOpacity={0.6}
      onPress={onPress}
      style={[props.touchableStyle, { flex: props.flex }]}>
      <View style={memoizedStyles}>
        {props.title ? (
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Quicksand-SemiBold",
              color: Colors.lightText,
            }}>
            {props.title}
          </Text>
        ) : (
          props.children
        )}
        {props.onPressAlertText ? (
          <FadeInAlert
            opacity={fadeAnimation}
            onPressAlertText={props.onPressAlertText}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    backgroundColor: Colors.darkestBlue,
    borderWidth: 3,
    borderColor: Colors.orange,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapperDisabled: {},
});
