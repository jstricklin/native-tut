/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, Button, Dimensions } from 'react-native';
import FetchLocation from './components/FetchLocation';
// import MapView from './components/map/MapView.js'
import MapView from 'react-native-maps'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const baseURL = 'http://www.mapquestapi.com/geocoding/v1/address?key=AvgVnMA8ethCWCJijX8T0aDMz0YWzUi9&location='

type Props = {};
export default class App extends Component<Props> {
    constructor(props){
        super(props)
        this.state = {
            text: '',
            locationCoords: {
                lat: "",
                lng: "",
            }
        }
    }
    getUserLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(position => {
            // this.setState({ locationCoords: {position.coords }})
            console.log(position.coords)
            console.log(ASPECT_RATIO)
        }, err => console.log(err))

    }
    textChangeHandler = (text) => {
        this.setState({ text: text })
    }
    updateMapLocation = () => {
        let searchAddy = fetch(`${baseURL}${this.state.text}`)
            .then(res => res.json())
            .then(json => this.setState({locationCoords: json.results[0].locations[0].displayLatLng}))

    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to Jose's First Native App!</Text>
                <FetchLocation onGetLocation={this.getUserLocationHandler}/>
                <TextInput style={{ height: 50, backgroundColor: 'white', width: 250 }} placeholder="Search for a Location Now!" onChangeText={this.textChangeHandler} />
                <Text>{this.state.text} {this.state.locationCoords.lat} {this.state.locationCoords.lng}</Text>
                <Button title="search" onPress={this.updateMapLocation} />
                <View style={{ height: 200, width: 200 }}>
                    <MapView style={styles.map}
                        region={{
                        latitude: this.state.locationCoords.lat,
                        longitude: this.state.locationCoords.lng,
                        latitudeDelta: .01,
                        longitudeDelta: .01 * ASPECT_RATIO,
                        }}
                    />
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
        backgroundColor: 'skyblue',
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
