import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity  } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Card from '../components/card';
import { ApprovalsContext, UserContext } from '../App';
import { users } from '../data/users';
import { getUserProfile } from '../common/backendCalls';

const Admin = ({ navigation }) => {
    
    const { user } = useContext(UserContext);
    const { approvals, setApprovals } = useContext(ApprovalsContext);
    const [allUsers, setAllUsers] = useState(users); 
    const [userProfile, setUserProfile] = useState();
          
    const pressApproved = (streck, key, user, userkey) => {
        //get profile to update
        const profile = users.find((user) => (user.key === userkey));
        //const userData = getUserProfile(user);
        setUserProfile(profile);            

        //update profile values
        const currentPoints = profile.streck;
        const newPoints = Number(currentPoints) + Number(streck);
        profile.streck = newPoints;
        //remove old userprofile from user list
        setAllUsers(currentUsers => {
            return currentUsers.filter(user => user.key != userkey);
            });
        //add updated profile to user list       
        setAllUsers((currentUsers) => {
              return [profile, ...currentUsers];
          });

       //remove approval from approvallist
       setApprovals(prevApprovals => {
        return prevApprovals.filter(approval => approval.key != key);
        });
    
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.listLabel}>Uppgifter att godkänna: { approvals.length }</Text>
            <View style={styles.list}>
                <FlatList
                    data={approvals}
                    renderItem={({ item }) => (
                         <Card>
                            <Text style={styles.itemTextLeft}>{item.user}</Text>
                            <Text style={styles.itemTextLeft}>{item.todo} ( {item.streck} )</Text>                             
                            <TouchableOpacity onPress={() => pressApproved(item.streck, item.key, item.user, item.userKey)}>
                                <MaterialCommunityIcons name="hand-okay" size={32} color="black" />
                            </TouchableOpacity>
                          </Card>
                    )}
                /> 
            </View> 
            
            <Text style={styles.listLabel}>Stjärnöversikt</Text>
            <View style={styles.list}>
                <FlatList
                    data={allUsers}
                    renderItem={({ item }) => (
                    <Card>
                        <MaterialIcons name={item.icon} size={24} color="black" />
                        <Text style={styles.itemText}>{item.name}</Text>  
                        <Text style={styles.itemText}>{item.streck}</Text>  
                        <Text style={styles.itemText}>( {item.lastMonth}) </Text>  
                    </Card>
                    )}
                /> 
            </View> 
        </View>
    )
}

export default Admin;

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#E0E0E0',
        flex: 1,
    },
    list: {
        flexDirection: 'row',
    },
    listLabel: {
        paddingTop: 20,
        color: 'black',
        fontSize: 24,
    }, 
    itemText: {
        fontSize: 20,
        marginLeft: 20,
        flex: 1
    },
    itemTextLeft: {
        fontSize: 20,
        
    },
});