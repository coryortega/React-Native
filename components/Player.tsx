import * as React from 'react';
import { StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { Text, View } from './Themed';
import { connect } from 'react-redux';
import { getTrackInfo } from "../Redux/Spotify/spotify.actions";
import { getDSSongs } from "../Redux/DS/ds.actions";
import { fetchDevicesAsync, pauseAsync, playTrackAsync, getUsersTopTracks } from '../api';
import Chart from './Chart';

function Player(props: any) {

  const [tracks, setTracks] = React.useState([]);
  const [songImage, setSongImage] = React.useState('');

  React.useEffect(()=> {
    props.getDSSongs();
    getUsersTopTracks().then(res => {
      setTracks(res.items);
    })
  }, [])

  console.log(props.tracks)

  const songArray = [];
  
  for(let key in props.tracks) {
    songArray.push(props.tracks[key])
  }

  console.log(songArray)

  function currentlyPlaying(id, uri, image) {
    props.getTrackInfo(id);
    playTrackAsync({uri: uri});
    setSongImage(image);
  }

  console.log(songImage);

  return (
    <View>
      <Image
        style={styles.logo}
        source={{uri: songImage}}
      />
      <Chart traits={props.traits}/>
      {songArray.map((track, key) => (
        <View key={key}>
          <View>
            <Text>
              {track.name}
            </Text>
            <Button title="Play" onPress={() => currentlyPlaying(track.id, track.uri, track.album.images[1].url)}/>
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
  logo: {
    width: 300,
    height: 300,
  },
});


const mapStateToProps = (state: any) => ({
    traits: state.getTrackInfoReducer,
    tracks: state.getDSSongsReducer
})

export default connect(mapStateToProps, {getTrackInfo, getDSSongs})(Player);