import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useStripe } from '@stripe/stripe-react-native';

const Payments = () => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const stripe = useStripe();

    const subscribe = async () => {
        try {
            const response = await fetch('http://localhost:3000/pay', {
                method: 'POST',
                body: JSON.stringify({ name, amount }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (!response.ok) return Alert.alert(data.message);

            const clientSecret = data.clientSecret;
            const initSheet = await stripe.initPaymentSheet({
                paymentIntentClientSecret: clientSecret,
            });
            if (initSheet.error) return Alert.alert(initSheet.error.message);

            const presentSheet = await stripe.presentPaymentSheet({
                clientSecret
            });
            if (presentSheet.error) return Alert.alert(presentSheet.error.message);

            Alert.alert("Payment completed, thank you!")
        } catch (error) {
            console.error(error);
            Alert.alert('Something went wrong, try again later');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment</Text>
            <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Name"
                style={styles.input}
            />
            <TextInput
                value={amount}
                onChangeText={(text) => setAmount(text)}
                placeholder="Amount (INR)"
                keyboardType="numeric"
                style={styles.input}
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={subscribe}>
                <Text style={styles.buttonText}>Pay</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E7F0DC',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        color: '#597445',
        marginBottom: 24,
    },
    input: {
        width: '80%',
        fontSize: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: '#597445',
        borderRadius: 12,
        marginBottom: 20,
    },
    buttonContainer: {
        backgroundColor: '#729762',
        padding: 12,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default Payments;