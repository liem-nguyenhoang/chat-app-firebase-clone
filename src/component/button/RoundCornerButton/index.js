import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

export default ({ title, btnStyle, btnTextStyle, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.btn, btnStyle]}
            onPress={onPress}>
            <Text style={[styles.text, btnTextStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};
