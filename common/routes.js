import React, { useContext, useState } from 'react';
import Home from '../screens/home';
import Login from '../screens/login';
import Profile from '../screens/profile';
import Admin from '../screens/admin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet  } from 'react-native';
import { ApprovalsContext, UserContext } from '../App';

const Stack = createNativeStackNavigator();


const Routes = () => {
  
  const isSignedIn = false;
  const { approvals } = useContext(ApprovalsContext);
  const { user } = useContext(UserContext);

  const openAdmin = ({ navigation }) => {
    navigation.navigate('Admin');
}
  return (
            <NavigationContainer>
              <Stack.Navigator>
                {user.type === 'admin' ? (
                  <>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                <Stack.Screen 
                    name="Home" 
                    component={Home} 
                    options={({ navigation, route}) => ({
                         headerShown: true,
                         headerTitle: '',
                         headerRight: () => (
                            <MaterialIcons name='notifications' 
                                            size={28} color= {approvals.length > 0 ? 'black' : 'lightgrey'} 
                                            onPress={ () => openAdmin({navigation})} 
                                            style={styles.icon}>
                            </MaterialIcons>
                            
                         ),
                    })}
                />
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: true }}/>
                <Stack.Screen name="Admin" component={Admin} options={{ headerShown: true }}/>
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                <Stack.Screen name="Home"  component={Home}  options={{ headerShown: true, headerTitle: '' }}/>
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: true }}/>
                <Stack.Screen name="Admin" component={Admin} options={{ headerShown: true }}/>
              </>
            )}                
              </Stack.Navigator>
            </NavigationContainer>  
  );
}

export default React.memo(Routes);

const styles = StyleSheet.create({
    header: {
        width: '100%',
        hight: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1,
    },
    icon: 'absolute',
    right: 10,
});