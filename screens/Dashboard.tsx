import * as React from 'react';
import LoginButton from '../components/LoginButton';
import Player from '../components/Player';
import { StyleSheet, Button, ScrollView } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { fetchDevicesAsync } from '../api';



export default function Dashboard() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator = {false}
        showsHorizontalScrollIndicator = {false}
      >
        <Player/>
      </ScrollView>
      <Button title="Get devices" onPress={() => console.log(fetchDevicesAsync())}/>
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