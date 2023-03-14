import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import UpdateStaff from './updateStaff'




const BASE_URL = 'https://crudcrud.com/api/3e7828237b5d4c5b8fd6c4db3bca113a';

export default function StaffScreen() {
    const [staffList, setStaffList] = useState([]);
    const navigation = useNavigation();
    const [staffNumber, setStaffNumber] = useState('');
    const [staffName, setStaffName] = useState('');
    const [staffEmail, setStaffEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState('');

    useEffect(() => {
        async function fetchStaffList() {
            try {
                const response = await fetch(`${BASE_URL}/zamara`);
                const data = await response.json();
                setStaffList(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchStaffList();
    }, []);

    async function handleAddStaff() {
        try {
            const response = await fetch(`${BASE_URL}/zamara`, {
                method: 'POST',
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
            setStaffList([...staffList, data]);
            setStaffNumber('');
            setStaffName('');
            setStaffEmail('');
            setDepartment('');
            setSalary('');
        } catch (error) {
            console.error(error);
        }
    }

    function handleGoToEmailScreen() {
        navigation.navigate('Email');
    }
    async function handleUpdateStaff(id) {
        const updatedStaff = staffList.find((s) => s._id === id);
        navigation.navigate("UpdateStaff", {
            id: updatedStaff._id,
            handleUpdate: (data) => {
                setStaffList((prevList) =>
                    prevList.map((s) => (s._id === data._id ? data : s))
                );
            },
        });
    }


    const handleDeleteStaff = (id) => {
        // Filter out the staff member with the specified ID
        const updatedStaffList = staffList.filter((staff) => staff._id !== id);

        // Update the state with the new staff list
        setStaffList(updatedStaffList);
    };

    return (
        <View>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Staff Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter staff number"
                        onChangeText={setStaffNumber}
                        value={staffNumber}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Staff Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter staff name"
                        onChangeText={setStaffName}
                        value={staffName}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Staff Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter staff email"
                        onChangeText={setStaffEmail}
                        value={staffEmail}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Department</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter department"
                        onChangeText={setDepartment}
                        value={department}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Salary</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter salary"
                        onChangeText={setSalary}
                        value={salary}
                    />
                </View>
                <TouchableOpacity style={styles.addButton} onPress={handleAddStaff}>
                    <Text style={styles.addButtonText}>Add Staff</Text>
                </TouchableOpacity>
            </View>

            {/*<Button title="Go to Email Screen" onPress={handleGoToEmailScreen} />*/}
            <Text style={{ textAlign: "center", fontSize: 18, marginTop: 10 }}>
                Staff List
            </Text>
            <FlatList
                data={staffList}
                keyExtractor={(item) => item?._id}
                ListHeaderComponent={() => (
                    <View style={styles.tableHeader}>
                        <Text style={styles.columnHeader}>Staff Number</Text>
                        <Text style={styles.columnHeader}>Staff Name</Text>
                        <Text style={styles.columnHeader}>Staff Email</Text>
                        <Text style={styles.columnHeader}>Department</Text>
                        <Text style={styles.columnHeader}>Salary</Text>
                    </View>
                )}
                renderItem={({ item }) => (
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColumn}>{item?.staffNumber}</Text>
                        <Text style={styles.tableColumn}>{item?.staffName}</Text>
                        <Text style={styles.tableColumn}>{item?.staffEmail}</Text>
                        <Text style={styles.tableColumn}>{item?.department}</Text>
                        <Text style={styles.tableColumn}>{item?.salary}</Text>
                        <Button title="Update" onPress={() => handleUpdateStaff(item?._id)} />

                    </View>
                )}
            />

        </View>
    );

}

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        marginBottom: 20,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    inputContainer: {
        marginBottom: 10,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#F2F2F2',
        padding: 10,
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#ccc',
    },
    columnHeader: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tableColumn: {
        flex: 1,
        textAlign: 'center',
    },
});

