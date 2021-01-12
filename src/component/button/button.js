import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import colors from '../../utility/colors/colors';
import styles from './styles';

export default ({ title, btnStyle, btnTextStyle, onPress }) => (
    <TouchableOpacity style={[styles.btn, btnStyle , { color: colors.WHITE, backgroundColor: colors.BLUE}]} onPress={onPress}>
        <Text style={[styles.text, btnTextStyle, {color: colors.WHITE}]}>{title}</Text>
    </TouchableOpacity>
);