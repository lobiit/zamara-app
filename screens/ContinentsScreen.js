import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { parseString } from 'react-native-xml2js';

const WSDL_URL = 'http://www.oorsprong.org/websamples.countryinfo/countryinfoservice.wso/ListOfContinentsByName';
const PROXY_URL = 'http://localhost:8082/';

function ContinentsScreen() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [continents, setContinents] = useState([]);

    useEffect(() => {
        async function fetchContinents() {
            try {
                const response = await fetch(PROXY_URL + WSDL_URL);
                const text = await response.text();
                console.log(text);

                // parse the response and update the state
                parseString(text, (err, result) => {
                    if (err) {
                        console.error(err);
                        setError('An error occurred while parsing data');
                        setLoading(false);
                    } else {
                        console.log(result);
                        const continents = result['ArrayOftContinent']['tContinent'].map(
                            (continent) => ({
                                name: continent['sName'][0],
                                code: continent['sCode'][0]
                            })
                        );
                        setContinents(continents);
                        setLoading(false);
                    }
                });
            } catch (error) {
                console.error(error);
                setError('An error occurred while fetching data');
                setLoading(false);
            }
        }

        fetchContinents();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Continents</Text>
            {loading ? (
                <Text style={styles.loading}>Loading...</Text>
            ) : error ? (
                <Text style={styles.error}>{error}</Text>
            ) : (
                <ScrollView>
                    {continents.map((continent) => (
                        <Text key={continent.code} style={styles.continent}>
                            {continent.name} ({continent.code})
                        </Text>
                    ))}
                </ScrollView>
            )}
        </View>
    );}
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
        marginVertical: 16,
    },
    loading: {
        fontSize: 18,
        color: '#999',
    },
    error: {
        fontSize: 18,
        color: '#f00',
    },
    continent: {
        fontSize: 18,
        marginVertical: 8,
    },
});

export default ContinentsScreen;
