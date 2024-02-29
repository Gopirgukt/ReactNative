import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const ProductDetails = ({route}) => {
  // Extracting product information from the route parameter
  const {product} = route.params;

  return (
    <View style={styles.container}>
      <Image source={{uri: product.thumbnail}} style={styles.productImage} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default ProductDetails;
