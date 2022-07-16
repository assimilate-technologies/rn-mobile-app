import React from "react";
import { Text, SafeAreaView, View } from "react-native";
import commonStyle from "../../../styles/commonStyle";
import { Button, useTheme, Header } from "@rneui/themed";
import { useDispatch, useSelector } from 'react-redux';
import api from "../../../api/api";
import RazorpayCheckout from 'react-native-razorpay';
import { setWalletAmount } from "../../../redux/actions/authAction";
const HomeScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const {
        userInfo, walletAmount
    } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const onContinue = async () => {
        console.log('start--------')
        const { data } = await api.payment({
            "amount": 20,
            "currency": "INR",
            "userId": userInfo?.id,
            "paymentMode": "UPI",
            "isWallet": false,
            "isCredit": false,
            "paymentType": "PaymentGetway"
        });
        console.log('start 1--------')
        var options = {
            description: 'Add Wallet',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: data?.keyId, // Your api key
            amount: data?.amount,
            order_id: data?.transactionId,
            name: 'Wallet',
            prefill: {
                email: userInfo?.email,
                contact: userInfo?.phoneNumber,
                name: 'Wallet'
            },
            theme: { color: '#F37254' }
        }
        RazorpayCheckout.open(options).then(async (razorpay) => {
            // handle success
            await api.paymentUpdate({
                "transactionId": data?.transactionId,
                "razorpayData": razorpay,
                "isWallet": true,
                "isCredit": true,
                "userId": userInfo?.id
            });
            getUserWallet();
        }).catch((error) => {
            console.log('start 3--------')
            // handle failure
        });
    }
    const getUserWallet = async () => {
        const { data } = await api.getWalletAmount();
        dispatch(setWalletAmount(data?.amount || 0));
    }
    return (
        <SafeAreaView>
            <Header containerStyle={{ height: 80 }} />
            <Text>{walletAmount}</Text>
            <Button onPress={onContinue} title="Add Wallet" buttonStyle={{ borderRadius: 12, height: 50, width: "100%" }}
                containerStyle={{ borderRadius: 12, width: "80%", height: 50 }} color={theme.colors.primary} />

        </SafeAreaView>
    )
}
export default HomeScreen;