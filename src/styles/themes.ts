import { DefaultTheme } from "@react-navigation/native";
import { Colors } from "./colors";

export const AppTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.orange,
    card: Colors.darkestBlue,
    text: Colors.orange,
    background: Colors.dark,
    border: Colors.darkestBlue,
  },
};
