import React, { useState } from 'react';
import { users } from '../data/users';
import { approvals } from '../data/approvals';

export const validateUser = (username) => {
    const user = users.find((user) => (user.name === username));
    if (user != undefined) {
        
        return true;
    }
    else {
        console.log('User NOK')
        return false;
    }

}

export const getUserProfile = (userName) => {
    const user = users.find((user) => (user.name === userName))
      return user ;
}

export const updateProfile = (profile) => {
    console.log('Updating profile database');   
    return profile;

}

export const getApprovals = () => {
    console.log('Request approvals')
    
      return approvals;

}





