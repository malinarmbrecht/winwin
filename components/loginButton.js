import React from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';


export default function Button ( { text, onPress } ) {
    
    return(
        <TouchableOpacity activeOpacity={'0,6'} onPress={onPress} style={styles.container}>
            <Text  style={styles.text}>{text}</Text>        
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        
        backgroundColor: 'white',
        borderColor: '#56EEEE',
        borderWidth: 10,
        width: 60,
        height: 60,
        borderRadius: 45,
        margin: 20,
        top: -40,
        padding: -2,

    },
    text: {
        color: 'black',
        padding: 0,
        borderRadius: 45,
        fontWeight: '800',
        paddingHorizontal: 5,
        paddingVertical: 10,
        textAlign: 'center',
        textAlignVertical: 'center',

    },
});
