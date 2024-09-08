import React from "react";
import { View, Text, StyleSheet} from 'react-native';

const SignedInScreen = ({ route}) => {
    const { role } = route.params;

    return (
        <View style={StyleSheet.container}>
            <Text style={styles.text}>Signed in as: {role}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SignedInScreen;