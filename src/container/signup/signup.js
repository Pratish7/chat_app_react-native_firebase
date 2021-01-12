import React, { useState, useContext } from 'react';
import { KeyboardAvoidingView, SafeAreaView, Text, View, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
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

    const [credential, setCredential] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [logo, toggleLogo] = useState(true);
    const { email, password, confirmPassword, name } = credential;

    const setInitialState = () => {
        setCredential({ email: "", password: "", confirmPassword: "" });
    };

    const onSignUpPress = () => {
        Keyboard.dismiss();
        if (!name) {
            alert("Name is required");
        } else if (!email) {
            alert("Email is required");
        } else if (!password) {
            alert("Password is required");
        } else if (password !== confirmPassword) {
            alert("Password did not match");
        } else {
            // dispatchLoaderAction({
            //     type: LOADING_START,
            // });
            signupRequest(email, password)
                .then((res) => {
                    if (!res.additionalUserInfo) {
                        // dispatchLoaderAction({
                        //     type: LOADING_STOP,
                        // });
                        alert(res);
                        return;
                    }
                    let uid = firebase.auth().currentUser.uid;
                    let profileImg = "";
                    AddUser(name, email, uid, profileImg)
                        .then(() => {
                            setAsyncStorage(keys.uuid, uid);
                            setUniqueValue(uid);
                            // dispatchLoaderAction({
                            //     type: LOADING_STOP,
                            // });
                            navigation.replace("Dashboard");
                        })
                        .catch((err) => {
                            // dispatchLoaderAction({
                            //     type: LOADING_STOP,
                            // });
                            alert(err);
                        });
                })
                .catch((err) => {
                    // dispatchLoaderAction({
                    //     type: LOADING_STOP,
                    // });
                    alert(err);
                });
        }
    };

    const handleOnChange = (name, value) => {
        setCredential({
            ...credential,
            [name]: value,
        });
    };

    const handleFocus = () => {
        setTimeout(() => {
            toggleLogo(false);
        }, 200);
    };

    const handleBlur = () => {
        setTimeout(() => {
            toggleLogo(true);
        }, 200);
    };

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={keyboardVerticalOffset}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={[globalStyle.flex1, { backgroundColor: colors.WHITE }]}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={{ flex: 1, backgroundColor: colors.WHITE }}>
                    <StatusBar backgroundColor={colors.BLUE} barStyle="light-content" />

                    {
                        logo && (
                            <View style={[globalStyle.containerCentered]}>
                                <Logo />
                            </View>
                        )}
                    <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>

                        <InputField
                            placeholder="Enter name"
                            value={name}
                            onChangeText={(text) => handleOnChange("name", text)}
                            onFocus={() => handleFocus()}
                            onBlur={() => handleBlur()}
                        />

                        <InputField
                            placeholder="Enter email"
                            value={email}
                            onChangeText={(text) => handleOnChange("email", text)}
                            onFocus={() => handleFocus()}
                            onBlur={() => handleBlur()}
                        />

                        <InputField
                            placeholder="Enter password"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => handleOnChange("password", text)}
                            onFocus={() => handleFocus()}
                            onBlur={() => handleBlur()}
                        />

                        <InputField
                            placeholder="Confirm Password"
                            secureTextEntry={true}
                            value={confirmPassword}
                            onChangeText={(text) => handleOnChange("confirmPassword", text)}
                            onFocus={() => handleFocus()}
                            onBlur={() => handleBlur()}
                        />

                        <Button
                            title="Sign Up"
                            onPress={() => onSignUpPress()}
                        />

                        <Text
                            style={{
                                fontSize: 28,
                                fontWeight: "bold",
                                color: colors.BLUE,
                            }}
                            onPress={() => {
                                setInitialState();
                                navigation.navigate("Login");
                            }}
                        >
                            Login
                        </Text>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Signup;