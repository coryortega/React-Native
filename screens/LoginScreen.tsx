import * as React from 'react';
import { Platform, StyleSheet, Button } from 'react-native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { Text, View} from '../components/Themed';
import LoginButton from '../components/LoginButton';
import Album_background from '../assets/images/albumsbackground.svg';
// import authHandler from "../components/utils/authenticationHandler";
//import { useNavigation } from '@react-navigation/native';
import SvgBackground from '../assets/SvgBackground';
import useSpotifyAuth from "../hooks/useSpotifyAuth";

import {
  fetchDevicesAsync
} from "../api";


const Login = ({ navigation }: any) => {
  const { isAuthenticated, error, authenticateAsync } = useSpotifyAuth();




  console.log("is auth'd -->", isAuthenticated)

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchDevicesAsync().then(res => {
      })
      navigation.navigate('Root')
    }
  }, [isAuthenticated]);

  React.useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundWrapper}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Discover songs by their traits</Text>
          <Text style={styles.subTitle}>We'll curate a playlist based on the different traits of songs you like in your Spotify library.</Text>
        </View>
        <SvgBackground/>
      </View>
      <View style={styles.loginScreenButton}>
        <Button color={Platform.OS === 'ios' ? 'white' : '#e21051'} title={'Sign in with Spotify'} onPress={() => authenticateAsync()}/>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  wrapper: {
    ...Platform.select({
      ios:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop:110,
        width: '85%',
      },
      default:{
        textAlign: 'center',
        width: '50%',
      }
    })
  },
  title:{
    ...Platform.select({
      ios:{
        fontSize: 39,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 15
      },
      default:{
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 15
      }
    }) 
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '200',
  },
  backgroundWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:0
  },
  loginScreenButton:{
    ...Platform.select({
      ios:{
        marginRight:40,
        marginLeft:40,
        marginTop:110,
        paddingTop:8,
        width: '60%',
        paddingBottom:8,
        backgroundColor:'#e21051',
        borderRadius:10,
        borderWidth: 1,
      },
      default: {
        backgroundColor: 'blue',
      }
    })
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  }
});

export default Login
