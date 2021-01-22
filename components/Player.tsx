import axios from 'axios';
import * as React from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View } from './Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Player(props: any) {

  const initialState = {
    token: null,
    item: {
      album: {
        images: [{ url: "" }]
      },
      name: "",
      artists: [{ name: "" }],
      duration_ms: 0
    },
    is_playing: "Paused",
    progress_ms: 0,
    no_data: false,
  };

  const [playing, setPlaying] = React.useState(initialState);

  function getCurrentlyPlaying(token: any) {
    console.log('this is token in player', token)
    const headers = {
      headers: {
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer BQC-s1EysUeM6vTVuK3LuJ1cgviqk4rHH0CHKd-lTLt8-0yyz02AOKQ8DNnV8_YA7nR5_0MCD0wLbiimRqpSc2s3pMX9eKlTMMus1D6eVzLCcNlFym9AG-wuP13XvD1kEj2VI4VDNKo3ou2Wpdx-aS_nFRgYKYHHfMUuBmM4NFehH7LvC7ybCVUvxBqA`
      }
    }
    //https://api.spotify.com/v1/me/player
    axios.get("https://api.spotify.com/v1/me/top/tracks", headers).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err)
    })
  }

  React.useEffect(() => {
    // const userToken =  AsyncStorage.getItem('token');
    const userToken =  AsyncStorage.getItem('token')
    getCurrentlyPlaying(userToken)
  }, [])

  return (
    <View style={styles.container}>
      <Text>{playing.item.artists[0].name}</Text>
      <Text>{playing.is_playing ? "Playing" : "Paused"}</Text>
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