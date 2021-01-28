import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import rootReducer from "./Redux/reducers";
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  console.log(colorScheme);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation colorScheme='dark' />
          {/* <Navigation colorScheme='dark' /> */}
          <StatusBar />
        </SafeAreaProvider>
      </Provider>
    )
  }
}
