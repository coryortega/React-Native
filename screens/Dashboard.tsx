import * as React from 'react';
import LoginButton from '../components/LoginButton';
import Player from '../components/Player';
import { StyleSheet, Button } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { fetchDevicesAsync, pauseAsync, playTrackAsync, getUsersTopTracks } from '../api';


export default function Dashboard() {

  const [tracks, setTracks] = React.useState([]);

  React.useEffect(()=> {
    getUsersTopTracks().then(res => {
      console.log(res);
      setTracks(res.items);
    })
    // console.log(topTracks)
  }, [])

  return (
    <View style={styles.container}>
      {/* <Player/> */}
      <View>
        {tracks.map((track, key) => (
          <View key={key}>
            <View>
              <Text>
                {track.name}
              </Text>
              <Button title="Play" onPress={() => playTrackAsync({uri: track.uri})}/>
              {/* <Image
                style={styles.image}
                source={{uri: artists[artist]["images"]}}
              /> */}
            </View>
          </View>
        ))}
      </View>
      <Button title="Pause" onPress={() => pauseAsync()}/>
      <Button title="Get devices" onPress={() => console.log(fetchDevicesAsync())}/>
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