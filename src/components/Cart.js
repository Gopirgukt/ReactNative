import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {
  remove_item_cart,
  increment_item_quantity,
  decrement_item_quantity,
} from '../redux/cartSlice'; // Import your actions from the cart slice
const Cart = () => {
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handlePlaceOrder = () => {
    // Pass cart items as route params
    navigation.navigate('PlaceOrder', {cartItems});
  };

  const handleIncrementQuantity = itemId => {
    dispatch(increment_item_quantity(itemId));
  };
  const handleDecrementQuantity = itemId => {
    dispatch(decrement_item_quantity(itemId));
  };
  const handleRemoveItem = itemId => {
    // Dispatch an action to remove the item from the cart
    dispatch(remove_item_cart(itemId));
  };

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Image
            source={{
              uri: 'https://www.vinsolutions.com/wp-content/uploads/sites/2/vinsolutions/media/Vin-Images/news-blog/Empty_Shopping_Cart_blog.jpg',
            }}
            style={styles.productImage}
          />
        </View>
      ) : (
        <>
          <View style={styles.topContainer}>
            {/* ... Header and count container */}
          </View>
          {cartItems.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Image source={{uri: item.image}} style={styles.image} />
              <View style={styles.nameAndCost}>
                <Text style={styles.nameAndCostText}> {item.title}</Text>
                <Text style={styles.nameAndCostText}> ₹{item.price}</Text>
                <Text style={styles.nameAndratingText}>
                  {' '}
                  {item.rating.rate}
                </Text>
                <Text>
                  <TouchableOpacity
                    onPress={() => handleDecrementQuantity(item.id)}>
                    <Text style={styles.quantityButtonText}> -</Text>
                  </TouchableOpacity>{' '}
                  Quantity: {item.quantity}
                  <TouchableOpacity
                    onPress={() => handleIncrementQuantity(item.id)}>
                    <Text style={styles.quantityButton}> +</Text>
                  </TouchableOpacity>
                </Text>
              </View>
              <TouchableOpacity
                style={styles.removeButtion}
                onPress={() => handleRemoveItem(item.id)}>
                <Text>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.bottomCost}>
            <Text style={styles.nameAndCostText}>Total Cost: {totalCost}</Text>
            <TouchableOpacity
              style={styles.placeOrder}
              onPress={handlePlaceOrder}>
              <Text style={styles.placeOrderText}>Place order</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  quantityButton: {
    color: 'red', // You can set any color you prefer
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  quantityButtonText: {
    color: 'green',
    fontSize: 20,
    fontWeight: 'bold',
  },
  productImage: {
    width: '100%',
    height: '90%',
    resizeMode: 'cover',
  },
  bottomCost: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  placeOrder: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  placeOrderText: {
    color: 'white',
    textAlign: 'center',
  },
  nameAndratingText: {
    color: 'green',
  },
  removeButtion: {
    backgroundColor: 'orange',
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  topContainer: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 19,
  },
  text: {
    fontSize: 19,
    fontFamily: 'Roboto',
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'bree Serif',
  },
  nameAndCost: {
    flex: 1,
    flexDirection: 'column',
  },
  nameAndCostText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
});

export default Cart;
