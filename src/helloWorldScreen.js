// HelloWorldScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Button, Platform, TextInput, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


const HelloWorldScreen = ( ) => {


  const [signedIn, setSignedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [queryOpen, setQueryOpen] = useState(false);
  const [value, setValue] = useState('user');
  const [query, setQuery] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [inputPerson, setInputPerson] = useState('');
  const [planetNames, setPlanetNames] = useState([]);
  const [showPlanets, setShowPlanets] = useState(false);
  const [peopleNames, setPeopleNames] = useState([]);
  const [showPeople, setShowPeople] = useState(false);
  const [isLoadingPeople, setIsLoadingPeople] = useState(false);
  const [isLoadingPlanets, setIsLoadingPlanets] = useState(false);
  const [personDetails, setPersonDetails] = useState([]);
  const [isLoadingPerson, setIsLoadingPerson] = useState(false);
  const [showPerson, setShowPerson] = useState(false);
  const [items, setItems] = useState([
    { label: 'User', value: 'User'},
    { label: 'Manager', value: 'Manager'},
    { label: 'Admin', value: 'Admin'}
  ]);


  const [allowedActions, setAllowedActions] = useState([]); 
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

      const bodyData = JSON.parse(data.body);
      const permissions = bodyData.message;

      const allowed = Object.keys(permissions).filter(action => permissions[action] === true).map(action => ({
        label: action, value: action
      }));

      let formattedPerms = Object.entries(permissions).map(([key, value]) => `${key}: ${value ? 'Allowed' : 'Denied'}`).join('\n');

      setAllowedActions(allowed);
      setResponseData(formattedPerms);
      setSignedIn(true);
      
    } catch (error) {
      Alert.alert('Error', `Failed to fetch data: ${error.message}`);
    };
  };

  const handleQueryPress = async() => {
    if (query == 'SearchPlanets') {
      setShowPlanets(true);
      fetchAllPlanets();
    } else if (query == 'ListPeople') {
      setShowPeople(true);
      fetchAllPeople();
    } else if (query == 'SearchPerson' && inputPerson) {
      setShowPerson(true);
      // Alert.alert(`${inputPerson}`);
      fetchPersonByName('https://swapi.dev/api/people/', inputPerson);
    }
  };

  const handleActionSelection = () => {
    if (query === 'SearchPerson') {
      setShowTextInput(true);
    } else {
      setShowTextInput(false); 
    }
  }

  const fetchAllPlanets = async (url = 'https://swapi.dev/api/planets', allPlanets = []) => {
    try {
      setIsLoadingPlanets(true);  
      const response = await fetch(url);
      const data = await response.json();
      

      const currentPlanets = data.results.map(planet => planet.name);
      const newPlanets = [...allPlanets, ...currentPlanets];

     
      if (data.next) {
        return fetchAllPlanets(data.next, newPlanets);  
      } else {
        setPlanetNames(newPlanets);  
        setIsLoadingPlanets(false);
        return newPlanets;
      }
    } catch (error) {
      Alert.alert('Error', `Failed to fetch planets: ${error.message}`);
      setIsLoadingPlanets(false);
    }
  };

  const fetchAllPeople = async (url = 'https://swapi.dev/api/people', allPeople = []) => {
    try {
      setIsLoadingPeople(true);  
      const response = await fetch(url);
      const data = await response.json();
      

      const currentPeople = data.results.map(people => people.name);
      const newPeople = [...allPeople, ...currentPeople];

     
      if (data.next) {
        return fetchAllPeople(data.next, newPeople);  
      } else {
        setPeopleNames(newPeople);  
        setIsLoadingPeople(false);
        return newPeople;
      }
    } catch (error) {
      Alert.alert('Error', `Failed to fetch people: ${error.message}`);
      setIsLoadingPeople(false);
    }
  };

  const fetchPersonByName = async (url = 'https://swapi.dev/api/people/', personName) => {
    try {
      setIsLoadingPerson(true);
      const cleanPersonName = personName.trim().toLowerCase(); 
      const response = await fetch(url);
      const data = await response.json();
  
      console.log('SWAPI People Response:', data); 
  
      const matchingPerson = data.results.find(person => person.name.toLowerCase() === cleanPersonName);
  
      if (matchingPerson) {
        const { name, height, mass, birth_year } = matchingPerson;
        setPersonDetails({ name, height, mass, birth_year });
        setIsLoadingPerson(false);
      } else if (data.next) {
        return fetchPersonByName(data.next, cleanPersonName);
      } else {
        setPersonDetails('Not Found');
        setIsLoadingPerson(false);
      }
    } catch (error) {
      Alert.alert('Error', `Failed to fetch person: ${error.message}`);
      setIsLoadingPerson(false);
    }
  };


 

  return (
    <View style={styles.container}>
    {signedIn ? (
      <>
        <Text style={styles.text}>Signed in as: {value}</Text>
        <Text style={styles.text}>Permissions:</Text>
         <View style={styles.permissionsContainer}>
            <Text style={styles.permissionsText}>Permissions:</Text>
            {responseData && (
              <>
                {responseData.split('\n').map((line, index) => (
                  <Text key={index} style={styles.permissionItem}>
                    {line}
                  </Text>
                ))}
              </>
            )}
          </View>

          <View style={{ marginBottom: 20 }} />
        
        <DropDownPicker
          open={queryOpen}
          value={query}
          items={allowedActions}
          setOpen={setQueryOpen}
          setValue={setQuery}
          setItems={setAllowedActions}
          containerStyle={styles.pickerContainer}
          onChangeValue={handleActionSelection}
          style={styles.picker}
          dropDownStyle={styles.dropDownPicker}
          placeholder="Select a Query"
        />

        {showTextInput && (
          <TextInput
            style={styles.input}
            placeholder="Enter Person's Name"
            value={inputPerson}
            onChangeText={setInputPerson}
          />
        )}

        <Button title="Query" onPress={handleQueryPress} />

        {query === "SearchPlanets" && showPlanets && (
          <>
            {isLoadingPlanets ? (
              <Text>Loading planets...</Text>
            ) : (
              <ScrollView style={styles.scrollView}>
                {planetNames.map((planet, index) => (
                  <Text key={index} style={styles.planetName}>
                    - {planet}
                  </Text>
                ))}
              </ScrollView>
            )}
          </>
        )}

        {query === "ListPeople" && showPeople && (
          <>
            {isLoadingPeople ? (
              <Text>Loading people...</Text>
            ) : (
              <ScrollView style={styles.scrollView}>
                {peopleNames.map((people, index) => (
                  <Text key={index} style={styles.planetName}>
                    - {people}
                  </Text>
                ))}
              </ScrollView>
            )}
          </>
        )}

        {query === 'SearchPerson' && (
            <>
              {isLoadingPerson ? (
                <Text>Loading person details...</Text>
              ) : personDetails ? (
                personDetails === 'Not Found' ? (
                  <Text>Person not found</Text>
                ) : (
                  <ScrollView style={styles.dynamicScrollView} contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.personDetail}>Name: {personDetails.name}</Text>
                    <Text style={styles.personDetail}>Height: {personDetails.height}</Text>
                    <Text style={styles.personDetail}>Mass: {personDetails.mass}</Text>
                    <Text style={styles.personDetail}>Birth Year: {personDetails.birth_year}</Text>
                  </ScrollView>
                )
              ) : null}
            </>
          )}

      </>
    ) : (
      <>
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
      </>
    )}
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
  dropDownPicker: {
    backgroundColor: '#fafafa',
  },
  responseText: {
    fontSize: 18,
    color: 'blue',
    marginTop: 10,
  },
  scrollView: {
    marginTop: 20,
    width: '80%',
    maxHeight: 200,
    backgroundColor: '#f0f0f0',  
    borderColor: '#ccc',  
    borderWidth: 1,  
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
  planetName: {
    fontSize: 16,
    marginBottom: 5,
  },
  permissionsContainer: {
    backgroundColor: '#e0e0e0',  // Light grey background
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,  // Added spacing below the permissions area
  },
  permissionsText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  permissionItem: {
    fontSize: 16,
    color: 'blue',  // Assuming permissions are links or need to be highlighted
  },
  dynamicScrollView: {
    maxHeight: 100,  // Set a maximum height for the scroll view
    minHeight: 50,   // Set a minimum height so it doesn't collapse when content is small
    width: '80%',
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    flexShrink: 1,  // Allow the scroll view to shrink when the content is small
  },
  scrollContent: {
    paddingVertical: 10,
  },
});

export default HelloWorldScreen;
