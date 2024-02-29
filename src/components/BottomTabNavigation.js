import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Cart from './Cart';
import Home from './Home';
import PlaceOrder from './PlaceOrder';
import {createStackNavigator} from '@react-navigation/stack';
import Payments from './Payments';
import OrderSuccess from './OrderSuccess';
import BestDeals from './BestDeals';
import ProductDetails from './ProductDetails';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CartStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
      <Stack.Screen name="Payments" component={Payments} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />

      <Stack.Screen name="BestDeals" component={BestDeals} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ECartExpress"
        component={HomeStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={'blue'} size={40} />
          ),
        }}
      />

      <Tab.Screen
        name="CartStack"
        component={CartStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="cart" color={'blue'} size={40} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
