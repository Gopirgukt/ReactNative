// OrderSuccess.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const OrderSuccess = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.successText}>Successfully placed your order!</Text>

      <TouchableOpacity>
        <Text>Go To Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default OrderSuccess;
