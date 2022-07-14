import React from 'react';
import HomeScreen from '../layout/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RouteStack = createNativeStackNavigator();
const LayoutNavigator = ({}) => {

    return (
        <RouteStack.Navigator screenOptions={
            {
                animation: 'slide_from_right',
                headerShown: false,
            }
        }>
            <RouteStack.Screen name="homeScreen" component={HomeScreen} />
        </RouteStack.Navigator>
    );
}



export default LayoutNavigator
