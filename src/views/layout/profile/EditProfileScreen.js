import React from "react";
import { Text, SafeAreaView, View } from "react-native";
import commonStyle from "../../../styles/commonStyle";
import { Button, useTheme } from "@rneui/themed";
import { useDispatch } from 'react-redux';
const EditProfileScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={commonStyle.containerCenter}>
            <Text>EditProfileScreen</Text>
        </SafeAreaView>
    )
}
export default EditProfileScreen;