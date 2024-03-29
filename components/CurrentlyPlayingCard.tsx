import * as React from 'react';
import { StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { Text, View } from './Themed';

export default function CurrentlyPlayingCard(props: any) {

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: props.songImage}}
      />
      <View style={styles.song}>
          <Text style={styles.title}>
              {props.songName}
          </Text>
          <Text style={styles.subTitle}>
              {props.artist}
          </Text>
          <Text style={styles.album}>
              {props.album}
          </Text>
      </View>
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
    fontSize: 23,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 17,
  },
  album: {
    fontSize: 17,
    fontWeight: '300'
  },
  song: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 280,
    height: 280,
    margin: 10,
    marginTop: 25
  },
});