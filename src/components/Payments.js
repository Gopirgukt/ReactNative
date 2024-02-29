import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RadioButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
const Payments = ({route}) => {
  const navigations = useNavigation();
  const {totalAmount} = route.params;
  const [checked, setChecked] = useState('first');

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Suggestion for you</Text>
      <View style={styles.cardContainer}>
        <RadioButton.Group
          onValueChange={value => setChecked(value)}
          value={checked}>
          <View style={styles.paymentCard}>
            <RadioButton value="first" />
            <View>
              <Text style={styles.cardTitle}>HDFC Bank Credit Card</Text>
              <Text style={styles.cardNumber}>**** **** 1234</Text>
            </View>
          </View>
          <View style={styles.paymentCard}>
            <RadioButton value="second" />
            <View>
              <Text style={styles.cardTitle}>SBI Bank Credit Card</Text>
              <Text style={styles.cardNumber}>**** **** 5233</Text>
            </View>
          </View>
          <Text style={styles.sectionTitle}>Other Payments</Text>
          <View style={styles.cardContainer}>
            <View style={styles.paymentCard}>
              <RadioButton value="third" />
              <View>
                <Text style={styles.cardTitle}>UPI</Text>
              </View>
            </View>
            <View style={styles.paymentCard}>
              <RadioButton value="fourth" />
              <View>
                <Text style={styles.cardTitle}>EMI - Easy Installments</Text>
              </View>
            </View>
            <View style={styles.paymentCard}>
              <RadioButton value="fifth" />
              <View>
                <Text style={styles.cardTitle}>Cash on Delivery</Text>
              </View>
            </View>
          </View>
        </RadioButton.Group>
      </View>
      <Text style={styles.totalpay}> Total pay: {totalAmount}</Text>
      <View>
        <TouchableOpacity
          style={styles.confromButton}
          onPress={() => navigations.navigate('OrderSuccess')}>
          <Text style={styles.ButtonText}>Conform</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 15,
  },
  cardContainer: {
    marginTop: 10,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cardNumber: {
    fontSize: 12,
    marginLeft: 10,
  },

  confromButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  ButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalpay: {
    fontSize: 18,

    fontWeight: 'bold',
  },
});

export default Payments;
