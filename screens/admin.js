import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity  } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Card from '../components/card';
import { ApprovalsContext } from '../App';

const Admin = ({ navigation }) => {
    const { approvals, setApprovals } = useContext(ApprovalsContext);
    
    const getUsers = async () => 
    {        
        const url = "http://192.168.2.3:3000/users";        
        let result = await fetch(url);        
        result = await result.json();
        setAllUsers(result);
    }
    useEffect(()=> {
        //getUsers();
    }, []) 

    const pressApproved = (streck, id, userId) => {
        
        updateUserPoints(userId, streck);   

       //remove approval from db
       deleteApproval(id);
       //Get all approvals again
       getApprovalData();
    
    }
    const updateUser = async (id, streck) => {
        const url = "http://192.168.2.3:3000/users"+"/"+id;
        console.log("url : " + url + ", streck: "  + streck );
        let result = await fetch(url ,{
            method: "PATCH",
            headers: {
                "Content-Type":"application/json"                
            },  
            
            body: JSON.stringify({  
                streck: streck,
            }),
        })
     
        result = await result.json();
        if(result){
            console.log("user updated sucessfully");
        }
    }
    const getApprovalData = async () => 
    {        
        const url = "http://192.168.2.3:3000/approvals";        
        let result = await fetch(url);        
        result = await result.json();
        setApprovals(result);
    }
    const updateUserPoints = async (userId, streck) =>
    {
        //get user to update
        const url = "http://192.168.2.3:3000/users"+"?id="+userId;  
        console.log("get user: " + url)  ;    
        let result = await fetch(url);        
        result = await result.json();
        
        //calculate points           
        const currentPoints = result[0].streck;
        console.log("current points: " + currentPoints);
        const newPoints = Number(currentPoints) + Number(streck);
        //update User
        updateUser(userId, newPoints);
    }
    
   
    const deleteApproval = async (id) => {
        const url = "http://192.168.2.3:3000/approvals"+"/"+id;
        console.log("url delete: " + url );
        let result = await fetch(url, {
            method: "DELETE"
        });
        result = await result.json();
        if(result){
            console.log("approval deleted");
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.listLabel}>Uppgifter att godkänna: { approvals.length }</Text>
            <View style={styles.list}>
                <FlatList
                    data={approvals}
                    renderItem={({ item }) => (
                         <Card>
                            <Text style={styles.itemTextLeft}>{item.userName}</Text>
                            <Text style={styles.itemTextLeft}>{item.userId}</Text>
                            <Text style={styles.itemTextLeft}>{item.todo} ( {item.streck} )</Text>                             
                            <TouchableOpacity onPress={() => pressApproved(item.streck, item.id, item.userId)}>
                                <MaterialCommunityIcons name="hand-okay" size={32} color="black" />
                            </TouchableOpacity>
                          </Card>
                    )}
                /> 
            </View> 
            
            <Text style={styles.listLabel}>Stjärnöversikt</Text>
            <View style={styles.list}>
                
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