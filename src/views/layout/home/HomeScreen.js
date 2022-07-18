import React, { useRef, useState } from "react";
import { Text, SafeAreaView, View } from "react-native";
import commonStyle from "../../../styles/commonStyle";
import { Button, useTheme, Header } from "@rneui/themed";
import { useDispatch, useSelector } from 'react-redux';
import api from "../../../api/api";
import RazorpayCheckout from 'react-native-razorpay';
import { setWalletAmount } from "../../../redux/actions/authAction";
import RBSheet from "react-native-raw-bottom-sheet";
import { Input } from "@rneui/base";
const HomeScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const refRBSheet = useRef();
    const {
        userInfo, walletAmount
    } = useSelector(state => state.auth)
    const [amount, setAmount] = useState("");
    const [loader, isLoader] = useState(false);
    const dispatch = useDispatch();
    const onContinue = async () => {
        if (Number(amount) <= 0) {
            return;
        }
        isLoader(true);
        const { data } = await api.payment({
            "amount": Number(amount),
            "currency": "INR",
            "userId": userInfo?.id,
            "paymentMode": "UPI",
            "isWallet": false,
            "isCredit": false,
            "paymentType": "PaymentGetway"
        });
        isLoader(false);
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
            isLoader(true);
            const paymentStats = await api.paymentUpdate({
                "transactionId": data?.transactionId,
                "razorpayData": razorpay,
                "isWallet": true,
                "isCredit": true,
                "userId": userInfo?.id
            });
            isLoader(false);
            if (paymentStats && !paymentStats?.data?.failed) {
                alert("Wallet amount add successfuly....!")
                getUserWallet();
            }else{
                alert("Transaction failed....!")
            }

        }).catch((error) => {
            // handle failure
        });
    }
    const getUserWallet = async () => {
        const { data } = await api.getWalletAmount();
        dispatch(setWalletAmount(data?.amount || 0));
        refRBSheet && refRBSheet.current.close();
    }
    return (
        <SafeAreaView>
            <Header containerStyle={{ height: 80 }} />
            <View style={{
                flexDirection: "row", height: 60, marginHorizontal: 25, marginVertical: 15, elevation: 2, backgroundColor: "#FFF",
                borderRadius: 10
            }}>
                <View style={{ width: "50%", alignItems: "center", justifyContent: "center" }}>
                    <Text>Wallet Balance</Text>
                    <Text style={{ fontSize: 20 }}>{walletAmount}</Text>
                </View>
                <View style={{ width: "20%" }}>
                </View>
                <View style={{ width: "30%", alignItems: "center", justifyContent: "center" }}>
                    <Button onPress={() => { refRBSheet.current.open(); }} title="Add +" buttonStyle={{ borderRadius: 12, height: 50, width: "100%" }}
                        type="clear" containerStyle={{ borderRadius: 12, width: "100%", height: 50 }} color={theme.colors.primary} />
                </View>
            </View>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                <View style={{ marginHorizontal: 25 }}>
                    <Text style={{ textAlign: "center", fontSize: 20 }}>
                        Add Wallet
                    </Text>
                    <Input autoFocus onChangeText={(value) => setAmount(value)}
                        placeholder='Enter amount' keyboardType="number-pad" maxLength={10}
                    ></Input>
                    <Button onPress={() => onContinue()} title="Proceed" buttonStyle={{ borderRadius: 12, height: 50, width: "100%" }}
                        containerStyle={{ borderRadius: 12, width: "100%", height: 50 }} color={theme.colors.primary}
                        loading={loader} />
                </View>

            </RBSheet>
        </SafeAreaView>
    )
}
export default HomeScreen;