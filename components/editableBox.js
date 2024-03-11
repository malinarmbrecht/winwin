import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';

export default function EditableBox ({ label, value, editable })  {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>      
            <TextInput editable={editable} value={value} style={styles.input}/>      
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24
    },
    icon: {
        alignSelf: 'center',
        paddingBottom: 50,
        paddingTop: 50
    },
    input: {
        fontSize: 14,
        fontWeight: 500,
    },
    label: {
        color: "grey",
        marginTop: 6,
        fontSize: 12,
    }
});