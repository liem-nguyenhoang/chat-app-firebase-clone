import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { globalStyle, color } from '../../utility'
import { Logo, InputField, RoundCornerButton, FieldInput } from "../../component";

const Login = ({ navigation }) => {
    return (
        <SafeAreaView
            style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}
        >
            <View style={[globalStyle.containerCentered]}>
                <Logo />
                <InputField placeholder="Enter email" />
                <InputField placeholder="Enter password" secureTextEntry={true} />
                <RoundCornerButton title="Login" />
                <Text style={{
                    color: color.LIGHT_GREEN, fontSize: 28,
                    fontWeight: 'bold'
                }}>Sign Up</Text>
            </View>
        </SafeAreaView>

    )
}

export default Login
