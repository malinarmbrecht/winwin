import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import Input from '../components/input';
import Button from '../components/loginButton';
import { getUserProfile, validateUser } from '../common/backendCalls';
import { LinearGradient } from 'expo-linear-gradient';
import { UserContext, ApprovalsContext } from '../App';
import { approvalData } from '../data/approvals';


const Login = ({ navigation }) => {
    const { setUser} = useContext(UserContext);   
    const { setApprovals} = useContext(ApprovalsContext); 

    const [userName, setUserName] = useState('No user');
    const [message, setMessage] = useState();


    const onLogin = () => {
        setMessage('');
        if (validateUser(userName)) {
            setUser(userName);

            const userData = getUserProfile(userName);
            console.log('Login user: ' + userData.name + ', streck: ' + userData.streck);
            setUser(userData);
            console.log('Approvals at login: ' + approvalData.length)
            setApprovals(approvalData);

            navigation.navigate('Home');
        } else {                
            setMessage('Okänd användare');
        }
    }
    
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
    

        //paddingVertical: 24,
        //backgroundColor: '#56EEEE',
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
        //colors: ['#4c669f', '#3b5998', '#192f6a'],
        //colors: ['rgba(0,0,0,0.8)', 'transparent'],
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