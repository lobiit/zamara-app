import React, {useState} from "react";
import {Image, Pressable, Text, View} from "react-native";

export default function Menu({ handleLogout, navigation }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const navigateToScreen = (screenName) => {
        if (!navigation) {
            console.error('Navigation prop is undefined or null');
            return;
        }

        if (!screenName) {
            console.error('Screen name is undefined or null');
            return;
        }

        setMenuOpen(false);
        navigation.navigate(screenName);
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: 'black' }}>
            <Pressable onPress={() => setMenuOpen(!menuOpen)}>
                <Image
                    source={require('C:\\Users\\cyril\\zamara\\assets\\menu.png')}
                    style={{ width: 30, height: 30 }}
                />
            </Pressable>
            {menuOpen && (
                <View style={{ position: 'absolute', top: 40, left: 0, borderWidth: 1, borderColor: 'black' }}>
                    <Pressable onPress={() => navigateToScreen('Dashboard')}>
                        <Text style={{ padding: 10 }}>Home</Text>
                    </Pressable>
                    <Pressable onPress={() => navigateToScreen('Staff')}>
                        <Text style={{ padding: 10 }}>Staff</Text>
                    </Pressable>
                    <Pressable onPress={() => navigateToScreen('Continents')}>
                        <Text style={{ padding: 10 }}>Continents</Text>
                    </Pressable>
                    <Pressable onPress={handleLogout}>
                        <Text style={{ padding: 10 }}>Sign Out</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}
