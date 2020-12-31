import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Button, View } from 'react-native';
import { AuthContext } from './context';

WebBrowser.maybeCompleteAuthSession();

const LogOutButton = () => {

    const { signOut } = React.useContext(AuthContext);

    return (
        <View style={styles.button}>
            <Button
            title={'Logout'}
            onPress={() => {
                {signOut()}
                }}
            color="#1DB954"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        marginRight: 10
    }
  });

export default LogOutButton