import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import Login from '../container/login/login';
import Signup from '../container/signup/signup';
import Dashboard from '../container/dashboard/dashboard';
import colors from '../utility/colors/colors';
import Splash from '../container/splash/splash';
import Chat from '../container/chat/chat';
import ShowFullImg from '../container/showFullImg/showFullImg'

const Stack = createStackNavigator();

function NavContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRoute='Login'
                screenOptions={{
                    headerShown: true,
                    headerStyle: { backgroundColor: colors.DARK_GRAY },
                    headerTintColor: colors.WHITE,
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20
                    }
                }}
            >
                <Stack.Screen
                    name='Splash'
                    component={Splash}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name='Signup'
                    component={Signup}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name='Dashboard'
                    component={Dashboard}
                    options={{
                        title: 'Firechat',
                        headerLeft: null,
                        headerStyle: {
                            backgroundColor: colors.BLUE,
                        },
                    }} />
                <Stack.Screen
                    name='Chat'
                    component={Chat}
                    options={{
                        headerLeft: null,
                        headerStyle: {
                            backgroundColor: colors.DARK_BLUE,
                        }
                    }} />
                <Stack.Screen
                    name='ShowFullImg'
                    component={ShowFullImg}
                    options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}



export default NavContainer;