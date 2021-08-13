import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text
} from 'react-native';

import { useDispatch } from 'react-redux';

import * as usersActions from '../store/action/users';

import { Picker } from '@react-native-picker/picker';


const EditUserScreen = props => {

  const [userName, setUserName] = useState(null);
  const [age, setAge] = useState(null);
  const [address, setAddress] = useState(null);
  const [activity, setActivity] = useState(null);

  const dispatch = useDispatch();

  const submitHandler = useCallback(async () => {
    try {
        await dispatch(
          usersActions.createUser(
            userName,
            age,
            address,
            activity
          )
        );      
      props.navigation.goBack();
    } catch (err) {
      throw(err)
    }    
  }, [dispatch, userName, age, address, activity]);

      return (
        
        <View style={styles.form}>
          <Text>User Name</Text>
          <TextInput
            placeholder="User Name"
            
            style={styles.input}

            errorText="Please enter a valid name!"
            keyboardType="default"
            returnKeyType="next"
            
            onChangeText={
              (e) => {
                setUserName(e);                
            }
          }
           
            required
            />
          <Text>Age</Text>

          <TextInput
            placeholder="Age"
          
            style={styles.input}
            errorText="Please enter a valid address!"
            keyboardType="decimal-pad"
            returnKeyType="next"
            
            onChangeText={
              (e) => {
                setAge(e);                
            }}
            required
          />

          <Text>Address</Text>

          <TextInput
            placeholder="Address"
          
            style={styles.input}
            errorText="Please enter a valid address!"
            keyboardType="default"
            returnKeyType="next"
            
            onChangeText={
              (e) => {
                setAddress(e);                
            }}            
            required
/>
        <Text>Fitness Activity</Text>

        <Picker                    
              style = {styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                {setActivity(itemValue)}              
            }>
            <Picker.Item label="Yoga" value="Yoga" />
            <Picker.Item label="Aerobics" value="Aerobics" />

        </Picker>
          
         <Button title="Submit" onPress={submitHandler} color='green'/>
        </View>
    
  );
};


const styles = StyleSheet.create({
  form: {
    margin: 20,
    flex: 1,
    // alignItems: 'center',
    marginTop: 40,
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {

    backgroundColor: "#e0e0e0",
    // textAlign: 'center',    
    paddingHorizontal: 5,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 5 
  },

  picker : {
    width: 180,
    height: 50,
    marginBottom: 30,
  },
     
});




export default EditUserScreen;
