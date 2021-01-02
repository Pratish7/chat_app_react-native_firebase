import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import colors from '../../utility/colors/colors';
import globalStyle from '../../utility/style/globalStyle';
import Logo from '../../component/logo/logo'
import InputField from '../../component/input/input';
import Button from '../../component/button/button';

const login = ({ navigation }) => {
    const [credentials, setCreadentials] = useState({
        email: '',
        password: ''
    });

    const { email, password } = credentials;

    const onChangeHandeler = (name, value) => {
        setCreadentials({
            ...credentials,
            [name]: value
        });

    };

    const loginPressHandeler = () => {
        if (!email) alert('Email can\'t be blank');
        else if (!password) alert('Password can\'t be blank');
        else alert(JSON.stringify(credentials));
    }



    return (
        <SafeAreaView style={[globalStyle.flex1, { backgroundColor: colors.BLACK }]}>
            <View style={[globalStyle.containerCentered]} >
                <Logo />
            </View>
            <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
                <InputField
                    placeholder='Email'
                    value={email}
                    onChangeText={(text) => onChangeHandeler('email', text)}
                />
                <InputField
                    placeholder='Password'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => onChangeHandeler('password', text)}
                />
                <Button title='Login' onPress={() => loginPressHandeler()} />
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: colors.LIGHT_GREEN
                }}
                    onPress={() => navigation.navigate('Signup')}>
                    Sign Up
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default login;