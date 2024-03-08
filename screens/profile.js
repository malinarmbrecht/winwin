import React, { useContext } from 'react';
import { StyleSheet, View, Text  } from 'react-native';
import { UserContext } from '../App';

export default function Profile({ navigation }) {
    
 const {user, setUser} = useContext(UserContext);

    return (
        <View style={styles.container}>
            <Text>Min Sida</Text>
            <Text>{user.name}</Text>            
            <Text>Antal streck denna månad {user.streck}</Text>
            <Text>Antal streck förra månader {user.lastMonth}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24
    }
});