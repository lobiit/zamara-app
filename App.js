import React, { useState } from 'react';
import {Text, View, TextInput, Button, TouchableOpacity, Pressable, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function LoginScreen({ setUser, setLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {

            // Log in to the user account
            const loginResponse = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            console.log(username, password);

            if (loginResponse.ok) {
                const data = await loginResponse.json();
                console.log(data)
                const user = { username };
                setUser(user);
                setLoggedIn(true);
            } else {
                throw new Error('Invalid username or password');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}


function DashboardScreen({ user }) {
    return (
        <View style={{ padding: 20, alignItems: 'center' }}>
            <View
                style={{
                    marginTop: 20,
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderWidth: 1,
                    padding: 10,
                    width: '100%',
                }}
            >
                <Image
                    source={{ uri: user.image }}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                />
                <Text style={{ marginLeft: 10, fontSize: 20 }}>
                    Welcome{' '}
                    <Text style={{ fontWeight: 'bold' }}>
                        {user.firstName} {user.lastName}
                    </Text>
                </Text>
                <Text style={{ fontSize: 20, marginTop: 10 }}>
                    Your profile details are as follows:
                </Text>
            </View>

            <Text style={{ fontSize: 18, marginTop: 10 }}>
                Age: <Text style={{ fontWeight: 'bold' }}>{user.age}</Text>
            </Text>
            <Text style={{ fontSize: 18 }}>
                Gender: <Text style={{ fontWeight: 'bold' }}>{user.gender}</Text>
            </Text>
            <Text style={{ fontSize: 18, fontFamily: 'System' }}>
                Email:{' '}
                <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                    {user.email}
                </Text>
            </Text>
            <Text style={{ fontSize: 18 }}>
                Phone: <Text style={{ fontWeight: 'bold' }}>{user.phone}</Text>
            </Text>
            <Text style={{ fontSize: 18 }}>
                Birth Date: <Text style={{ fontWeight: 'bold' }}>{user.birthDate}</Text>
            </Text>
            <Text style={{ fontSize: 18 }}>
                Blood Group: <Text style={{ fontWeight: 'bold' }}>{user.bloodGroup}</Text>
            </Text>
            <Text style={{ fontSize: 18 }}>
                Height: <Text style={{ fontWeight: 'bold' }}>{user.height}</Text>
            </Text>
            <Text style={{ fontSize: 18 }}>
                Weight: <Text style={{ fontWeight: 'bold' }}>{user.weight}</Text>
            </Text>
            <Text style={{ fontSize: 18 }}>
                Eye Color: <Text style={{ fontWeight: 'bold' }}>{user.eyeColor}</Text>
            </Text>
        </View>
    );
}
function StaffScreen() {
    return (
        <View>
            <Text>Staff Screen</Text>
        </View>
    );
}

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
                            options={{ title: 'Dashboard' }}
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

// export default function App() {
//     const [loggedIn, setLoggedIn] = useState(false);
//     const [user, setUser] = useState(null);
//
//     const handleLogout = () => {
//         // perform logout logic here
//         setLoggedIn(false);
//     };
//
//     const handleLoginSuccess = async (response) => {
//         try {
//             const userResponse = await fetch('https://dummyjson.com/users');
//             const userList = await userResponse.json();
//             const { username } = response;
//
//             // Find the user with the matching username
//             const matchedUser = userList.find((user) => user.username === username);
//
//             // Extract necessary user details
//             const user = {
//                 id: matchedUser.id,
//                 firstName: matchedUser.name.firstName,
//                 lastName: matchedUser.name.lastName,
//                 email: matchedUser.email,
//                 image: matchedUser.image,
//                 age: matchedUser.age,
//                 gender: matchedUser.gender,
//                 phone: matchedUser.phone,
//                 birthDate: matchedUser.birthDate,
//                 bloodGroup: matchedUser.bloodGroup,
//                 height: matchedUser.height,
//                 weight: matchedUser.weight,
//                 eyeColor: matchedUser.eyeColor,
//             };
//
//             setUser(user);
//             setLoggedIn(true);
//         } catch (error) {
//             console.error(error);
//         }
//     };
//
//     return (
//         <NavigationContainer>
//             {loggedIn ?  (
//                 <Stack.Navigator>
//                     <Stack.Screen
//                         name="Dashboard"
//                         options={{
//                             title: 'ZAMARA APP',
//                             headerTitleAlign: 'center',
//                             headerLeft: () => <Menu handleLogout={handleLogout} />
//                         }}
//                     >
//                         {() => (
//                             <View style={{ padding: 20 , alignItems: 'center'}}>
//                                 <View style={{ marginTop: 20 }}>
//                                     <View style={{ flexDirection: 'column', alignItems: 'center',width: '300', borderWidth: 1, padding: 10 }}>
//                                         <Image source={user.image} style={{ width: 50, height: 50, borderRadius: 25 }} />
//                                         <Text style={{ marginLeft: 10, fontSize: 20 }}>Welcome <Text style={{fontWeight: 'bold'}}> {user.firstName} {user.lastName}</Text></Text>
//                                         <Text style={{ fontSize: 20, marginTop: 10 }}>Your profile details is as below:</Text>
//                                     </View>
//
//                                     <Text style={{ fontSize: 18, marginTop: 10 }}>Age: <Text style={{ fontWeight: 'bold' }}>{user.age}</Text></Text>
//                                     <Text style={{ fontSize: 18 }}>Gender: <Text style={{ fontWeight: 'bold' }}>{user.gender}</Text></Text>
//                                     <Text style={{ fontSize: 18, fontFamily: 'System' }}>
//                                         <Text>Email: </Text>
//                                         <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>{user.email}</Text>
//                                     </Text>
//
//                                     <Text style={{ fontSize: 18 }}>Phone: <Text style={{ fontWeight: 'bold' }}>{user.phone}</Text></Text>
//                                     <Text style={{ fontSize: 18 }}>Birth Date: <Text style={{ fontWeight: 'bold' }}>{user.birthDate}</Text></Text>
//                                     <Text style={{ fontSize: 18 }}>Blood Group: <Text style={{ fontWeight: 'bold' }}>{user.bloodGroup}</Text></Text>
//                                     <Text style={{ fontSize: 18 }}>Height: <Text style={{ fontWeight: 'bold' }}>{user.height}</Text></Text>
//                                     <Text style={{ fontSize: 18 }}>Weight: <Text style={{ fontWeight: 'bold' }}>{user.weight}</Text></Text>
//                                     <Text style={{ fontSize: 18 }}>Eye Color: <Text style={{ fontWeight: 'bold' }}>{user.eyeColor}</Text></Text>
//                                 </View>
//                             </View>
//                         )}
//                     </Stack.Screen>
//                     <Stack.Screen
//                         name="Staff"
//                         component={StaffScreen}
//                         options={{
//                             headerRight: () => <Menu handleLogout={handleLogout} />
//                         }}
//                     />
//                     <Stack.Screen
//                         name="Continents"
//                         component={ContinentsScreen}
//                         options={{
//                             headerRight: () => <Menu handleLogout={handleLogout} />
//                         }}
//                     />
//                     <Stack.Screen
//                         name="Email"
//                         component={EmailScreen}
//                         options={{
//                             headerRight: () => <Menu handleLogout={handleLogout} />
//                         }}
//                     />
//                 </Stack.Navigator>
//             ) : (
//                 <Stack.Navigator>
//                     <Stack.Screen
//                         name="Login"
//                         options={{ title: 'Login' }}
//                     >
//                         {() => <LoginScreen setLoggedIn={handleLoginSuccess} />}
//                     </Stack.Screen>
//                 </Stack.Navigator>
//             )}
//         </NavigationContainer>
//     )}

