import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Slick from 'react-native-slick';
import {connect, useDispatch} from 'react-redux';
import {additem_into_cart, fetchProducts, fetchAll} from '../redux/cartSlice';
import {useNavigation} from '@react-navigation/native';

const Home = ({apiData, loading, apiData2}) => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);

  const handleSeeAll = () => {
    setShowAll(true);
  };

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchAll());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < apiData.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 9000);

    return () => clearInterval(interval);
  }, [currentIndex, apiData.length]);

  const handleAddToCart = product => {
    dispatch(additem_into_cart(product));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleProductDetails = product => {
    // Navigate to the details screen with the product information
    navigation.navigate('ProductDetails', {product});
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="Search products..."
        placeholderTextColor="#999"
        keyboardType="default"
        returnKeyType="done"
        type="search"
        style={styles.InputContainer}
      />

      <Slick
        style={styles.wrapper}
        showsButtons={false}
        dotStyle={{display: 'none'}}
        autoplay
        autoplayTimeout={3} // Adjust the timeout as needed (in seconds)
        selectedIndex={currentIndex}
        onIndexChanged={index => setCurrentIndex(index)}>
        {apiData.map(product => (
          <View key={product.id} style={styles.product}>
            <Image source={{uri: product.image}} style={styles.productImage} />
            <Text style={styles.productName}>{product.title}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
            <TouchableOpacity
              key={product.id}
              style={styles.addToCartButton}
              onPress={() => handleAddToCart(product)}>
              <Text>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        ))}
      </Slick>
      <View style={styles.firstBottom}>
        <View>
          <Image
            source={{
              uri: 'https://img.freepik.com/free-vector/super-sale-background_23-2147820061.jpg?w=740&t=st=1707635469~exp=1707636069~hmac=3e263429568c680b3890962b97578d1a35773ec2f70cdd19380ead18d7841683',
            }}
            style={styles.topdealImage}
          />
          <Text style={styles.topdealText}>Best deals</Text>
        </View>
        <View>
          <Image
            source={{
              uri: 'https://cdn.pixabay.com/photo/2016/12/06/09/30/blank-1886001_960_720.png',
            }}
            style={styles.topdealImage}
          />
          <Text style={styles.topdealText}>Clothes</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('BestDeals')}>
            <Image
              source={{
                uri: 'https://images6.alphacoders.com/133/1338694.png',
              }}
              style={styles.topdealImage}
            />
            <Text style={styles.topdealText}>Laptops</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Image
            source={{
              uri: 'https://img.freepik.com/free-vector/super-sale-background_23-2147820061.jpg?w=740&t=st=1707635469~exp=1707636069~hmac=3e263429568c680b3890962b97578d1a35773ec2f70cdd19380ead18d7841683',
            }}
            style={styles.topdealImage}
          />
          <Text style={styles.topdealText}>Bikes</Text>
        </View>
      </View>
      <Text style={styles.popularText}>Popular Products</Text>
      <View style={styles.bottomtotalcontainer}>
        {apiData2.slice(0, showAll ? apiData2.length : 3).map(each => (
          <TouchableOpacity
            key={each.id}
            onPress={() => handleProductDetails(each)}>
            <View style={styles.eachobj}>
              <Image
                source={{uri: each.thumbnail}}
                style={styles.bottomcontainerimages}
              />
              <Text style={styles.text}>{each.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
        {!showAll && (
          <TouchableOpacity onPress={handleSeeAll}>
            <Text style={styles.seeButton}>See All</Text>
          </TouchableOpacity>
        )}
        {showAll && (
          <TouchableOpacity onPress={() => setShowAll(false)}>
            <Text style={styles.seeButton}>Hide</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 1,
  },
  eachobj: {
    height: 120,
    width: 100,
    backgroundColor: 'red',
    marginBottom: 10,
  },
  InputContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 10,
    marginBottom: 20,
  },
  wrapper: {
    height: 235,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  product: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: 'orange',
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstBottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  topdealImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  topdealText: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
  },
  bottomtotalcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  botttommiddlecontainer: {
    width: '20%', // Adjust width as needed
    marginTop: 10,
  },

  bottomcontainerimages: {
    height: 100,
    width: 100,
    borderRadius: 30,
  },
  seeButton: {
    textAlign: 'center',
    marginVertical: 10,
    color: 'blue', // Adjust as needed for text color
  },
  popularText: {
    color: 'grey',
    fontWeight: '800',
    fontSize: 20,
  },
});

const mapStateToProps = state => {
  return {
    apiData: state.cart.products, // Use the apiData from the Redux store
    categories: state.cart.categories,
    loading: state.cart.loading, // Assuming you have a loading state in your Redux store
    apiData2: state.cart.products2.products,
  };
};

export default connect(mapStateToProps)(Home);
