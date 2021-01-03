import React, { useState, useContext } from 'react';
import { KeyboardAvoidingView, SafeAreaView, Text, View } from 'react-native';
import colors from '../../utility/colors/colors';
import globalStyle from '../../utility/style/globalStyle';
import Logo from '../../component/logo/logo'
import InputField from '../../component/input/input';
import Button from '../../component/button/button';
import signupRequest from '../../network/signup/signup';
import { LOADING_STOP } from '../../context/actions/type';
import { Store } from '../../context/store/store';
import firebase from '../../firebase/firebase';
import { AddUser } from '../../network/adduser/adduser';
import { keys, setAsyncStorage } from '../../asyncStorage/async'
import { setUniqueValue } from '../../utility/constants/constants';
import { keyboardVerticalOffset } from '../../utility/constants/constants';

const Signup = ({ navigation }) => {

    // const globalState = useContext(Store);
    // const { dispatchLoaderAction } = globalState;

    const [showLogo, toggleLogo] = useState(true);

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
        else {
            // dispatchLoaderAction({
            //     type: LOADING_START
            // });
            signupRequest(email, password)
                .then(() => {
                    let uid = firebase.auth().currentUser.uid;
                    let profileImage = '';
                    AddUser(name, email, uid, profileImage)
                        .then((res) => {
                            if (!res.additonalUserInfo) {
                                // dispathLoaderAction({
                                //     type: LOADING_STOP
                                // });
                                alert(res);
                                return;
                            }
                            setAsyncStorage(keys.uuid, uid);
                            setUniqueValue(uid);
                            // dispathLoaderAction({
                            //     type: LOADING_STOP
                            // });
                            navigation.replace('Dashboard');
                        })
                        .catch((err) => {
                            // dispathLoaderAction({
                            //     type: LOADING_STOP
                            // });
                            alert(err);
                        })
                })
                .catch((err) => {
                    // dispathLoaderAction({
                    //     type: LOADING_STOP
                    // });
                    alert(err);
                })
        }
    }

    const focusHandeler = () => {
        setTimeout(() => {
            toggleLogo(false);
        }, 200);
    }

    const blurHandeler = () => {
        setTimeout(() => {
            toggleLogo(true);
        }, 200);
    }

    return (
        <KeyboardAvoidingView
            style={[globalStyle.flex1, { backgroundColor: colors.BLACK }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={keyboardVerticalOffset}
        >
            {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
            <SafeAreaView style={[globalStyle.flex1, { backgroundColor: colors.BLACK }]}>
                {
                    showLogo && (
                        <View style={[globalStyle.containerCentered]} >
                            <Logo />
                        </View>
                    )
                }
                <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
                    <InputField
                        placeholder='Name'
                        value={name}
                        onChangeText={(text) => onChangeHandeler('name', text)}
                        onFocus={() => focusHandeler()}
                        onBlur={() => blurHandeler()}
                    />
                    <InputField
                        placeholder='Email'
                        value={email}
                        onChangeText={(text) => onChangeHandeler('email', text)}
                        onFocus={() => focusHandeler()}
                        onBlur={() => blurHandeler()}
                    />
                    <InputField
                        placeholder='Password'
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => onChangeHandeler('password', text)}
                        onFocus={() => focusHandeler()}
                        onBlur={() => blurHandeler()}
                    />
                    <InputField
                        placeholder='Confirm password'
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={(text) => onChangeHandeler('confirmPassword', text)}
                        onFocus={() => focusHandeler()}
                        onBlur={() => blurHandeler()}
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
            {/* </TouchableWithoutFeedback> */}
        </KeyboardAvoidingView>

    );
};

export default Signup;