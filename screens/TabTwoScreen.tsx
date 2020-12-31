import * as React from 'react';
import { StyleSheet } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import axios from 'axios';


export default function TabTwoScreen() {

  const [genres, setGenres] = React.useState<any | object>({})

  React.useEffect(() => {
    // const result = await axios();
    axios.get('https://tenderfy.herokuapp.com/genres')
    .then(res => {
      // console.log(res.data["0"]["Genres"])
      setGenres(res.data)
    })
  }, [])

  if(Object.keys(genres).length > 0) {
    console.log(genres["0"]["Genres"])
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Five Genres</Text>
      <View style={styles.innerContainer}>
        {Object.keys(genres).map((genre, key) => (
          <Text key={key} style={styles.genres}>{key + 1}: {genres[genre]["Genres"]}</Text>
        ))}
      </View>
      {/* <Text>{Object.keys(genres).length > 0 ? genres["0"]["Genres"] : "Nothing"}</Text> */}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
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
