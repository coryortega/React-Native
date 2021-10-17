import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPolarAxis, VictoryGroup, VictoryArea, VictoryLabel } from "victory-native";

// const characterData = [
//     { strength: 0.56, intelligence: .68, luck: 0.05, stealth: 0.1, charisma: 0.21 },
//     { strength: 0.4, intelligence: 0.24, luck: 0.90, stealth: 0.23, charisma: 0.50 },
//     // { strength: 5, intelligence: 225, luck: 3, stealth: 60, charisma: 120 }
//   ];


const initialData = [{Instrumentalness: 1, Liveness: 20, Speechiness: 7, Energy: 2, Acousticness: 1, Danceability: 3, Valence: 9}] 

  
export default function Radar (props) {

   let { acousticness, danceability, energy, valence, liveness, instrumentalness } = props.traits;

   const characterData = [
    { instrumentalness: 11, liveness: 21, speechiness: 14, energy: 12, acousticness: 7 },
   // { instrumentalness: 1, liveness: 250, speechiness: 1, energy: 40, acousticness: 50 }
    // { strength: 2, intelligence: 300, luck: 2, stealth: 80, charisma: 90 },
    // { strength: 5, intelligence: 225, luck: 3, stealth: 60, charisma: 120 }
  ];

  // console.log("props -->", acousticness, danceability, energy, valence, liveness, instrumentalness)

   function getMaxima(data) {
    const groupedData = Object.keys(data[0]).reduce((memo, key) => {
      memo[key] = data.map((d) => d[key]);
      return memo;
    }, {});
    return Object.keys(groupedData).reduce((memo, key) => {
      memo[key] = Math.max(...groupedData[key]);
      return memo;
    }, {});
  }

//   function processData(data) {
//     //const maxByGroup = getMaxima(data);
//     const makeDataArray = (d) => {
//     let arr = Object.values(d);
//       return Object.keys(d).map((key) => {
//         return { x: key, y: d[key] / Math.max(...arr) };
//       });
//     };

//     return data.map((datum) => {
//         console.log(datum);
//         makeDataArray(datum);
//     });
//   }

  function processData(data) {
    const maxByGroup = getMaxima(data);
    const makeDataArray = (d) => {
        let maxKey = Object.keys(d).reduce((a, b) => d[a] > d[b] ? a : b);
      return Object.keys(d).map((key) => {

        return { x: key, y: d[key] / d[maxKey] };
      });
    };
    return data.map((datum) => makeDataArray(datum));
  }
    const [data, setData] = useState(processData(characterData));
    const [maxima, setMaxima] = useState(getMaxima(characterData));


    useEffect(() => {
        setData(processData([{acousticness, danceability, energy, valence, liveness, instrumentalness}]))
        setMaxima(getMaxima([{acousticness, danceability, energy, valence, liveness, instrumentalness}]))
    }, [props])


    return (
      <View>
        <VictoryChart polar
          theme={VictoryTheme.material}
          domain={{ y: [ 0, 1 ] }}
          width={400}
          //animate={{ duration: 2000, easing: "bounce" }}
          animate={{duration: 700}}
        >
          <VictoryGroup colorScale={["#e21051"]}
            style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
          >
            {data.map((data, i) => {
              return <VictoryArea key={i} data={data}/>;
            })}
          </VictoryGroup>
        {
          Object.keys(maxima).map((key, i) => {
            return (
              <VictoryPolarAxis key={i} dependentAxis
                style={{
                  axisLabel: { padding: 10 },
                  axis: { stroke: "none" },
                  grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 },
                  tickLabels: { fill:"transparent"}
                }}
                tickLabelComponent={
                  <VictoryLabel labelPlacement="vertical"/>
                }
                labelPlacement="perpendicular"
                axisValue={i + 1} 
                label={key}
              />
            );
          })
        }
          <VictoryPolarAxis
            labelPlacement="parallel"
            tickFormat={() => ""}
            style={{
              axis: { stroke: "none" },
              grid: { stroke: "grey", opacity: 0.5 }
            }}
          />
  
        </VictoryChart>
        </View>
      );

}
  