import * as React from 'react';
import { StyleSheet } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import axios from 'axios';

import AntIcon from "react-native-vector-icons/AntDesign";
import { Ionicons, AntDesign } from '@expo/vector-icons';

import PlayButtonSVG from '../assets/PlayButtonSVG';
import Background from '../assets/SvgBackground';

export default function TabTwoScreen() {
  let data = [{
    "speed": 74,
    "balance": 29,
    "explosives": 40,
    "energy": 40,
    "flexibility": 30,
    "agility": 25,
    "endurance": 44
  }]

  let options = {
    width: 290,
    height: 290,
    margin: {
      top: 20,
      left: 20,
      right: 30,
      bottom: 20
    },
    r: 150,
    max: 100,
    fill: "#2980B9",
    stroke: "#2980B9",
    animate: {
      type: 'oneByOne',
      duration: 200
    },
    label: {
      fontFamily: 'Arial',
      fontSize: 14,
      fontWeight: true,
      fill: '#34495E',
      // onLabelPress: this.onLabelPress
    }
  }

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Five Genres</Text>
      {/* <View style={styles.innerContainer}>
        {Object.keys(genres).map((genre, key) => (
          <Text key={key} style={styles.genres}>{key + 1}: {genres[genre]["Genres"]}</Text>
        ))}
      </View> */}
      {/* <Text>{Object.keys(genres).length > 0 ? genres["0"]["Genres"] : "Nothing"}</Text> */}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <PlayButtonSVG/> */}
      {/* {/* <Background/> */}
      {/* <Radar data={data} options={options} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    paddingBottom: 15,
    textDecorationLine: 'underline'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'flex-start',
  },
  genres: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
