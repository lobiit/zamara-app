import React from "react";
import { View, Text, Image } from "react-native";

export default function DashboardScreen({ user }) {
    return (
        <View style={styles.container}>
            <View style={styles.userDetailsContainer}>
                <Image source={{ uri: user.image }} style={styles.profileImage} />
                <Text style={styles.welcomeText}>
                    Welcome <Text style={styles.detailText}>{user.firstName} {user.lastName}</Text>
                </Text>
                <Text style={styles.subheadingText}>Your profile details are as follows:</Text>
            </View>

            <Text style={styles.detailText}>
                Age: <Text style={styles.boldText}>{user.age}</Text>
            </Text>
            <Text style={styles.detailText}>
                Gender: <Text style={styles.boldText}>{user.gender}</Text>
            </Text>
            <Text style={styles.detailText}>
                Email:{' '}
                <Text style={styles.linkText}>
                    {user.email}
                </Text>
            </Text>
            <Text style={styles.detailText}>
                Phone: <Text style={styles.boldText}>{user.phone}</Text>
            </Text>
            <Text style={styles.detailText}>
                Birth Date: <Text style={styles.boldText}>{user.birthDate}</Text>
            </Text>
            <Text style={styles.detailText}>
                Blood Group: <Text style={styles.boldText}>{user.bloodGroup}</Text>
            </Text>
            <Text style={styles.detailText}>
                Height: <Text style={styles.boldText}>{user.height}</Text>
            </Text>
            <Text style={styles.detailText}>
                Weight: <Text style={styles.boldText}>{user.weight}</Text>
            </Text>
            <Text style={styles.detailText}>
                Eye Color: <Text style={styles.boldText}>{user.eyeColor}</Text>
            </Text>
        </View>
    );
}

const styles = {
    container: {
        padding: 20,
        alignItems: 'center',
    },
    userDetailsContainer: {
        marginTop: 20,
        flexDirection: 'column',
        alignItems: 'center',
        borderWidth: 1,
        padding: 10,
        width: '60%',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    welcomeText: {
        marginLeft: 10,
        fontSize: 20,
        marginTop: 10,
    },
    subheadingText: {
        fontSize: 20,
        marginTop: 10,
    },
    detailText: {

        fontWeight: 'bold',
    },
    boldText: {
        fontSize: 18,
        marginTop: 10,
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
};
