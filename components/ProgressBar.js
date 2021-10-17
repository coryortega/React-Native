import React, { Component, useEffect, useState } from 'react';

import { connect } from "react-redux";
import {
  getTrackInfo,
  getCurrentPlayback,
} from "../Redux/Spotify/spotify.actions";


import {
  View,
  Text,
  StyleSheet,
  Image,
  Slider,
  TouchableOpacity,
} from 'react-native';

// function pad(n, width, z = 0) {
//   n = n + '';
//   return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
// }

// const minutesAndSeconds = (position) => ([
//   pad(Math.floor(position / 60), 2),
//   pad(position % 60, 2),
// ]);

// {
//     trackLength,
//     currentPosition,
//     onSeek,
//     onSlidingStart,
//   }
const ProgressBar = (props) => {
//   const elapsed = minutesAndSeconds(currentPosition);
//   const remaining = minutesAndSeconds(trackLength - currentPosition);

    const [time, setTime] = useState(0);
    const [value, setValue] = useState(0)

    useEffect(() => {
        props.getCurrentPlayback()

        var i = 0;
        //var interval = setInterval(increment, 1000);
        const stop = 20;
        function increment() {
            i = i + 1;
            if (i === stop) {
              i = 0;
            }
            setValue(i);
          }

    },[])
// console.log(Object.keys(props.initialPlayback))
// console.log('penis-->', props.initialPlayback.item.duration_ms, "curr ms -->", props.initialPlayback.progress_ms)
  return (
    <View style={styles.container}>
      {/* <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.text, { color: "white" }]}>
          {elapsed[0] + ":" + elapsed[1]}
        </Text>
        <View style={{ flex: 1 }} />
        <Text style={[styles.text, { width: 40, color: "white" }]}>
          {trackLength > 1 && "-" + remaining[0] + ":" + remaining[1]}
        </Text>
      </View> */}
    {/* <Text>{JSON.stringify(props.initialPlayback)}</Text> */}
      <Slider
        style={{width: 360, height: 0}}
        minimumValue={0}
        maximumValue={20}
        value={value}
        minimumTrackTintColor="#e21051"
        maximumTrackTintColor="#000000"
        thumbTintColor= 'rgba(0, 0, 0, 0)'
        onSlidingComplete={currVal => setValue(currVal)}
      />
      {/* <Slider
        maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSeek}
        value={currentPosition}
        minimumTrackTintColor={{color:"white"}}
        maximumTrackTintColor={{color:"white"}}
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    marginBottom: 12,
  },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "white"
  },
  text: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    textAlign: 'center',
  }
});

const mapStateToProps = (state) => ({
    initialPlayback: state.getCurrentPlaybackReducer,
  });
  

export default connect(mapStateToProps, {
    getTrackInfo,
    getCurrentPlayback,
  })(ProgressBar);