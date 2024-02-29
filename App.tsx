import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/components/BottomTabNavigation';
import store from './src/redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
