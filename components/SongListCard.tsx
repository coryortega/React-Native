import * as React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text, View } from "./Themed";
import { pauseAsync } from "../api";

export default function SongListCard(props: any) {

  const [isPlaying, setIsPlaying] = React.useState(false);

  function setCurrentlyPlaying(id, uri, image, name, artist, album) {
    props.playing(id, uri, image, name, artist, album);
  }


  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: props.songImage }} />
      <View style={styles.song}>
        <Text style={styles.songName}>{props.songName}</Text>
        <Text style={styles.artist}>{props.artist}</Text>
      </View>
      <TouchableOpacity
        onPress={() => props.currentSong.trackId === props.id && isPlaying
          ? (pauseAsync(), setIsPlaying(false))
          : (setCurrentlyPlaying(
              props.id,
              props.uri,
              props.songImage,
              props.songName,
              props.artist,
              props.album,
            ), setIsPlaying(true))}
        style={styles.playButton}
      >
        {props.currentSong.trackId === props.id && isPlaying ? (
          <Ionicons name="pause" size={27} color="white" />
        ) : 
          <AntDesign name="caretright" size={24} color="white" />
        }
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "420px",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  song: {
    width: "300px",
    margin: 10,
  },
  songName: {
    fontSize: 18,
  },
  artist: {
    fontSize: 14,
    fontWeight: "200",
  },
  playButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: "black",
    borderRadius: 25,  
  },
  image: {
    width: 50,
    height: 50,
  },
});
