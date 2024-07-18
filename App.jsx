import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import Payments from './components/Payments';

const App = () => {
  
  return (
    <StripeProvider publishableKey='pk_test_51PdUtTRv4qCKtZAnIr0w3kLyWcpZPaao6e4k32thOsArnlQCeMT3QicVTaVXc9MeyXwaQluryYnJuTDbKF44Cd5X006JRvrITe'>
      <SafeAreaView style={styles.safeArea}>
        <Payments />
      </SafeAreaView>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E7F0DC',
  },
});

export default App;