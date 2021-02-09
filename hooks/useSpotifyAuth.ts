import { useEffect, useState, useContext } from "react";
import { Platform } from "react-native";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { fetchTokenAsync } from "../api";
import { AuthContext } from "../components/context";
import { connect } from 'react-redux';
import { getUserToken } from '../Redux/Spotify/spotify.actions';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const CLIENT_ID = "5d228af4d8fe45d5b1bb9702187643c0";

WebBrowser.maybeCompleteAuthSession();

function useSpotifyAuth() {
  const [error, setError] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { signIn } = useContext(AuthContext);

  const [authRequest, authResponse, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      usePKCE: false,
      scopes: [
        "streaming",
        "user-read-email",
        "playlist-modify-public",
        "playlist-read-private",
        "user-read-playback-state",
        "app-remote-control",
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing",
        "user-top-read",
        "user-library-read",
      ],
      redirectUri:
        Platform.OS === "ios"
          ? "exp://ep-rs6.coryortega.react-native.exp.direct:80"
          : "http://localhost:19006/",
      extraParams: {
        // On Android it will just skip right past sign in otherwise
        show_dialog: "true",
      },
    },
    discovery
  );

  useEffect(() => {
    async function updateFromAuthResponseAsync() {
      if (authResponse === null) {
        return;
      } else if (authResponse.type === "error") {
        setError(authResponse.error);
        return;
      } else if (authResponse.type === "success") {
          const code: string = authResponse.params.code;
          const result = await fetchTokenAsync(
            code
          );
          console.log(result)
          // localStorage.setItem('token', JSON.stringify(result?.data));
          const currentSeconds = new Date().getTime() / 1000;
          // AsyncStorage.setItem("token", result?.data.access_token)
          // AsyncStorage.setItem("refresh", result?.data.refresh_token)
          // AsyncStorage.setItem('tokenTime', `${currentSeconds}`);

          await SecureStore.setItemAsync("tokenTime", `${currentSeconds}`);
          await SecureStore.setItemAsync("token", result?.data.access_token);
          await SecureStore.setItemAsync("refresh", result?.data.refresh_token);
        }
      }
      if (!isAuthenticated) {
        updateFromAuthResponseAsync();
      }
    }, [authResponse]);

  return {
    error,
    isAuthenticated,
    authenticateAsync: () => promptAsync(),
  };
}

export default useSpotifyAuth
