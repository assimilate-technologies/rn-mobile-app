import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import AppIntroScreen from './AppIntroScreen';
import { useSelector, useDispatch } from 'react-redux'
import { setIntroSliderComplete } from '../../redux/actions/authAction';

const RouteStack = createNativeStackNavigator();

const AuthNavigator = () => {
    const {
        introSliderCompleted,
    } = useSelector(state => state.auth)

    return (
        <RouteStack.Navigator screenOptions={
            {
                animation: 'slide_from_right',
                headerShown: false,
            }
        }>
            {
                !introSliderCompleted ? <RouteStack.Screen name="appIntroScreen" component={AppIntroScreen} />
                    : <RouteStack.Screen name="loginScreen" component={LoginScreen} />
            }


        </RouteStack.Navigator>
    );
}



export default AuthNavigator
