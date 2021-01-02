import React from 'react';
import { SafeAreaView, Text } from 'react-native';

const login = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text onPress={() => navigation.navigate('Signup')}>Login</Text>
        </SafeAreaView>
    );
};

export default login;