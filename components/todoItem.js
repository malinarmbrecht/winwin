import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function TodoItem({pressHandler, item}) {
    return (
        <TouchableOpacity onPress={() => pressHandler(item.streck)}>
            <View style={styles.item}>
                <MaterialIcons name={item.icon} size={24} color="black" />
                <Text style={styles.itemText}> { item.title } ( { item.streck } )</Text>    
                <MaterialIcons style={styles.itemRightContent} name="done-outline" size={24} color="#56EEEE" />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginTop: 16,
        borderColor: 'white',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        flexDirection: 'row',

    },
    itemText: {
        flex: 5,
        fontSize: 18,
        marginLeft: 10,
    },
    itemRightContent: {
        flex: 1,
    },
    itemLeftContent: {
        flex: 1,
        paddingLeft: 10,
    }
})

