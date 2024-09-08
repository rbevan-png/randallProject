// HelloWorldScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Button, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


const HelloWorldScreen = ( ) => {

  const handleGetCharacters = async () => {
    try {
      const response = await fetch('https://ajrzre12o7.execute-api.us-east-1.amazonaws.com/dev', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Role': role
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const jsonData = await response.json();
      // setData(jsonData);

      Alert.alert('API Results', JSON.stringify(jsonData))
    } catch (error) {
      Alert.alert('Error', `Failed to fetch data: ${error.message}`);
    }
  };

  const [signedIn, setSignedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState('user');
  const [items, setItems] = useState([
    { label: 'User', value: 'user'},
    { label: 'Manager', value: 'manager'},
    { label: 'Admin', value: 'admin'}
  ]);

  const handleSignIn = async () => {
    try {
      const response = await fetch('https://ajrzre12o7.execute-api.us-east-1.amazonaws.com/dev', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Role': role  
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('API Response:', data);

      Alert.alert('API Response', JSON.stringify(data));
      setSignedIn(true);
      
    } catch (error) {
      Alert.alert('Error', `Failed to fetch data: ${error.message}`);
    }
  };

  if (signedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Signed in as: {role}</Text>
        
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Death Star Data</Text>
      <Text style={styles.text}>Select Role:</Text>

      <DropDownPicker
        open={open}
        value={role}
        items={items}
        setOpen={setOpen}
        setRole={setRole}
        setItems={setItems}
        containerStyle={styles.pickerContainer}
        style={styles.picker}
        dropDownStyle={styles.dropDownPicker}
      />

      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Gets Star Wars Characters" onPress={handleGetCharacters} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pickerContainer: {
    width: '80%',
    marginBottom: 20,
    borderWidth: Platform.OS === 'ios' ? 1: 0,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default HelloWorldScreen;
