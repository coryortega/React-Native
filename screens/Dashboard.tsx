import * as React from 'react';
import LoginButton from '../components/LoginButton';
import Player from '../components/Player';
import { StyleSheet, Button } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { fetchDevicesAsync } from '../api';
import SpotifyWebApi from "spotify-web-api-js";

var s = new SpotifyWebApi();

// s.setAccessToken("BQA7bDXrWvhzJO-eZh4CYcblZkstXpO0mXizlnYXKxrpqHQJVRR25zweHMLqOvNrdaA791ImHYnigOhvliC7iKcmu5Y");

// import authHandler from "../components/utils/authenticationHandler";

export default function Dashboard() {
  s.setAccessToken("BQB8y-jh4LY3_LOnqQrPvG1HOw5lqi2zdt3ukZVAvL4zYM3RgOuz682cS_jtfT6hfaniuVzk_8JI8FIqV5gNTOxipDsRVyl78yJBCvIAwjZOpzvvtJB79VyWOLHXvpkcJ8z6gN-cbvFAkfWUsMkBmdBkyzH-62kn8jNdC7moOvWALWLAitsWaSzlvPHMRhfxfw3gQ0-9S8lrkva1OFhkWzREuXZ9O4C7ATWGuf8ElwA9-J0btaKZNBEDVaKVrldpOXO0k-Ohb8IShzk");
  React.useEffect(() => {
    s.searchTracks('Love').then(
      function (data) {
        console.log('Search by "Love"', data);
      },
      function (err) {
        console.error(err);
      }
    );
  }, [])

  // React.useEffect(() => {
  //   s.pause().then(
  //     function (data) {
  //       console.log('Search by "Love"', data);
  //     },
  //     function (err) {
  //       console.error(err);
  //     }
  //   );
  // }, [])

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Login</Text> */}
      <Player/>
      <Button title="Click me" onPress={() => s.pause()}/>
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