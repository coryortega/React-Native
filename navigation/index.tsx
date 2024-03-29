import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { Text, View } from '../components/Themed';
import NotFoundScreen from '../screens/NotFoundScreen';
import ModalScreen from '../screens/ModalScreen';
import LoginScreen from '../screens/LoginScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
//import { AuthContext } from '../components/context';


// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {

  const initialLoginState = {
    isLoading: true,
    userToken: null
  };

  const [isAuthenticated, setIsAuthenticated] = React.useState(null)

  React.useEffect(() => {
    let userToken: any = null;
    setTimeout(async() => {
      try {
        // userToken = await AsyncStorage.getItem('token')
        userToken = await SecureStore.getItemAsync('token')
      } catch(e) {
        console.log(e)
      }
      setIsAuthenticated(userToken);
      //dispatch({ type: 'RETRIEVE_TOKEN', token: userToken})
    }, 1000)
  }, [])

  return (

      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          {isAuthenticated !== null ? (
            <RootNavigator/>  
          ) :
          <LoginScreen/>
          }
      </NavigationContainer>

  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={BottomTabNavigator} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        <Stack.Screen name="MyModal" component={ModalScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
  );
}
