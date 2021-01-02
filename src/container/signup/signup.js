import React from 'react';
import { SafeAreaView, Text } from 'react-native';

const signup = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text onPress={() => navigation.navigate('Dashboard')}>Sign up</Text>
        </SafeAreaView>
    );
};

export default signup;