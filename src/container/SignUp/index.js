import React, { useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { globalStyle, color } from '../../utility'
import { Logo, InputField, RoundCornerButton, FieldInput } from "../../component";

const SignUp = ({ navigation }) => {

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        name: '',
        confirmPassword: ''
    });
    const { email, password, name, confirmPassword } = credentials;

    const onSignUpPress = () => {
        if (!name) {
            alert('Name is required!')
        } else if (!email) {
            alert('Email is required!')
        } else if (!password) {
            alert('Password is required!')
        } else if (password != confirmPassword) {
            alert('Password did not match!')
        } else {
            alert(JSON.stringify(credentials));
        }
    };

    const handleOnChange = (name, value) => {
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    return (
        <SafeAreaView
            style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}
        >
            <View style={[globalStyle.containerCentered]}>
                <Logo />
                <InputField
                    placeholder="Enter name"
                    value={name}
                    onChangeText={(text) => handleOnChange('name', text)}

                />
                <InputField
                    placeholder="Enter email"
                    value={email}
                    onChangeText={(text) => handleOnChange('email', text)}

                />
                <InputField
                    placeholder="Enter password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => handleOnChange('password', text)}

                />
                <InputField
                    placeholder="Confirm password"
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={(text) => handleOnChange('confirmPassword', text)}

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

    )
}

export default SignUp

