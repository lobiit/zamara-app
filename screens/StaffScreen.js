import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function StaffScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Staff Screen</Text>
            <Text style={styles.subtitle}>List of Staff Members</Text>
            <View style={styles.staffList}>
                <Text style={styles.staffItem}>John Doe</Text>
                <Text style={styles.staffItem}>Jane Smith</Text>
                <Text style={styles.staffItem}>Bob Johnson</Text>
                <Text style={styles.staffItem}>Mary Williams</Text>
                <Text style={styles.staffItem}>Mike Brown</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    staffList: {
        alignItems: 'center',
    },
    staffItem: {
        fontSize: 20,
        marginVertical: 10,
    },
});
