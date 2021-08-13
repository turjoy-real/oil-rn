import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { Drawer, AuthNavigator } from './DrawerNavigator';
import StartupScreen from '../screens/StartupScreen';


const AppNavigator = () => {  
 
  const isAuth = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);


  return (
  <NavigationContainer>   
    {isAuth && <Drawer/>}
    {!isAuth && didTryAutoLogin && <AuthNavigator /> }
    {!isAuth && !didTryAutoLogin && <StartupScreen /> }
  </NavigationContainer> 
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});


export default AppNavigator;
