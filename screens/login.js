import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import Input from '../components/input';
import Button from '../components/loginButton';
import { getUserProfile } from '../common/backendCalls';
import { LinearGradient } from 'expo-linear-gradient';
import { UserContext, ApprovalsContext } from '../App';

const Login = ({ navigation }) => {
    const { setUser, user } = useContext(UserContext);   
    const { setApprovals, approvals} = useContext(ApprovalsContext); 
    const [userName, setUserName] = useState('No user');
    const [message, setMessage] = useState();



    const onLogin = () => {
        setMessage('');        
        getUser(userName);

        if (user != 'User not found') {
            
            console.log('Login user: ' + user.name);
            
            if(user.type == "admin")
            {
                getApprovalData();
            }
            navigation.navigate('Home');
        } else {                
            setMessage('Okänd användare');
        }
    }
    
    const getUser = async (username) => {
        const url = "http://192.168.2.3:3000/users"+"?name="+username;  
        console.log("login user: " + url)  ;    
        let result = await fetch(url);        
        result = await result.json();
        console.log("user result: "+ result[0].name)
        if(result){
            setUser(result[0]);
        } else{
            setUser('User not found');    
        }
    
    }

    const getApprovalData = async () => 
    {        
        const url = "http://192.168.2.3:3000/approvals";        
        let result = await fetch(url);        
        result = await result.json();
        setApprovals(result);
        console.log("Approvals: " + approvals);
    }
    useEffect(()=> {
        getApprovalData();
    }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient  colors= {['#D8FBFB', '#56EEEE'] } locations={[0.1, 0.8]} height="100%" >
                <View style={styles.container}>  
                    <Image resizeMode='contain' style={styles.image} source={require('../assets/star.png')} />
                            
                    <View style={styles.loginContainer}>
                        <Text>Logga in och håll koll på dina streck och var en stjärna</Text>
                        <Input onChangeText={(val) => setUserName(val)} placeholder="Ralf" label="Namn"></Input>                          
                        <Text>{message}</Text>
                    </View>                         
                    <Button text="OK" onPress={onLogin} style={{...styles.button, ...styles.buttonPos}}/>          
                   
                </View>
                </LinearGradient>
        </TouchableWithoutFeedback>
       
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%', 
    },
    loginContainer: {
        marginHorizontal: 10,
        padding: 20,
        justifyContent: 'center',
        alignContent: 'center',
        height: '200', 
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        
    },
    background: {

        height: '100%', 
    },
    image: {
        height: 400,
        opacity: 0.6,
        top: 30,
    },
    buttonPos: {
        
      top: -40,
      padding: -2,
      backgroundColor: 'black',
    }
});