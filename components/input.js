import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';

export default function Input ( { label, placeholder, onChangeText, keyboardType } ) {
    return(
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}></View>
                <TextInput placeholder={ placeholder } style={styles.input} onChangeText={onChangeText} keyboardType={keyboardType}/>
            </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    label: {
        fontSize: 14,
        marginVertical: 8,   
        fontWeight: '500', 
    },
    inputContainer: {
        borderWidth: 0,
        borderColor: '#E0E0E0',
    },
    input: {
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 10,     
        backgroundColor: 'white',  
        height: 28,         
        width: '100%',
    }
});