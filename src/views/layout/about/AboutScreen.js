import React from "react";
import { Text, SafeAreaView, View } from "react-native";
import commonStyle from "../../../styles/commonStyle";
import { Button, useTheme } from "@rneui/themed";
import { useDispatch } from 'react-redux';
const AboutScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={commonStyle.containerCenter}>
            <Text>AboutScreen</Text>
        </SafeAreaView>
    )
}
export default AboutScreen;