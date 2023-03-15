import React, {useState} from "react";
import {StyleSheet, View, TextInput, Button, Text} from "react-native";

export default function LoginScreen({ setUser, setLoggedIn }) {
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

            if (loginResponse.ok) {
                const data = await loginResponse.json();
                const { id } = data;
                const userResponse = await fetch(`https://dummyjson.com/users/${id}`);
                const matchedUser = await userResponse.json();
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
            } else {
                throw new Error('Invalid username or password');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your username"
                    value={username}
                    onChangeText={setUsername}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        marginBottom: 20,
        width: '80%',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
});
