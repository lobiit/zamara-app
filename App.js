import React, { useState,useRef } from 'react';
import {Text, View, TextInput, Button, TouchableOpacity, Pressable, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StaffScreen from './screens/StaffScreen';
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import Menu from './components/menu'
const Stack = createNativeStackNavigator();




function ContinentsScreen() {
    return (
        <View>
            <Text>Continents Screen</Text>
        </View>
    );
}

function EmailScreen() {
    return (
        <View>
            <Text>Email Screen</Text>
        </View>
    );
}


export default function App() {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const navigationRef = useRef(null);

    const handleNavigation = (screenName) => {
        navigationRef.current?.navigate(screenName);
    };

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                {!loggedIn ? (
                    <Stack.Screen name="Login" options={{ title: 'Login' }}>
                        {() => (
                            <LoginScreen setUser={setUser} setLoggedIn={setLoggedIn} />
                        )}
                    </Stack.Screen>
                ) : (
                    <>
                        <Stack.Screen
                            name="Dashboard"
                            options={{
                                title: 'ZAMARA APP',
                                headerTitleAlign: 'center',
                                headerLeft: () => (
                                    <Menu handleLogout={() => setLoggedIn(false)} navigation={navigationRef.current} />
                                ),
                            }}
                        >
                            {() => <DashboardScreen user={user} />}
                        </Stack.Screen>
                        <Stack.Screen
                            name="Staff"
                            options={{ title: 'Staff' }}
                        >
                            {() => <StaffScreen handleNavigation={handleNavigation} />}
                        </Stack.Screen>
                        <Stack.Screen
                            name="Continents"
                            component={ContinentsScreen}
                            options={{ title: 'Continents' }}
                        />
                        <Stack.Screen name="Email" component={EmailScreen} options={{ title: 'Email' }} />
                        <Stack.Screen
                            name="Logout"
                            options={{ title: 'Logout' }}
                        >
                            {() => (
                                <Menu handleLogout={() => setLoggedIn(false)} navigation={navigationRef.current} />
                            )}
                        </Stack.Screen>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}


