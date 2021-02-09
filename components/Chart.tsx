import React, { PureComponent } from 'react';
import { Text, View } from './Themed';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis,
} from 'recharts';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import reducers from '../Redux/reducers';


export default function Chart(props: any) {

  const initialData = {
    acousticness: 0,
    analysis_url: "",
    danceability: 0,
    duration_ms: 0,
    energy: 0,
    id: "",
    instrumentalness: 0,
    key: 0,
    liveness: 0,
    loudness: 0,
    mode: 0,
    speechiness: 0,
    tempo: 0,
    time_signature: 0,
    track_href: "",
    type: "",
    uri: "",
    valence: 0
  } 

  const [songData, setSongData] = React.useState(initialData);

  React.useEffect(() => {
    setSongData({
      ...props.traits
    })
  }, [props.traits])


  const data = [
    {
      subject: 'Acousticness', A: songData.acousticness * 100,
    },
    {
      subject: 'Danceability', A: songData.danceability * 100,
    },
    {
      subject: 'Energy', A: songData.energy * 100,
    },
    {
      subject: 'Instrumentalness', A: songData.instrumentalness * 100,
    },
    {
      subject: 'Liveness', A: songData.liveness * 100,
    },
    {
      subject: 'Valence', A: songData.valence * 100,
    },
  ];

  const data1 = {
    labels: ["Acousticness", "Danceability", "Energy", "Valence", "Liveness", "Instrumentalness"], // optional
    data: [songData.acousticness, songData.danceability, songData.energy, songData.valence, songData.liveness, songData.instrumentalness]
  };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.2,
    useShadowColorFromDataset: false // optional
  };

    return (
        <View>
             {/* <RadarChart cx={188} cy={120} outerRadius={100} width={377} height={240} data={data}>
                 <PolarGrid />
                 <PolarAngleAxis stroke='white' dataKey="subject" />
                 <Radar id="canvas"
                  dataKey='A'
                  stroke='white'
                  stroke-width='5%'
                  fill='#E20351'
                  fillOpacity={0.9}
                />
            </RadarChart> */}

          <ProgressChart
            data={data1}
            width={300}
            height={200}
            strokeWidth={10}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
          />
        </View>
    );
}

