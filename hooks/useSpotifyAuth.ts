import { useEffect, useState, useContext } from "react";
import { Platform } from "react-native";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { fetchTokenAsync, fetchToken } from "../api";
import { AuthContext } from "../components/context";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const CLIENT_ID = "5d228af4d8fe45d5b1bb9702187643c0";

WebBrowser.maybeCompleteAuthSession();

export default function useSpotifyAuth() {
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
        console.log("success getting code!", authResponse.params.code);
        const code: object = {"code": authResponse.params.code}
        const result = await fetchToken(code);
        if (result.error || !result.token) {
          setError(result.error ?? "Unknown error");
        } else {
          //   await LocalStorage.setAuthCredentialsAsync({
          //     ...result,
          //     lastRefreshed: new Date(),
          //   });
          console.log("success getting token! here it is", result);
          signIn(result.token);
          setIsAuthenticated(true);
        }
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
