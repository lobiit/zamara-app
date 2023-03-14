import React, {useState} from "react";
import {Button, TextInput, View} from "react-native";

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
            console.log(username, password);

            if (loginResponse.ok) {
                const data = await loginResponse.json();

                const { id } = data;
                console.log(id)
                const userResponse = await fetch(`https://dummyjson.com/users/${id}`);
                const matchedUser = await userResponse.json();
                console.log(matchedUser)
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
                console.log(user)
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
