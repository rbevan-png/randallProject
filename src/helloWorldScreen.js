// HelloWorldScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Button, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

const HelloWorldScreen = ( ) => {

  const handleGetCharacters = async () => {
    try {
      const response = await fetch('https://z84brcet9k.execute-api.us-east-1.amazonaws.com/dev/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Role': value
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
  const [value, setValue] = useState('user');
  const [items, setItems] = useState([
    { label: 'User', value: 'User'},
    { label: 'Manager', value: 'Manager'},
    { label: 'Admin', value: 'Admin'}
  ]);

  const [responseData, setResponseData] = useState(null);

  const handleSignIn = async () => {

    let endpoint = '';

    if (value === 'User') {
      endpoint = 'https://z84brcet9k.execute-api.us-east-1.amazonaws.com/dev/user';
    } else if (value === 'Manager') {
      endpoint = 'https://z84brcet9k.execute-api.us-east-1.amazonaws.com/dev/manager';
    } else if (value === 'Admin') {
      endpoint = 'https://z84brcet9k.execute-api.us-east-1.amazonaws.com/dev/admin';
    }

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Role': value
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('API Response:', data);


      // Alert.alert('API Response', JSON.stringify(data));
      // setResponseData(data.body);
      const bodyData = JSON.parse(data.body);
      const permissions = bodyData.message;
      let formattedPerms = '';
      for (const action in permissions) {
        formattedPerms += `${action}: ${permissions[action] ? 'Allowed' : 'Denied'}\n`
      }
      Alert.alert('API Response', formattedPerms);
      setResponseData(formattedPerms);

      setSignedIn(true);
      
    } catch (error) {
      Alert.alert('Error', `Failed to fetch data: ${error.message}`);
    }
  };

  if (signedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Signed in as: {value}</Text>
        <Text style={styles.text}>Response Data:</Text>
        <Text style={styles.responseText}>{responseData}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Death Star Data</Text>
      <Text style={styles.text}>Select Role:</Text>

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
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
  responseText: {
    fontSize: 18,
    color: 'blue',
    marginTop: 10,
  }
});

export default HelloWorldScreen;
