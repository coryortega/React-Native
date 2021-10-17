import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar'
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Text } from './Themed';
import { Alert, Modal, StyleSheet, TouchableHighlight, View, Image } from 'react-native';
import { connect } from "react-redux";
import {
  getCurrentPlayback,
  getCurrentTrack
} from "../Redux/Spotify/spotify.actions";


function ProgressBarContainer(props: any) {

  useEffect(() => {
    //var interval = setInterval(pollPlayback, 1000);
    function pollPlayback() {
      props.getCurrentTrack()
      }


  }, [])
  
  return (
    <View>
        <ProgressBar/>
        <View 
        style={styles.outerContainer}
      >
        <View>
          <View style={styles.leftSide}>
            <Image style={styles.image} source={{ uri: props.currentPlayback.item.album?.images[2].url }} />
            <View style={styles.textContainer}>
              <Text style={styles.songName}>{props.currentPlayback?.item?.name}</Text>
               <Text style={styles.artist}>{props.currentPlayback?.item?.artists?.[0].name}</Text>
          </View>
        </View>
        </View>    
        <View style={styles.playContainer}>
          {props.currentPlayback.is_playing ? (
            <FontAwesome5 name="pause-circle" size={39} color="white" />
          ) : (
            <FontAwesome5 name="play-circle" size={39} color="white" />
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 8,
    paddingRight: 15,
    paddingLeft: 15
    // borderWidth: 4,
    // borderColor: "yellow",
  },
  playContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  currentSong: {
    color: 'white'
  },

  leftSide: {
    flex: 1,
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  songName: {
    fontSize: 18,
  },
  artist: {
    fontSize: 14,
    fontWeight: "200",
  },

  image: {
    width: 50,
    height: 50,
    marginLeft: 2,
    marginRight: 10
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
});

const mapStateToProps = (state: any) => ({
  initialPlayback: state.getCurrentPlaybackReducer,
  currentPlayback: state.getCurrentTrackReducer
});



export default connect(mapStateToProps, {
  getCurrentPlayback,
  getCurrentTrack
})(ProgressBarContainer);
