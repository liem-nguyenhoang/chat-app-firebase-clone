import React, { useLayoutEffect } from 'react'
import { Alert, SafeAreaView, Text } from 'react-native'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { color } from "../../utility";

const Dashboard = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <SimpleLineIcon name='logout' size={26} color={color.WHITE}
                    style={{ right: 10 }}
                    onPress={() => {
                        Alert.alert('logout',
                            'Are you sure to logout',
                            [
                                {
                                    text: 'Yes',
                                    onPress: () => alert('Logged out'),
                                },
                                {
                                    text: 'No'
                                }
                            ],
                            {
                                cancelable: false,
                            })
                    }}
                />
            )
        });
    })
    return (
        <SafeAreaView>
            <Text>Dashboard</Text>
        </SafeAreaView>
    )
}

export default Dashboard
