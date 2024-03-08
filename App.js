import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './common/routes';


export const UserContext = React.createContext();
export const ProfileContext = React.createContext();
export const ApprovalsContext = React.createContext();

const App = () => {
  const [user, setUser] = useState('No user');  
  const [profile, setProfile] = useState(); 
  const [approvals, setApprovals] = useState(); 

  
  return (
    <SafeAreaProvider>
      <UserContext.Provider value={{user, setUser}}>              
        <ProfileContext.Provider value={{profile, setProfile}}> 
          <ApprovalsContext.Provider value={{approvals, setApprovals}}>
            <Routes/>
          </ApprovalsContext.Provider> 
        </ProfileContext.Provider> 
      </UserContext.Provider>       
    </SafeAreaProvider>   
  );
}

export default App;

