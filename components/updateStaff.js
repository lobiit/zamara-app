import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BASE_URL = 'https://crudcrud.com/api/3e7828237b5d4c5b8fd6c4db3bca113a';

export default function UpdateStaffScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const [staffNumber, setStaffNumber] = useState(route.params.staffNumber);
    const [staffName, setStaffName] = useState(route.params.staffName);
    const [staffEmail, setStaffEmail] = useState(route.params.staffEmail);
    const [department, setDepartment] = useState(route.params.department);
    const [salary, setSalary] = useState(route.params.salary);

    async function handleUpdateStaff() {
        try {
            const response = await fetch(`${BASE_URL}/zamara/${route.params._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    staffNumber,
                    staffName,
                    staffEmail,
                    department,
                    salary,
                }),
            });
            const data = await response.json();
            navigation.navigate('Staff');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Staff Member</Text>
            <TextInput
                style={styles.input}
                placeholder="Staff Number"
                value={staffNumber}
                onChangeText={setStaffNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="Staff Name"
                value={staffName}
                onChangeText={setStaffName}
            />
            <TextInput
                style={styles.input}
                placeholder="Staff Email"
                value={staffEmail}
                onChangeText={setStaffEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Department"
                value={department}
                onChangeText={setDepartment}
            />
            <TextInput
                style={styles.input}
                placeholder="Salary"
                value={salary}
                onChangeText={setSalary}
            />
            <Button title="Update Staff" onPress={handleUpdateStaff} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },
});
