import React, { useState, useContext } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import colors from '../../utility/colors/colors';
import globalStyle from '../../utility/style/globalStyle';
import Logo from '../../component/logo/logo'
import InputField from '../../component/input/input';
import Button from '../../component/button/button';
import { LOADING_START } from '../../context/actions/type';
import { Store } from '../../context/store/store';
import loginRequest from '../../network/login/login';
import { keys, setAsyncStorage } from '../../asyncStorage/async';
import { setUniqueValue } from '../../utility/constants/constants';

const login = ({ navigation }) => {

    // const globalState = useContext(Store);
    // const { dispatchLoaderAction } = globalState;

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
        else {
            // dispatchLoaderAction({
            //     type: LOADING_START
            // });
            loginRequest(email, password)
                .then((res) => {
                    setAsyncStorage(keys.uuid, res.user.uid);
                    setUniqueValue(res.user.uid);
                    // dispatchLoaderAction({
                    //     type: LOADING_STOP
                    // });
                    navigation.replace('Dashboard');
                })
                .catch((err) => {
                    // dispatchLoaderAction({
                    //     type: LOADING_STOP
                    // });
                    alert(err);
                })
        }
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