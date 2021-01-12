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
        style={[styles.input, inputStyle, {borderColor: colors.BLUE, borderWidth: 2, borderRadius:10}]}
        value={value}
        numberOfLines={numberOfLines}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : colors.BLACK
        }
        onSubmitEditing={onSubmitEditing}
        onBlur={onBlur}
        onFocus={onFocus}
    />
);