import React from "react";
import { Text, SafeAreaView, View } from "react-native";
import commonStyle from "../../../styles/commonStyle";
import { Button, useTheme } from "@rneui/themed";
import { useDispatch } from 'react-redux';
import deviceInfoModule from 'react-native-device-info';
const version = deviceInfoModule.getVersion();
const AboutScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={commonStyle.containerCenter}>
            <Text>App version {version}</Text>
        </SafeAreaView>
    )
}
export default AboutScreen;