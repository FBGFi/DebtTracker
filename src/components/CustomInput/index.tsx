import React from 'react';
import { ViewStyle, TextInput, TouchableWithoutFeedback, View, StyleProp, TextStyle, NativeSyntheticEvent, TextInputFocusEventData, TextInputChangeEventData } from "react-native";
import { ReactComponentProps } from "../../constants/types";

interface CustomInputProps extends ReactComponentProps {
    wrapperStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<TextStyle>;
    defaultValue?: string;
    onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    keyboardType?: "numeric";
}

export const CustomInput = (props: CustomInputProps) => {
    const inputRef = React.useRef<any>(null);

    const focusInput = () => {
        inputRef.current.focus()
    }

    return (
        <TouchableWithoutFeedback delayPressIn={50} onPress={focusInput}>
            <View style={props.wrapperStyle}>
                <View pointerEvents={"none"}>
                    <TextInput
                        style={props.style}
                        ref={inputRef}
                        defaultValue={props.defaultValue}
                        onChange={props.onChange}
                        onBlur={props.onBlur}
                        keyboardType={props.keyboardType}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}