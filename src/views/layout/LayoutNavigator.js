import React from 'react';
import HomeScreen from './home/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabScreen from './MainTabScreen';
import EditProfileScreen from './profile/EditProfileScreen';

const RouteStack = createNativeStackNavigator();
const LayoutNavigator = ({ }) => {

    return (
        <RouteStack.Navigator screenOptions={
            {
                animation: 'slide_from_right',
                headerShown: false,
            }
        }>
            <RouteStack.Screen name="homeScreen" component={MainTabScreen} />
            <RouteStack.Screen name="editProfileScreen" component={EditProfileScreen} />
        </RouteStack.Navigator>
    );
}



export default LayoutNavigator
