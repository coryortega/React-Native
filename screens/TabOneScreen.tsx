import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { Text, View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function TabOneScreen() {
  const [artists, setArtists] = React.useState<any | object>({})

  React.useEffect(() => {
    // const result = await axios();
    axios.get('https://tenderfy.herokuapp.com/artists')
    .then(res => {
      // console.log(res.data["0"]["artists"])
      setArtists(res.data)
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Artists</Text>
      <ScrollView
        showsVerticalScrollIndicator ={false}
        showsHorizontalScrollIndicator={false}>
      <View style={styles.innerContainer}>
        {Object.keys(artists).map((artist, key) => (
          <View key={key} style={styles.artistContainer}>
            <View>
              <Text style={styles.innerContainer}>
                {artists[artist]["name"]}
              </Text>
              <Image
                style={styles.image}
                source={{uri: artists[artist]["images"]}}
              />
            </View>
          </View>
        ))}
      </View>
      </ScrollView>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15
  },
  innerContainer: {
    flex: 1,
    // flexDirection: 'column'
    // justifyContent: 'flex-start',
    fontWeight: "400",
    fontSize: 15,
    marginBottom: 8,
    textAlign: "center"
  },
  artistContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10
    // textShadow: '2px 2px white',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
