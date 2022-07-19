import React, { useEffect } from 'react';
import HomeScreen from './home/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabScreen from './MainTabScreen';
import EditProfileScreen from './profile/EditProfileScreen';
import { useDispatch } from 'react-redux';
import api from '../../api/api';
import { setUser, setWalletAmount } from '../../redux/actions/authAction';

const RouteStack = createNativeStackNavigator();
const LayoutNavigator = ({ }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        getUser();
        getUserWallet();
    }, [])
    const getUser = async () => {
        const { data } = await api.getUser();
        const res = await api.getUserDetail();
        if (res?.data) {
            const { id, ...others } = res?.data;
            dispatch(setUser({ ...data, ...others }));
        } else {
            dispatch(setUser({ ...data }));

        }
    }
    const getUserWallet = async () => {
        const { data } = await api.getWalletAmount();
        dispatch(setWalletAmount(data?.amount || 0));
    }
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
