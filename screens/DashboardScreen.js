import React from "react";
import {View, Text, Image} from "react-native";


export default function DashboardScreen({ user }) {
    return (
        <View style={{ padding: 20, alignItems: 'center' }}>
            <View
                style={{
                    marginTop: 20,
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderWidth: 1,
                    padding: 10,
                    width: '100%',
                }}
            >

                <Image source={{ uri: user.image }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                <Text style={{ marginLeft: 10, fontSize: 20 }}>
                    Welcome{' '}
                    <Text style={{ fontWeight: 'bold' }}>
                        {user.firstName} {user.lastName}
                    </Text>
                </Text>
                <Text style={{ fontSize: 20, marginTop: 10 }}>
                    Your profile details are as follows:
                </Text>
            </View>

            <Text style={{ fontSize: 18, marginTop: 10 }}>
                Age: <Text style={{ fontWeight: 'bold' }}>{user.age}</Text>
            </Text>
            <Text style={{ fontSize: 18 }}>
                Gender: <Text style={{ fontWeight: 'bold' }}>{user.gender}</Text>
            </Text>
            <Text style={{ fontSize: 18, fontFamily: 'System' }}>
                Email:{' '}
                <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                    {user.email}
                </Text>
            </Text>
            <Text style={{ fontSize: 18 }}>
                Phone: <Text style={{ fontWeight: 'bold' }}>{user.phone}</Text>
            </Text>
            <Text style={{ fontSize: 18 }}>
                Birth Date: <Text style={{ fontWeight: 'bold' }}>{user.birthDate}</Text>
            </Text>
            <Text style={{ fontSize: 18 }}>
                Blood Group: <Text style={{ fontWeight: 'bold' }}>{user.bloodGroup}</Text>
            </Text>
            <Text style={{ fontSize: 18 }}>
                Height: <Text style={{ fontWeight: 'bold' }}>{user.height}</Text>
            </Text>
            <Text style={{ fontSize: 18 }}>
                Weight: <Text style={{ fontWeight: 'bold' }}>{user.weight}</Text>
            </Text>
            <Text style={{ fontSize: 18 }}>
                Eye Color: <Text style={{ fontWeight: 'bold' }}>{user.eyeColor}</Text>
            </Text>
        </View>
    );
}
