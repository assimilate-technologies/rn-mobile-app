import React, { useState } from "react";
import { Text, SafeAreaView, View } from "react-native";
import commonStyle from "../../styles/commonStyle";
import { Button, useTheme } from "@rneui/themed";
import { useDispatch } from 'react-redux';
import { setAuth } from "../../redux/actions/authAction";
import { Input } from "@rneui/base";
import api from "../../api/api";
const VerificationScreen = ({ navigation, route: { params } }) => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const [otp, setOtp] = useState("");
    console.log(params);
    const onContinue = async () => {
        try {
            if (otp) {
                let response = await api.verify({ phoneNumber: params?.phoneNumber, otp, verificationKey: params?.token });
                console.log(response?.data);
                if (response?.data?.data) {
                    dispatch(setAuth());
                    navigation.navigate("homeScreen");
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <SafeAreaView style={commonStyle.containerCenter}>
            <View style={{ marginHorizontal: 50 }}>
                <Text style={{ textAlign: "center", fontSize: 25 }}>Enter your code</Text>
                <Text style={{ textAlign: "center" }}>Enter the 4-digit verification sent to {params?.phoneNumber}</Text>
            </View>
            <View style={{ width: "80%" }}>

                <Input
                    keyboardType="phone-pad"
                    maxLength={10}
                    placeholder="Enter Otp"
                    onChangeText={(value) => setOtp(value)}

                />

            </View>
            <Button onPress={onContinue} title="CONTINUE" buttonStyle={{ borderRadius: 12, height: 50, width: "100%" }}
                containerStyle={{ borderRadius: 12, width: "80%" }} color={theme.colors.primary} />
        </SafeAreaView>
    )
}
export default VerificationScreen;