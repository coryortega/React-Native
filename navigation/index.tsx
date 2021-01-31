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
import { AuthContext } from '../components/context';


// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {

  const initialLoginState = {
    isLoading: true,
    userToken: null
  };
  
  const loginReducer = (prevState: any, action: any) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(token: string) => {
      console.log("token in context", token)
      try {
        await AsyncStorage.setItem('token', token)
      } catch(e) {
        console.log(e);
      }
      dispatch({type: 'LOGIN', token: token})
    },
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('token');
      } catch(e) {
        console.log(e);
      }
      dispatch({type: 'LOGOUT'})
    }
  }), []);

  React.useEffect(() => {
    let userToken: any = null;
    setTimeout(async() => {
      try {
        userToken = await AsyncStorage.getItem('token')
        console.log('usertoken',userToken)
      } catch(e) {
        console.log(e)
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken})
    }, 1000)
  }, [])

  
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          {loginState.userToken !== null ? (
            <RootNavigator/>
          ) :
          <LoginScreen/>
          }
      </NavigationContainer>
    </AuthContext.Provider>
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
