import React from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';

const continents = [
    // {
    //     id: '1',
    //     name: 'Africa',
    //     image: require('./assets/africa.jpg'),
    // },
    // {
    //     id: '2',
    //     name: 'Asia',
    //     image: require('./assets/asia.jpg'),
    // },
    // {
    //     id: '3',
    //     name: 'Europe',
    //     image: require('./assets/europe.jpg'),
    // },
    // {
    //     id: '4',
    //     name: 'North America',
    //     image: require('./assets/north-america.jpg'),
    // },
    // {
    //     id: '5',
    //     name: 'South America',
    //     image: require('./assets/south-america.jpg'),
    // },
];

export default function ContinentScreen() {
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardTitleContainer}>
                <Text style={styles.cardTitle}>{item.name}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Continent Screen</Text>
            <FlatList
                data={continents}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.list}
            />
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
    list: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    card: {
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    cardImage: {
        width: 150,
        height: 150,
        borderRadius: 5,
    },
    cardTitleContainer: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        padding: 10,
        width: 150,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
