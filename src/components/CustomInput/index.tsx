import React, { useState } from 'react';
import { ViewStyle, TextInput, TouchableWithoutFeedback, View, StyleProp, TextStyle, NativeSyntheticEvent, TextInputFocusEventData, TextInputChangeEventData, TextInputSelectionChangeEventData } from "react-native";
import { ReactComponentProps } from "../../constants/types";

interface CustomInputProps extends ReactComponentProps {
    wrapperStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<TextStyle>;
    defaultValue?: string;
    onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    keyboardType?: "numeric";
    multiline?: boolean;
    overWriteOnSelection?: boolean;
}

export const CustomInput = (props: CustomInputProps) => {
    const inputRef = React.useRef<TextInput>(null);
    const [value, setValue] = useState(props.defaultValue || "");
    const [focused, isFocused] = useState(false);
    const [selection, setSelection] = useState({
        start: props.overWriteOnSelection ? 0 : value.length, 
        end: value.length
    });

    const focusInput = () => {
        if(!focused){
            inputRef.current?.focus();
            isFocused(true);
        }
    }

    const onSelectionChange = (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
        setSelection(e.nativeEvent.selection);
    }

    const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setValue(e.nativeEvent.text);
        props.onChange && props.onChange(e);
    }

    const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        isFocused(false);
        setSelection({
            start: props.overWriteOnSelection ? 0 : value.length, 
            end: value.length
        });
        props.onBlur && props.onBlur(e);
    }
    
    return (
        <TouchableWithoutFeedback disabled={focused} delayPressIn={50} onPress={focusInput}>
            <View style={props.wrapperStyle}>
                <View pointerEvents={!focused ? "none" : "auto"}>
                    <TextInput
                        selection={selection}
                        onSelectionChange={onSelectionChange}
                        style={props.style}
                        multiline={props.multiline !== undefined ? props.multiline : true}
                        ref={inputRef}
                        defaultValue={props.defaultValue}
                        onChange={onChange}
                        onBlur={onBlur}
                        keyboardType={props.keyboardType}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}