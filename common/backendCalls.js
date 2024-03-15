import React, {useEffect,  useState } from 'react';
 

export const loginUser = async (username) => {
    
    const url = "http://192.168.2.3:3000/users"+"?name="+username;        
    let result = await fetch(url);        
    result = await result.json();
    if(result){
        console.log("user found, url: "+ url)
      return result[0];
    } else{
        return null;
    }

}

export const getUserProfile = async (id) => {
    //const user = users.find((user) => (user.name === userName))
    const url = "http://192.168.2.3:3000/users"+"/"+id;        
    let result = await fetch(url);        
    result = await result.json();
    if(result){
      return user
    }
}

export const updateProfile = (profile) => {
    console.log('Updating profile database');   
    return profile;

}






