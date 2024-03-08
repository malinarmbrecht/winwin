import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Image, FlatList, Modal, Keyboard  } from 'react-native';
import { ApprovalsContext, UserContext } from '../App';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../components/card';
import { todos } from '../data/todos';
import TodoForm from './todoForm';

export default function Home ({ navigation }) {
    const { user } = useContext(UserContext);
    const {approvals, setApprovals} = useContext(ApprovalsContext);
    const [newApproval, setNewApproval] = useState();
    
    const [modalOpen, setModalOpen] = useState(false);
    const [dynamicTodos, setDynamicTodos] = useState(todos);
    
    const pressTodoHandler = (todo, user) => {  
        
        console.log('Todos at press: ' + dynamicTodos + ' todo item ' + todo  + ' user item ' + user);      
        const newkey = Math.random().toString();  
        setNewApproval({ user: user.name, userKey: user.key, key: newkey, todo: todo.title, streck: todo.streck });
        
        setApprovals((approvals) => {
             return [newApproval, ...approvals];
           });
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
            <View style={styles.contentContainer}>
                <View style={styles.contentText}>
                    <MaterialIcons name='face-3' size={48} onPress={showProfileHandler}/>                                 
                    <Text style={styles.itemText}> { user.name } </Text>    
                </View>   
                <View style={styles.contentText}>    
                    <Text  style={styles.itemText}> {month}: {user.streck} /30 </Text>       
                </View>  
                <View style={styles.contentText}>    
                    <Text  style={styles.itemText}> Förra månaden: {user.lastMonth} /30 </Text>      
                </View>  
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
            
            
            
            <View style={styles.list}>
                <FlatList
                    data={dynamicTodos}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => pressTodoHandler(item, user)}>
                            <Card>
                                <MaterialIcons name={item.icon} size={24} color="black" />
                                <Text> { item.title } ( { item.streck } )</Text>    
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
    contentContainer: {
        marginVertical: 20,
        padding: 10,
        height: '50', 
        backgroundColor: '#56EEEE',
        borderRadius: 10,
        borderColor: '#56EEEE',
        flex: 1,        
        flexDirection:'column',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        
    },
    contentText: {
        
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'baseline',
        backgroundColor: 'green',
    },
    list: {
        flex: 2,
    },
    stars: {
        flex: 1,
        fontSize: 24,
        flexDirection: 'row',
        paddingRight: 50,
    },       
    itemText: {
        fontSize: 20,
    },  
    iconLeft: {
        flex: 1,
    }, 
    
    modalToggle: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
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