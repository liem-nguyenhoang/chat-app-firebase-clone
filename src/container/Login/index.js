import React from 'react'
import { SafeAreaView, Text } from 'react-native'

const Login = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text
                onPress={() => navigation.navigate('SignUp')}
            >SignUp</Text>
        </SafeAreaView>
    )
}

export default Login
