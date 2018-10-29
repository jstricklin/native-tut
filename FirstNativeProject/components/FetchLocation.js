import React from 'react';
import { Button, StyleSheet, Text } from "react-native"

const FetchLocation = props => {

    return (
        <Button style={{color: 'green'}} color="#9C27B0" title="Get Location" onPress={ props.onGetLocation } />

    );
}

const styles = StyleSheet.create({
    getBtn: {
        backgroundColor: 'blue',
        color: 'gray',
    }
})

export default FetchLocation;
