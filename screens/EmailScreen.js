import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

export default function EmailScreen() {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    const handleSendEmail = async () => {
        if (!subject || !body) {
            return alert('Please fill in the subject and body fields.');
        }

        const result = await MailComposer.composeAsync({
            recipients: ['recipient@example.com'],
            subject,
            body,
        });

        if (result.status === 'sent') {
            alert('Email sent successfully.');
        } else {
            alert('Failed to send email.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Email Screen</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Subject"
                    value={subject}
                    onChangeText={setSubject}
                />
                <TextInput
                    style={[styles.input, { height: 150 }]}
                    placeholder="Body"
                    multiline={true}
                    value={body}
                    onChangeText={setBody}
                />
                <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
                    <Text style={styles.buttonText}>Send Email</Text>
                </TouchableOpacity>
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
        marginBottom: 20,
    },
    form: {
        width: '80%',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: '100%',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
