import React, { useState, useContext } from 'react';
import { SafeAreaView, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import { globalStyle, color } from '../../utility';
import { Logo, InputField, RoundCornerButton, FieldInput } from "../../component";
import { Store } from "../../context/store";
import { LOADING_START, LOADING_STOP } from '../../context/actions/type';
import { SignUpRequest, AddUser } from "../../network";
import { setAsyncStorage, keys } from "../../asyncStorage";
import firebase from '../../firebase/config'
import { keyboardVerticalOffset, setUniqueValue } from '../../utility/constants';

const SignUp = ({ navigation }) => {
    const globalState = useContext(Store);
    const { dispatchLoaderAction } = globalState;

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        name: '',
        confirmPassword: '',
    });
    const { email, password, name, confirmPassword } = credentials;
    const [logo, toggleLogo] = useState(true);

    const onSignUpPress = () => {
        if (!name) {
            alert('Name is required!');
        } else if (!email) {
            alert('Email is required!');
        } else if (!password) {
            alert('Password is required!');
        } else if (password != confirmPassword) {
            alert('Password did not match!');
        } else {
            dispatchLoaderAction({
                type: LOADING_START,
            });
            // setTimeout(() => {
            SignUpRequest(email, password)
                .then((res) => {
                    if (!res.additionalUserInfo) { // Dùng để  kiểm tra email user đã tồn tại chưa
                        dispatchLoaderAction({
                            type: LOADING_STOP,
                        });
                        alert(res);
                        return;
                    }
                    let uid = firebase.auth().currentUser.uid;
                    let profileImg = '';
                    AddUser(name, email, uid, profileImg)
                        .then(() => {
                            setAsyncStorage(keys.uuid, uid);
                            setUniqueValue(uid);
                            dispatchLoaderAction({
                                type: LOADING_STOP,
                            })
                            navigation.replace('Dashboard');
                        })
                        .catch((err) => {
                            dispatchLoaderAction({
                                type: LOADING_STOP,
                            });
                            alert(err);
                        })
                })
                .catch((err) => {
                    dispatchLoaderAction({
                        type: LOADING_STOP,
                    });
                    alert(err);
                });
            // }, 424982);
        };
    };

    const handleOnChange = (name, value) => {
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const handleFocus = () => {
        setTimeout(() => {
            toggleLogo(false)
        }, 200);
    }
    const handleBlur = () => {
        setTimeout(() => {
            toggleLogo(true)
        }, 200);
    }
    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={keyboardVerticalOffset}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}
        >
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
            >
                <SafeAreaView
                    style={{ flex: 1, backgroundColor: color.BLACK }}
                >
                    {logo && (
                        <View style={globalStyle.containerCentered}>
                            <Logo />
                        </View>
                    )}
                    <View style={[globalStyle.flex2, globalStyle.containerCentered]}>
                        <InputField
                            placeholder="Enter name"
                            value={name}
                            onChangeText={(text) => handleOnChange('name', text)}
                            onFocus={() => handleFocus()}
                            onBlur={() => handleBlur()}
                        />
                        <InputField
                            placeholder="Enter email"
                            value={email}
                            onChangeText={(text) => handleOnChange('email', text)}
                            onFocus={() => handleFocus()}
                            onBlur={() => handleBlur()}
                        />
                        <InputField
                            placeholder="Enter password"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => handleOnChange('password', text)}
                            onFocus={() => handleFocus()}
                            onBlur={() => handleBlur()}
                        />
                        <InputField
                            placeholder="Confirm password"
                            secureTextEntry={true}
                            value={confirmPassword}
                            onChangeText={(text) => handleOnChange('confirmPassword', text)}
                            onFocus={() => handleFocus()}
                            onBlur={() => handleBlur()}
                        />
                        <RoundCornerButton title="SignUp" onPress={() => onSignUpPress()} />
                        <Text style={{
                            color: color.LIGHT_GREEN, fontSize: 28,
                            fontWeight: 'bold'
                        }}
                            onPress={() => navigation.navigate('Login')}
                        >Log In</Text>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>


    );
};

export default SignUp;

