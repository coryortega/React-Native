import axios from 'axios';
import * as React from 'react';
import { StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTrackInfo } from "../Redux/Spotify/spotify.actions";
import { fetchDevicesAsync, pauseAsync, playTrackAsync, getUsersTopTracks, getAudioInfo } from '../api';
import Chart from './Chart';

function Player(props: any) {

  const [tracks, setTracks] = React.useState([]);

  React.useEffect(()=> {
    getUsersTopTracks().then(res => {
      console.log(res);
      setTracks(res.items);
    })
  }, [])

  // React.useEffect(()=> {
  //   console.log(props.traits)
  // }, [props.traits])

  return (
    <View>
      <Chart traits={props.traits}/>
      {tracks.map((track, key) => (
        <View key={key}>
          <View>
            <Text>
              {track.name}
            </Text>
            <Button title="Play" onPress={() => {props.getTrackInfo(track.id); playTrackAsync({uri: track.uri})}}/>
          </View>
        </View>
      ))}
      <Button title="Pause" onPress={() => pauseAsync()}/>
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


const mapStateToProps = (state: any) => ({
    traits: state.getTrackInfoReducer
})

export default connect(mapStateToProps, {getTrackInfo})(Player);