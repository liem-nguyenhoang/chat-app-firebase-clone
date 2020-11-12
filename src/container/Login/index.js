import React, { useState, useContext } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, Text, View, TouchableWithoutFeedback } from 'react-native';
import { globalStyle, color } from '../../utility';
import { Logo, InputField, RoundCornerButton, FieldInput } from "../../component";
import { Store } from "../../context/store";
import { LOADING_START, LOADING_STOP } from "../../context/actions/type";
import { LoginRequest } from "../../network";
import { keys, setAsyncStorage } from '../../asyncStorage';
import { keyboardVerticalOffset, setUniqueValue } from '../../utility/constants';

const Login = ({ navigation }) => {
    const globalState = useContext(Store);
    const { dispatchLoaderAction } = globalState;

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [logo, toggleLogo] = useState(true);
    const { email, password } = credentials;

    const onLoginPress = () => {
        if (!email) {
            alert('Email is required!')
        } else if (!password) {
            alert('Password is required!')
        } else {
            dispatchLoaderAction({
                type: LOADING_START,
            });
            // setTimeout(() => {
            LoginRequest(email, password)
                .then((res) => {
                    if (!res.additionalUserInfo) { // Dùng để  kiểm tra pasword của user
                        dispatchLoaderAction({
                            type: LOADING_STOP,
                        });
                        alert(res);
                        return;
                    }
                    setAsyncStorage(keys.uuid, res.user.uid);
                    setUniqueValue(res.user.uid);
                    dispatchLoaderAction({
                        type: LOADING_STOP,
                    });
                    navigation.replace('Dashboard');
                })
                .catch((err) => {
                    dispatchLoaderAction({
                        type: LOADING_STOP,
                    });
                    alert(err);
                });
            // }, 424982);
        }
    };

    const handleOnChange = (name, value) => {
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const handldFocus = () => {
        setTimeout(() => {
            toggleLogo(false);
        }, 200);
    }

    const handleBlur = () => {
        setTimeout(() => {
            toggleLogo(true);
        }, 200);
    }
    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={keyboardVerticalOffset}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView
                    style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}
                >
                    {logo && (
                        <View style={[globalStyle.containerCentered]}>
                            <Logo />
                        </View>
                    )}
                    <View style={[globalStyle.flex2, globalStyle.containerCentered]}>
                        <InputField
                            placeholder="Enter email"
                            value={email}
                            onChangeText={(text) => handleOnChange('email', text)}
                            onFocus={() => handldFocus()}
                            onBlur={() => handleBlur()}
                        />
                        <InputField
                            placeholder="Enter password"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => handleOnChange('password', text)}
                            onFocus={() => handldFocus()}
                            onBlur={() => handleBlur()}
                        />
                        <RoundCornerButton title="Login" onPress={() => onLoginPress()} />
                        <Text style={{
                            color: color.LIGHT_GREEN, fontSize: 28,
                            fontWeight: 'bold'
                        }}
                            onPress={() => navigation.navigate('SignUp')}
                        >Sign Up</Text>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Login;

