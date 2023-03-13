import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Perform login logic here
        // For example, you might make an API call to validate the user's credentials

        // If the login is successful, navigate to the Dashboard screen
        navigation.navigate('Dashboard');
    };

    return (
        <View>
            <Text>Username:</Text>
            <TextInput value={username} onChangeText={setUsername} />

            <Text>Password:</Text>
            <TextInput value={password} onChangeText={setPassword} secureTextEntry />

            <TouchableOpacity onPress={handleLogin}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    );
}
