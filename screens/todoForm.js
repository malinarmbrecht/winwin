import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { Formik } from 'formik';
import Button from '../components/button';
import Input from '../components/input';
import { MaterialIcons } from '@expo/vector-icons';

export default function TodoForm ({ addTodo }) {

  return (
    
    <View style={styles.container}>
      <Formik
        initialValues={{ title: '', icon: '', streck: '' }}
        onSubmit={(values, actions) => {
          actions.resetForm(); 
          addTodo(values);
        }}
      >
        {props => (
          <View>
            <Input
            
              label='Namge uppgiften'
              placeholder='Uppgift...'
              onChangeText={props.handleChange('title')}
              value={props.values.title}
            />

            <Input              
              
              label='Ange antal streck är uppgiften värd'
              placeholder='Streck (1 - 5)'
              onChangeText={props.handleChange('streck')}
              value={props.values.streck}
              keyboardType='numeric'
            />

            <Input            
              label='Välj en ikon' placeholder='Ex. star'
              onChangeText={props.handleChange('icon')}
              value={props.values.icon}
            />
            
            <Button text="OK" onPress={props.handleSubmit} style="{{...styles.buttonPos}}"/> 

            <Text style={styles.label}>Icon Library</Text>           
            <Text style={styles.titleText}> <MaterialIcons name='local-car-wash' size={24} color="black" /> local-car-wash </Text>     
            <Text style={styles.titleText}> <MaterialIcons name='star' size={24} color="black" /> star </Text>  
            <Text style={styles.titleText}> <MaterialIcons name='forest' size={24} color="black" /> forest </Text>  
            <Text style={styles.titleText}> <MaterialIcons name='bed' size={24} color="black" /> bed </Text>  
            <Text style={styles.titleText}> <MaterialIcons name='build' size={24} color="black" /> build </Text>  
            <Text style={styles.titleText}> <MaterialIcons name='shopping-cart' size={24} color="black" /> shopping-cart </Text>  
          </View>
        )}
      </Formik>
    </View>
    
  );
}


const styles = StyleSheet.create({
    label: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      paddingLeft: 10,
      marginBottom: 10
    },
    titleText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    paragraph: {
      marginVertical: 8,
      lineHeight: 20,
    },
    container: {
      flex: 1,
      alignContent: 'center',
      backgroundColor: '#E0E0E0',
      justifyContent: 'center',
    },
    buttonPos: {
      alignContent: 'center',
      alignSelf: 'center',
    }
    
  });