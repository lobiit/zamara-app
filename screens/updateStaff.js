import React, { useEffect, useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';

const BASE_URL = 'https://crudcrud.com/api/3e7828237b5d4c5b8fd6c4db3bca113a';

export default function UpdateStaff({ route, navigation }) {
    const {id, handleUpdate} = route.params;
    const [staffNumber, setStaffNumber] = useState('');
    const [staffName, setStaffName] = useState('');
    const [staffEmail, setStaffEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchStaffData();
    }, []);

    async function fetchStaffData() {
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/zamara/${id}`);
            const data = await response.json();
            setStaffName(data.staffName);
            setStaffNumber(data.staffNumber);
            setStaffEmail(data.staffEmail);
            setDepartment(data.department);
            setSalary(data.salary);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }


    async function handleUpdateStaff() {
        if (!staffName || !staffNumber || !staffEmail || !department || !salary) {
            // check for empty values
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/zamara/${id}`, {
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
            // const data = await response.json();
            // Fetch the updated data
            const updatedResponse = await fetch(`${BASE_URL}/zamara/${id}`);
            const updatedData = await updatedResponse.json();
            console.log(updatedData);
            handleUpdate(updatedData);
            navigation.navigate('Staff', {isUpdated: true});
            navigation.goBack();

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator/>
            ) : (
                <>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Staff Name:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter staff name"
                            onChangeText={setStaffName}
                            value={staffName}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Staff Number:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter staff number"
                            onChangeText={setStaffNumber}
                            value={staffNumber}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Staff Email:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter staff email"
                            onChangeText={setStaffEmail}
                            value={staffEmail}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Department:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter department"
                            onChangeText={setDepartment}
                            value={department}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Salary:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter salary"
                            onChangeText={setSalary}
                            value={salary}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleUpdateStaff}>
                        <Text style={styles.buttonText}>Update Staff</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    inputContainer: {
        marginVertical: 10,
    },
    inputLabel: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#2196F3',
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
});
