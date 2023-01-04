import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Colors } from "../../styles/colors";

// copy paste ftw
export const BottomNavigation = ({ state, descriptors, navigation }: any) => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: Colors.darkestBlue,
        borderTopWidth: 3,
        borderColor: Colors.darkestBlue,
      }}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}>
            <View
              style={{
                padding: 20,
                backgroundColor: isFocused ? Colors.dark : undefined,
              }}>
              <Text
                style={{
                  color: isFocused ? Colors.orange : Colors.lightText,
                  fontSize: 20,
                  textAlign: "center",
                }}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
