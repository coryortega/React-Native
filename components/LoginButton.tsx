import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Platform, StyleSheet, Button } from 'react-native';
import qs from 'qs';
import axios from 'axios';
import {authorize, refresh} from 'react-native-app-auth';

import { AuthContext } from './context';
import Navigation from '../navigation';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};


const LoginButton = (props: any) => {
    let scopes = 
        [
            "streaming",
            "user-read-currently-playing",
            "user-read-playback-state",
            "user-library-read",
            "user-library-modify",
            "user-modify-playback-state",
            "user-read-email",
            "user-top-read",
            "user-read-private",
            "playlist-modify-public",
            "playlist-modify-private"
          ];


    const { signIn } = React.useContext(AuthContext);

    const [request, response, promptAsync] = useAuthRequest(
        {
        clientId: '5d228af4d8fe45d5b1bb9702187643c0',
        scopes: scopes,
        // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
        // this must be set to false
        usePKCE: false,
        // For usage in managed apps using the proxy
        redirectUri: Platform.OS === 'ios' ? 'exp://ep-rs6.coryortega.react-native.exp.direct:80' : 'http://localhost:19006/'
        // redirectUri: makeRedirectUri({
        //     // For usage in bare and standalone
        //     native: 'your.app://redirect',
        //   }),
        },
        discovery
    );

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;


            const headers = {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                }
            };
            const data = {
                grant_type: "authorization_code",
                code: code,
                redirect_uri: 'http://localhost:19006/',
                client_id: '5d228af4d8fe45d5b1bb9702187643c0',
                client_secret: '2e64ed63024a402d81fde645767a3680',
            };

            axios.post('https://accounts.spotify.com/api/token', qs.stringify(data), headers)
            .then(res => {
                const token = res.data;
                console.log("this is token:", token)
                signIn(token.access_token);
                // props.navigation.navigate('Login')
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [response]);
//response
    return (
        <Button
        disabled={!request}
        title="Login with Spotify"
        // style={styles.button}
        color={Platform.OS === 'ios' ? 'white' : '#e21051'}
        onPress={() => {
            console.log('signing in');
            promptAsync();
            // navigation.navigate('TabOne', { name: 'TabOne' })
            // response?.type === 'success' ? props.navigation.navigate('Home')
            }}
        />
    );
}

export default LoginButton
