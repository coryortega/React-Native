import * as React from 'react';
import currentlyPlayingCard from './CurrentlyPlayingCard';
import { StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { Text, View } from './Themed';
import { connect } from 'react-redux';
import { getTrackInfo } from "../Redux/Spotify/spotify.actions";
import { getDSSongs } from "../Redux/DS/ds.actions";
import { fetchDevicesAsync, pauseAsync, playTrackAsync, getUsersTopTracks, getCurrentPlaybackState } from '../api';
import Chart from './Chart';
import { CurrentRenderContext } from '@react-navigation/native';
import CurrentlyPlayingCard from './CurrentlyPlayingCard';
import SongListCard from './SongListCard';

function Player(props: any) {

  const initialSong = {
    songName: "",
    artist: "",
    album: "",
    albumImage: "",
    trackId: ""
  }

  const [currentSong, setCurrentSong] = React.useState(initialSong);

  React.useEffect(()=> {
    props.getDSSongs();
  }, [])

  console.log(props.tracks)

  const songArray = [];
  
  for(let key in props.tracks) {
    songArray.push(props.tracks[key])
  }

  function currentlyPlaying(id, uri, image, name, artist, album) {
    props.getTrackInfo(id);
    playTrackAsync({uri: uri});
    setCurrentSong({...currentSong, albumImage: image, songName: name, artist: artist, album: album, trackId: id});
  }


  return (
    <View>
      <CurrentlyPlayingCard songImage={currentSong.albumImage} songName={currentSong.songName} artist={currentSong.artist} album={currentSong.album}/>
      <View style={styles.chart} >
        <Chart traits={props.traits}/>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {songArray.map((track, key) => (
      <SongListCard key={key} currentSong={currentSong} playing={currentlyPlaying} id={track.id} uri={track.uri} songImage={track.album.images[1].url} songName={track.name} artist={track.artists[0].name} album={track.album.name}/>
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
    marginBottom: 20,
    height: 1,
    // width: '80%',
  },
  chart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 25
  },
});


const mapStateToProps = (state: any) => ({
    traits: state.getTrackInfoReducer,
    tracks: state.getDSSongsReducer
})

export default connect(mapStateToProps, {getTrackInfo, getDSSongs})(Player);

