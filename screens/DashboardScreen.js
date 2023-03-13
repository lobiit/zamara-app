import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashboardScreen = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/1')
            .then((response) => response.json())
            .then((json) => setUser(json))
            .catch((error) => console.error(error));
    }, []);

    if (!user) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome {user.name}</Text>
            <View style={styles.detailsContainer}>
                <Text style={styles.label}>Username:</Text>
                <Text style={styles.value}>{user.username}</Text>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{user.email}</Text>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{user.phone}</Text>
                <Text style={styles.label}>Website:</Text>
                <Text style={styles.value}>{user.website}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    detailsContainer: {
        width: '80%',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default DashboardScreen;
