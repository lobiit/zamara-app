
export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const handleLogout = () => {
        // perform logout logic here
        setLoggedIn(false);
    };

    const handleLoginSuccess = async (response) => {
        try {
            const userResponse = await fetch('https://dummyjson.com/users');
            const userList = await userResponse.json();
            const { username } = response;

            // Find the user with the matching username
            const matchedUser = userList.find((user) => user.username === username);

            // Extract necessary user details
            const user = {
                id: matchedUser.id,
                firstName: matchedUser.firstName,
                lastName: matchedUser.lastName,
                email: matchedUser.email,
                image: matchedUser.image,
                age: matchedUser.age,
                gender: matchedUser.gender,
                phone: matchedUser.phone,
                birthDate: matchedUser.birthDate,
                bloodGroup: matchedUser.bloodGroup,
                height: matchedUser.height,
                weight: matchedUser.weight,
                eyeColor: matchedUser.eyeColor,
            };

            setUser(user);
            setLoggedIn(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <NavigationContainer>
            {loggedIn ?  (
                <Stack.Navigator>
                    <Stack.Screen
                        name="Dashboard"
                        options={{
                            title: 'ZAMARA APP',
                            headerTitleAlign: 'center',
                            headerLeft: () => <Menu handleLogout={handleLogout} />
                        }}
                    >
                        {() => (
                            <View style={{ padding: 20 , alignItems: 'center'}}>
                                <View style={{ marginTop: 20 }}>
                                    <View style={{ flexDirection: 'column', alignItems: 'center',width: '300', borderWidth: 1, padding: 10 }}>
                                        <Image source={user.image} style={{ width: 50, height: 50, borderRadius: 25 }} />
                                        <Text style={{ marginLeft: 10, fontSize: 20 }}>Welcome <Text style={{fontWeight: 'bold'}}> {user.firstName} {user.lastName}</Text></Text>
                                        <Text style={{ fontSize: 20, marginTop: 10 }}>Your profile details is as below:</Text>
                                    </View>

                                    <Text style={{ fontSize: 18, marginTop: 10 }}>Age: <Text style={{ fontWeight: 'bold' }}>{user.age}</Text></Text>
                                    <Text style={{ fontSize: 18 }}>Gender: <Text style={{ fontWeight: 'bold' }}>{user.gender}</Text></Text>
                                    <Text style={{ fontSize: 18, fontFamily: 'System' }}>
                                        <Text>Email: </Text>
                                        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>{user.email}</Text>
                                    </Text>

                                    <Text style={{ fontSize: 18 }}>Phone: <Text style={{ fontWeight: 'bold' }}>{user.phone}</Text></Text>
                                    <Text style={{ fontSize: 18 }}>Birth Date: <Text style={{ fontWeight: 'bold' }}>{user.birthDate}</Text></Text>
                                    <Text style={{ fontSize: 18 }}>Blood Group: <Text style={{ fontWeight: 'bold' }}>{user.bloodGroup}</Text></Text>
                                    <Text style={{ fontSize: 18 }}>Height: <Text style={{ fontWeight: 'bold' }}>{user.height}</Text></Text>
                                    <Text style={{ fontSize: 18 }}>Weight: <Text style={{ fontWeight: 'bold' }}>{user.weight}</Text></Text>
                                    <Text style={{ fontSize: 18 }}>Eye Color: <Text style={{ fontWeight: 'bold' }}>{user.eyeColor}</Text></Text>
                                </View>
                            </View>
                        )}
                    </Stack.Screen>
                    <Stack.Screen
                        name="Staff"
                        component={StaffScreen}
                        options={{
                            headerRight: () => <Menu handleLogout={handleLogout} />
                        }}
                    />
                    <Stack.Screen
                        name="Continents"
                        component={ContinentsScreen}
                        options={{
                            headerRight: () => <Menu handleLogout={handleLogout} />
                        }}
                    />
                    <Stack.Screen
                        name="Email"
                        component={EmailScreen}
                        options={{
                            headerRight: () => <Menu handleLogout={handleLogout} />
                        }}
                    />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen
                        name="Login"
                        options={{ title: 'Login' }}
                    >
                        {() => <LoginScreen setLoggedIn={handleLoginSuccess} />}
                    </Stack.Screen>
                </Stack.Navigator>
            )}
        </NavigationContainer>
    )}

