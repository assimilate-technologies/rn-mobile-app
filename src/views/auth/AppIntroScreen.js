import React from "react";
import { Text, SafeAreaView, View } from "react-native";
import commonStyle from "../../styles/commonStyle";
import { Button, useTheme } from "@rneui/themed";
import { useDispatch } from 'react-redux';
import { setIntroSliderComplete } from "../../redux/actions/authAction";
const AppIntroScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const onContinue = () => {
        dispatch(setIntroSliderComplete())
        // navigation.replace("loginScreen");
    }
    return (
        <SafeAreaView style={commonStyle.containerCenter}>
            <Text>App Intro Screen</Text>
            <Button onPress={onContinue} title="SIGN UP" buttonStyle={{ borderRadius: 12, height: 50, width: "100%" }}
                containerStyle={{ borderRadius: 12, width: "80%", height: 50 }} color={theme.colors.primary} />
        </SafeAreaView>
    )
}
export default AppIntroScreen;