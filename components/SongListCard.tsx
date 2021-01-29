import * as React from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View } from './Themed';

export default function SongListCard(props: any) {

    function currentlyPlaying(id, uri, image, name, artist, album) {
        props.playing(id, uri, image, name, artist, album);
    }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: props.songImage}}
      />
      <View style={styles.song}>
          <Text style={styles.songName}>
              {props.songName}
          </Text>
          <Text style={styles.artist}>
              {props.artist}
          </Text>
      </View>
      {/* <Button title="Play" onPress={() => currentlyPlaying(props.id, props.uri, props.songImage, props.songName, props.artist, props.album)}/> */}
      <TouchableOpacity
        onPress={() => currentlyPlaying(props.id, props.uri, props.songImage, props.songName, props.artist, props.album)}
        style={{
            borderWidth:1,
            borderColor:'rgba(0,0,0,0.2)',
            alignItems:'center',
            justifyContent:'center',
            width:50,
            height:50,
            backgroundColor:'black',
            borderRadius:25,
        }}
    >
       <AntDesign name="caretright" size={24} color="white" />
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    width: '420px'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  song: {
      width: '300px',
      margin: 10
    // flex: 1,
    // flexDirection:'row',
    // // alignItems: 'center',
    // // justifyContent: 'center',
  },
  songName: {
    fontSize: 18
  },
  artist: {
    fontSize: 13
  },
  image: {
    width: 50,
    height: 50,
  },
});