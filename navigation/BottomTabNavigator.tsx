import { Ionicons, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ProgressBarContainer from "../components/ProgressBarContainer"
import { BlurView } from 'expo-blur';
import * as React from 'react';
//import { Text, View } from "../components/Themed";
import  LogOutButton from '../components/LogOutButton';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import Dashboard from '../screens/Dashboard';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList } from '../types';
import { View, StyleSheet, Text, useWindowDimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import ProgressBar from '../components/ProgressBar';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const window = useWindowDimensions();

  React.useEffect(() => {
    
  }, [])
  
  return (
    <>
    <View style={{
     width: window.width,
    //  height: 95,
    //  backgroundColor: 'white',
    //  backgroundColor: 'rgba(32, 32, 32, 0.8)',
     position: "absolute",
     display: 'flex',
    //  flexDirection: 'column-reverse',
    // borderWidth: 4,
    // borderColor: "red",
     bottom: 79,
     zIndex: 1,
     right: 0}}>
       <BlurView intensity={77} tint="dark"
      //  style={{marginBottom: 94}}
       >
        <ProgressBarContainer/>
       </BlurView>
    </View>
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
      //tabBar={props => <View><Text style={{color: 'white'}}>Hi</Text></View>}
      >
        
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          //tabBarIcon: ({ color }) => <AntDesign name="inbox" size={24} color={color} />,
          tabBarIcon: ({ color }) => <Ionicons name="md-checkmark-circle" size={24} color={color} />,

        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="barschart" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />,
        }}
      />
    </BottomTab.Navigator>
    </>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{
          headerTitle: 'Tab One Title',
          headerRight: () => (
            <LogOutButton/>
          )}}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{
          headerTitle: 'Tab Two Title',
          headerRight: () => (
            <LogOutButton/>
          )
      }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={Dashboard}
        options={{
          headerTitle: 'Tab Three',
          headerRight: () => (
            <LogOutButton/>
          )
         }}
      />
    </TabThreeStack.Navigator>
  );
}