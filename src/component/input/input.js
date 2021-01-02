import React from "react";
import { TextInput } from "react-native";
import colors from "../../utility/colors/colors";
import styles from "./styles";


export default ({
    placeholder,
    inputStyle,
    placeholderTextColor,
    secureTextEntry,
    onChangeText,
    value,
    onSubmitEditing,
    onBlur,
    onFocus,
    numberOfLines,
}) => (
    <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        numberOfLines={numberOfLines}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : colors.WHITE
        }
        onSubmitEditing={onSubmitEditing}
        onBlur={onBlur}
        onFocus={onFocus}
    />
);