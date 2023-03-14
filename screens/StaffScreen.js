import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const BASE_URL = 'https://crudcrud.com/api/3e7828237b5d4c5b8fd6c4db3bca113a/zamara';

export default function StaffScreen() {
    const [staffList, setStaffList] = useState([]);
    const [staffNumber, setStaffNumber] = useState('');
    const [staffName, setStaffName] = useState('');
    const [staffEmail, setStaffEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState('');

    useEffect(() => {
        async function fetchStaffList() {
            try {
                const response = await fetch(`${BASE_URL}/staff`);
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
            const response = await fetch(`${BASE_URL}/staff`, {
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
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View>
            <Text>Add Staff</Text>
            <TextInput
                placeholder="Staff Number"
                value={staffNumber}
                onChangeText={setStaffNumber}
            />
            <TextInput
                placeholder="Staff Name"
                value={staffName}
                onChangeText={setStaffName}
            />
            <TextInput
                placeholder="Staff Email"
                value={staffEmail}
                onChangeText={setStaffEmail}
            />
            <TextInput
                placeholder="Department"
                value={department}
                onChangeText={setDepartment}
            />
            <TextInput
                placeholder="Salary"
                value={salary}
                onChangeText={setSalary}
            />
            <Button title="Add Staff" onPress={handleAddStaff} />
            <Text>Staff List</Text>
            <FlatList
                data={staffList}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.staffNumber}</Text>
                        <Text>{item.staffName}</Text>
                        <Text>{item.staffEmail}</Text>
                        <Text>{item.department}</Text>
                        <Text>{item.salary}</Text>
                    </View>
                )}
            />
        </View>
    );
}
