/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import FetchLocation from './components/FetchLocation';
// import MapView from './components/map/MapView.js'
import MapView from 'react-native-maps'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    getUserLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)
        }, err => console.log(err))

    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to Jose's First Native App!</Text>
                <FetchLocation onGetLocation={this.getUserLocationHandler}/>
                <View style={{ height: 200, width: 200 }}>
                    <MapView style={styles.map} />
                </View>
            </View>
            );
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'skyblue',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: 'white',
        marginBottom: 5,
    },
});
