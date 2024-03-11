import React, { useContext } from 'react';
import { StyleSheet, View, Text, TextInput  } from 'react-native';
import { UserContext } from '../App';
import { MaterialIcons } from '@expo/vector-icons';
import Input from '../components/input';

export default function Profile({ navigation }) {
    
 const {user, setUser} = useContext(UserContext);
 const updateUser = () => {

 }
    return (
        <View style={styles.container}>
            
            <MaterialIcons name={user.icon} size={64} color="black" style={styles.icon}/>
            <View style={styles.editBox}>
                <Text style={styles.label}>Namn</Text>      
                <TextInput editable={false} value={user.name} style={styles.input}/>      
            </View>                       
                       
            
            <Text style={styles.textInfo} >Antal streck denna månad: {user.streck}</Text>
            <Text style={styles.textInfo} >Antal streck förra månader: {user.lastMonth}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24
    },
    editBox: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 4,
        backgroundColor: "white",
        marginBottom: 20,
    },
    icon: {
        alignSelf: 'center',
        paddingBottom: 50,
        paddingTop: 50
    },    
    input: {
        fontSize: 14,
    },
    label: {
        color: "black",
        marginTop: 6,
        fontSize: 12,
    },
    textInfo: {
        paddingBottom: 4,

        fontSize: 14,
    }
})