import * as React from 'react';
import LoginButton from '../components/LoginButton';
import { StyleSheet, Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

// import authHandler from "../components/utils/authenticationHandler";

export default function Dashboard() {

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Login</Text> */}
      <LoginButton/>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});