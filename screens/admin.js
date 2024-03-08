import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity  } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
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
            <Text style={styles.listLabel}>Utförda uppgifter att godkänna: { approvals.length }</Text>
            <View style={styles.list}>
                <FlatList
                    data={approvals}
                    renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => pressApproved(item.streck, item.key, item.user, item.userKey)}>
                        <Card>
                            <Text style={styles.itemText}>{item.user}</Text>
                            <Text style={styles.itemText}>{item.todo} ( {item.streck} )</Text> 
                          </Card>
                    </TouchableOpacity>
                    )}
                /> 
            </View> 
            
            <Text style={styles.listLabel}>Stjärnöversikt</Text>
            <View style={styles.list}>
                <FlatList
                    data={allUsers}
                    renderItem={({ item }) => (
                    <Card>
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
    item: {
        height: 20,
        marginTop: 10,
        borderColor: 'white',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',

    },
    rating: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 16,
        marginTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
      },
      listLabel: {
        paddingTop: 20,
        color: 'black',
        fontSize: 24,
    },              
    itemText: {
        flex: 2,
        fontSize: 18,
        paddingRight: 5,
        
    },  
    iconLeft: {
        flex: 1,
    }, 
    iconRight: {
        flex: 1,
    }
});