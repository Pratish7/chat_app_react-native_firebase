import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import colors from '../../utility/colors/colors';
import globalStyle from '../../utility/style/globalStyle';
import Logo from '../../component/logo/logo'
import InputField from '../../component/input/input';
import Button from '../../component/button/button';

const Signup = ({ navigation }) => {
    const [credentials, setCreadentials] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = credentials;

    const onChangeHandeler = (name, value) => {
        setCreadentials({
            ...credentials,
            [name]: value
        });

    };

    const signupPressHandeler = () => {
        if (!name) alert('Name can\'t be blank');
        else if (!email) alert('Email can\'t be blank');
        else if (!password) alert('Password can\'t be blank');
        else if (!confirmPassword) alert('Confirm Password can\'t be blank');
        else if (password !== password) alert('Passwords didn\'t match')
        else alert(JSON.stringify(credentials));
    }


    return (
        <SafeAreaView style={[globalStyle.flex1, { backgroundColor: colors.BLACK }]}>
            <View style={[globalStyle.containerCentered]} >
                <Logo />
            </View>
            <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
                <InputField
                    placeholder='Name'
                    value={name}
                    onChangeText={(text) => onChangeHandeler('name', text)}
                />
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
                <InputField
                    placeholder='Confirm password'
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={(text) => onChangeHandeler('confirmPassword', text)}
                />
                <Button title='Sign Up' onPress={() => signupPressHandeler()} />
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: colors.LIGHT_GREEN
                }}
                    onPress={() => navigation.navigate('Login')}>
                    Login
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default Signup;