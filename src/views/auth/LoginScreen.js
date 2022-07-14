import React, { createRef, useRef, useState } from "react";
import { Text, SafeAreaView, View, Pressable, TouchableOpacity } from "react-native";
import commonStyle from "../../styles/commonStyle";
import { Button, useTheme } from "@rneui/themed";
import { Divider, Input, ListItem } from "@rneui/base";
import Icon from 'react-native-vector-icons/FontAwesome';
import CountryCodePicker from "../../shared/components/CountryCodePicker";
import api from "../../api/api";

const LoginScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const refRBSheet = useRef();
    const [countryCode, setContryCode] = useState({
        'name': {
            'en': 'India'
        },
        'dial_code': '+91',
        'code': 'IN',
        'flag': '🇮🇳',
    });
    const [phoneNumber, setPhoneNumber] = useState("");
    const selectContryCode = (item) => {
        setContryCode(item);
        refRBSheet?.current?.close()
    }
    const onContinue = async () => {
        try {
            if (phoneNumber) {
                let response = await api.login({ phoneNumber: `${countryCode.dial_code}${phoneNumber}` });
                console.log(response?.data);
                if (response?.data?.data) {
                    navigation.navigate("verificationScreen", {
                        token: response?.data?.data,
                        phoneNumber: `${countryCode.dial_code}${phoneNumber}`
                    });

                }
            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <SafeAreaView style={commonStyle.containerCenter}>
            <Text>Login </Text>
            <View style={{ width: "80%" }}>
                <Input
                    keyboardType="phone-pad"
                    maxLength={10}
                    placeholder=""
                    onChangeText={(value) => setPhoneNumber(value)}
                    leftIcon={
                        <TouchableOpacity
                            onPress={() => refRBSheet && refRBSheet?.current?.open()}
                            style={{ flexDirection: "row", alignItems: "center" }}><Text>{countryCode?.code}</Text>
                            <Text> {countryCode?.dial_code} </Text>
                            <Icon name="angle-down" size={15} /></TouchableOpacity>
                    }
                />
                <CountryCodePicker refRBSheet={refRBSheet}
                    onSelect={selectContryCode} countryCode={countryCode}
                />

                <Button onPress={() => onContinue()} title="CONTINUE" buttonStyle={{ borderRadius: 12, height: 50 }}
                    containerStyle={{ borderRadius: 12, }} color={theme.colors.primary} />

                <Text style={{}}>
                    We never share this with anyone and it won’t be on your profile
                </Text>
            </View>



        </SafeAreaView>
    )
}
export default LoginScreen;