import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, SignUp, Dashboard, Splash, ShowFullImg } from "../container";
import { color } from "../utility";

const Stack = createStackNavigator();

function NavContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash"                screenOptions={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: color.DARK_GRAY,
                    },
                    headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: 20,
                    },
                    headerTintColor: color.WHITE,
                    headerTitleAlign: "center",
                }}>
                <Stack.Screen name="Splash" component={Splash}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Login" component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="SignUp" component={SignUp}
                    options={{ headerShown: false }} />
                <Stack.Screen name="Dashboard" component={Dashboard}
                    options={{ headerLeft: null }} />
                <Stack.Screen name="ShowFullImg" component={ShowFullImg}
                    options={{ headerBackTitle: null }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default NavContainer;
