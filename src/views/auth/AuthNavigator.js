import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import AppIntroScreen from './AppIntroScreen';
import { useSelector } from 'react-redux'
import VerificationScreen from './VerificationScreen';
// import HomeScreen from '../layout/HomeScreen';
import LayoutNavigator from '../layout/LayoutNavigator';

const RouteStack = createNativeStackNavigator();

const AuthNavigator = () => {
    const {
        introSliderCompleted, isAuthenticated
    } = useSelector(state => state.auth)

    if (isAuthenticated) {
        return <LayoutNavigator />
    }
    return (
        <RouteStack.Navigator screenOptions={
            {
                animation: 'slide_from_right',
                headerShown: false,
            }
        }>

            {
                !introSliderCompleted ?
                    <RouteStack.Screen name="appIntroScreen" component={AppIntroScreen} />
                    : <><RouteStack.Screen name="loginScreen" component={LoginScreen} />
                        <RouteStack.Screen name="verificationScreen" component={VerificationScreen} /></>
            }
        </RouteStack.Navigator>
    );
}



export default AuthNavigator
