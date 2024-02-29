import React from 'react';

import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
const PlaceOrder = () => {
  const navigation = useNavigation();
  const deliveryAddress = 'Kakinada dist, kajuluru, 533262';
  const route = useRoute();
  const {cartItems} = route.params;
  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <View style={styles.container}>
      <View style={styles.addressContainer}>
        <Text style={styles.addressText}>
          Delivery Address: {deliveryAddress}
        </Text>
      </View>

      <View style={styles.cartItemsContainer}>
        {cartItems.map(item => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{uri: item.image}} style={styles.image} />
            <View style={styles.itemInfo}>
              <Text>{item.title}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Cost: ₹{item.price * item.quantity}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.bottomalign}>
        <View style={styles.totalAmountContainer}>
          <Text style={styles.totalAmountText}>Total Amount: ₹{totalCost}</Text>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() =>
            navigation.navigate('Payments', {totalAmount: totalCost})
          }>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  bottomalign: {
    flex: 1, // Add flex: 1 to make it take up the remaining space
    justifyContent: 'flex-end', // Align items at the bottom of the container
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 19,
  },
  addressContainer: {
    marginBottom: 16,
  },
  addressText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItemsContainer: {
    marginBottom: 16,
  },
  cartItem: {
    marginBottom: 8,
    flexDirection: 'row',
  },
  totalAmountContainer: {
    marginBottom: 16,
  },
  totalAmountText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PlaceOrder;
