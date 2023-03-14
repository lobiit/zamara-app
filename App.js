import React, { useState } from 'react';
import {Text, View, TextInput, Button, TouchableOpacity, Pressable, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StaffScreen from './screens/StaffScreen';
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";

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
function Menu({ handleLogout, navigation }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const navigateToScreen = (screenName) => {
        setMenuOpen(false);
        navigation.navigate(screenName);
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: 'black' }}>
            <Pressable onPress={() => setMenuOpen(!menuOpen)}>
                <Image
                    source={require('./assets/menu.png')}
                    style={{ width: 30, height: 30 }}
                />
            </Pressable>
            {menuOpen && (
                <View style={{ position: 'absolute', top: 40, left: 0, borderWidth: 1, borderColor: 'black' }}>
                    <Pressable onPress={() => navigateToScreen('Dashboard')}>
                        <Text style={{ padding: 10 }}>Home</Text>
                    </Pressable>
                    <Pressable onPress={() => navigateToScreen('Staff')}>
                        <Text style={{ padding: 10 }}>Staff</Text>
                    </Pressable>
                    <Pressable onPress={() => navigateToScreen('Continents')}>
                        <Text style={{ padding: 10 }}>Continents</Text>
                    </Pressable>
                    <Pressable onPress={handleLogout}>
                        <Text style={{ padding: 10 }}>Sign Out</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}

export default function App() {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!loggedIn ? (
                    <Stack.Screen
                        name="Login"
                        options={{ title: 'Login' }}
                    >
                        {() => <LoginScreen setUser={setUser} setLoggedIn={setLoggedIn} />}
                    </Stack.Screen>
                ) : (
                    <>
                        <Stack.Screen
                            name="Dashboard"
                            options={{ title: 'ZAMARA APP',
                                headerTitleAlign: 'center',
                                 headerLeft: () => <Menu handleLogout={() => setLoggedIn(false)} /> }}
                        >
                            {() => <DashboardScreen user={user} />}
                        </Stack.Screen>
                        <Stack.Screen
                            name="Staff"
                            component={StaffScreen}
                            options={{ title: 'Staff' }}
                        />
                        <Stack.Screen
                            name="Continents"
                            component={ContinentsScreen}
                            options={{ title: 'Continents' }}
                        />
                        <Stack.Screen
                            name="Email"
                            component={EmailScreen}
                            options={{ title: 'Email' }}
                        />
                        <Stack.Screen
                            name="Logout"
                            options={{ title: 'Logout' }}
                        >
                            {() => <Menu handleLogout={() => setLoggedIn(false)} />}
                        </Stack.Screen>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
