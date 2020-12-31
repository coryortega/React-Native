import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import qs from 'qs';
import axios from 'axios';

import { AuthContext } from './context';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};


const LoginButton = () => {

    const { signIn } = React.useContext(AuthContext);

    const [request, response, promptAsync] = useAuthRequest(
        {
        clientId: '5d228af4d8fe45d5b1bb9702187643c0',
        scopes: ['user-read-email', 'playlist-modify-public'],
        // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
        // this must be set to false
        usePKCE: false,
        // For usage in managed apps using the proxy
        redirectUri:'exp://ep-rs6.coryortega.react-native.exp.direct:80'
        // 'http://localhost:19006/'
        //   redirectUri: makeRedirectUri({
        //     // For usage in bare and standalone
        //     native: 'https://www.google.com/',
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
                },
                auth: {
                username: '5d228af4d8fe45d5b1bb9702187643c0',
                password: '2e64ed63024a402d81fde645767a3680',
                },
            };
            const data = {
                grant_type: 'client_credentials',
                code: code,
                scope: 'user-top-read'
            };

            axios.post('https://accounts.spotify.com/api/token', qs.stringify(data), headers)
            .then(res => {
                const token = res.data;
                signIn(token);

                axios.post("https://tenderfy.herokuapp.com/json/user-token", token)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [response]);

    return (
        <Button
        disabled={!request}
        title="Login with Spotify"
        color="#1DB954"
        onPress={() => {
            promptAsync();
            // navigation.navigate('TabOne', { name: 'TabOne' })
            // response?.type === 'success' ? props.navigation.navigate('Home')
            }}
        />
    );
}

export default LoginButton