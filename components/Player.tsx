import * as React from 'react';
import { StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import { connect } from 'react-redux';
import { getTrackInfo } from "../Redux/Spotify/spotify.actions";
import { getDSSongs } from "../Redux/DS/ds.actions";
import { fetchDevicesAsync, pauseAsync, playTrackAsync, getUsersTopTracks } from '../api';
import Chart from './Chart';

function Player(props: any) {

  const [tracks, setTracks] = React.useState([]);

  React.useEffect(()=> {
    props.getDSSongs();
    getUsersTopTracks().then(res => {
      setTracks(res.items);
    })
  }, [])


  console.log("ds tracks in player", Object.keys(props.tracks));


  return (
    <View>
      <Chart traits={props.traits}/>
      {[props.tracks].map((track, key) => ( console.log(track),
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
    traits: state.getTrackInfoReducer,
    tracks: state.getDSSongsReducer
})

export default connect(mapStateToProps, {getTrackInfo, getDSSongs})(Player);