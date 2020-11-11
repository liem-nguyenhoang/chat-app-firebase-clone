import React, { useLayoutEffect } from 'react';
import { Alert, SafeAreaView, Text } from 'react-native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import { color } from "../../utility";
import { LogOutUser } from '../../network'
import { clearAsyncStorage } from '../../asyncStorage';

const Dashboard = ({ navigation }) => {

    // Log out user current
    const logout = () => {
        LogOutUser()
            .then(() => {
                clearAsyncStorage()
                    .then(() => {
                        navigation.replace('Login');
                    })
                    .catch((err) => {
                        alert(err);
                    });
            })
            .catch((err) => {
                alert(err);
            });
    };

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
                                    onPress: () => logout(),
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
    });
    return (
        <SafeAreaView>
            <Text>Dashboard</Text>
        </SafeAreaView>
    );
};



export default Dashboard;
