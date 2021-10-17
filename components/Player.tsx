import * as React from "react";
import Swipeout from 'react-native-swipeout';
import { StyleSheet, Button, TouchableOpacity, Image } from "react-native";
import { Text, View } from "./Themed";
import { connect } from "react-redux";
import {
  getTrackInfo,
  getCurrentPlayback,
  getCurrentTrack
} from "../Redux/Spotify/spotify.actions";
import { getDSSongs } from "../Redux/DS/ds.actions";
import {
  playTrackAsync
} from "../api";
import Chart from "./Chart";
import Radar from "./Radar";
import CurrentlyPlayingCard from "./CurrentlyPlayingCard";
import SongListCard from "./SongListCard";
import { Dimensions, Animated } from 'react-native';

const windowWidth = Dimensions.get('window').width;

function Player(props: any) {
  const initialSong = {
    songName: "",
    artist: "",
    album: "",
    albumImage: "",
    trackId: "",
  };

  const [currentSong, setCurrentSong] = React.useState(initialSong);
  //const [fetchSong, setFetchSong] = React.useState("");

  React.useEffect(() => {
   // var interval = setInterval(pollPlayback, 1000);
    // function pollPlayback() {
    //     props.getCurrentPlayback();
    //   }

      // if(props.initialPlayback.item.id != currentSong.trackId) {
      //   setFetchSong(props.initialPlayback.item.id)
      // }

      // console.log(props.initialPlayback.item.id)

    props.getCurrentPlayback();
    props.getDSSongs();
  }, []);

  React.useEffect(() => {
    props.getTrackInfo(props.initialPlayback.item.id);
    setCurrentSong({
      ...currentSong,
      songName: props.initialPlayback.item.name,
      artist: props.initialPlayback.item.artists?.[0].name,
      album: props.initialPlayback.item.album?.name,
      albumImage: props.initialPlayback.item.album?.images[0].url,
      trackId: props.initialPlayback.item.id,
    });
  }, [props.initialPlayback.item]);

  const songArray = [];

  for (let key in props.tracks) {
    songArray.push(props.tracks[key]);
  }

  function currentlyPlaying(id: any, uri: any, image: any, name: any, artist: any, album: any) {
    props.getTrackInfo(id);
    playTrackAsync({ uri: uri });
    setCurrentSong({
      ...currentSong,
      albumImage: image,
      songName: name,
      artist: artist,
      album: album,
      trackId: id,
    });
  }

  let swipeBtns = [{
    text: 'Add to Chart',
    backgroundColor: '#1DB954',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)'
  }];



  return (

    <View>
      <CurrentlyPlayingCard
        songImage={currentSong.albumImage}
        songName={currentSong.songName}
        artist={currentSong.artist}
        album={currentSong.album}
      />
      <View style={styles.chart}>
        {/* <Chart traits={props.traits} /> */}
        <Radar traits={props.traits} />
      </View>
      <View
        style={styles.separator}
        lightColor="rgba(255,255,255,0.1)"
        darkColor="rgba(255,255,255,0.1)"
      />
      {songArray.map((track, key) => (
        <Swipeout left={swipeBtns}>
          <SongListCard
            key={key}
            currentSong={currentSong}
            playing={currentlyPlaying}
            id={track.id}
            uri={track.uri}
            songImage={track.album.images[1].url}
            songName={track.name}
            artist={track.artists[0].name}
            album={track.album.name}
          />
        </Swipeout>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginBottom: 20,
    height: 1,
  },
  chart: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //margin: 25,
    // borderColor: 'blue',
    // borderWidth: 2,
    width: windowWidth
  },
});

const mapStateToProps = (state: any) => ({
  traits: state.getTrackInfoReducer,
  tracks: state.getDSSongsReducer,
  initialPlayback: state.getCurrentPlaybackReducer,
  currentPlayback: state.getCurrentTrackReducer
});



export default connect(mapStateToProps, {
  getTrackInfo,
  getDSSongs,
  getCurrentPlayback,
  getCurrentTrack
})(Player);
