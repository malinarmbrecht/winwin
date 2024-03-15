import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Image, FlatList, Modal, Keyboard  } from 'react-native';
import { UserContext } from '../App';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../components/card';
import { todos } from '../data/todos';
import TodoForm from './todoForm';

export default function Home ({ navigation }) {
    const { user } = useContext(UserContext);    
    const [modalOpen, setModalOpen] = useState(false);
    const [dynamicTodos, setDynamicTodos] = useState(todos);
    
    const pressTodoHandler = async (todo, user) => {  
        const approval = { userName:user.name, userId:user.id, todo:todo.title, streck:todo.streck };
        const url = "http://192.168.2.3:3000/approvals";
        let result = await fetch(url, {
            method:"POST", 
            headers: {
                "Content-Type":"application/json"                
            },
            body:JSON.stringify(approval)           
            });
            result = await result.json();
            console.log(result + ' approval: '+ approval);
    }

    const showProfileHandler = () => {
        navigation.navigate('Profile');
    }
    
    const addTodo = (todo) => {
        todo.key = Math.random().toString();
        setDynamicTodos((currentTodos) => {
          return [todo, ...currentTodos];
        });
        setModalOpen(false);
      };   
    //Get se name of current month
    const d = new Date();
    const m = d.getMonth();
    const mString = ['Januari' , 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];
    const month = mString[m];

    return (
        <View style={styles.container}>
            <View style={styles.wrapperContainer}>
                <MaterialIcons name={ user.icon } size={74} onPress={showProfileHandler}/>  
                <View style={styles.overviewContainer}>                                             
                    <Text style={styles.itemTextBold}> { user.name } </Text>    
                    <Text  style={styles.itemText}> {month}: {user.streck} /30 </Text>      
                    <Text  style={styles.itemText}> Förra månaden: {user.lastMonth} /30 </Text> 
                </View>  
            {user.type === 'admin' ? (
            <>
                <Modal visible={modalOpen} animationType='slide'>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <MaterialIcons 
                        name='close'
                        size={24} 
                        style={{...styles.modalToggle, ...styles.modalClose}} 
                        onPress={() => setModalOpen(false)} 
                        />
                        <TodoForm addTodo={addTodo} />
                    </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <MaterialIcons name='add-circle' size={24} style={{...styles.modalToggle }}  onPress={() => setModalOpen(true)}/>
            </>
            ) : (
            <>                
            </>
            )}  
            
            </View>
            
            <View style={styles.list}>
                <FlatList
                    data={dynamicTodos}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => pressTodoHandler(item, user)}>
                            <Card>
                                <MaterialIcons name={item.icon} size={24} color="black" />
                                <Text style={styles.itemTodoText}> { item.title } ( { item.streck } )</Text> 
                                <MaterialIcons name='done-outline' size={24} color="black" />   
                            </Card>
                    </TouchableOpacity>
                    )}
                /> 
            </View>     
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#E0E0E0',
        flex: 1,
    },
    wrapperContainer: {
        padding: 20,
        backgroundColor: '#56EEEE',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'flex-top',
    },
    overviewContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    itemText: {
        marginLeft: 20,
        fontSize: 20,
    },
    itemTextBold: {
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemTodoText: {
        marginLeft: 20,
        flex: 4
    },
    list: {
        flex: 2,
    },
    
    modalToggle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        alignSelf: 'flex-start',
  },
        
      
      modalClose: {
        marginTop: 20,
        marginBottom: 0,
      },
      modalContent: {
        alignContent: 'center',
        flex: 1,
      }

});