import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View} from '../components/Themed';
import LoginButton from '../components/LoginButton';
// import authHandler from "../components/utils/authenticationHandler";

const Login = () => {

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Welcome!</Text>
      </View>
        <Text style={styles.subTitle}>please sign in with your Spotify account</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <LoginButton/>
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
    fontSize: 30,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '200',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  wrapper: {
    textAlign: 'center',
    marginBottom: 15
  }
});

export default Login
