import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { Platform, View, Text } from 'react-native';
import HomeScreen from './home/HomeScreen';
import AboutScreen from './about/AboutScreen';
import ProfileScreen from './profile/ProfileScreen';
const WHITE = "#FFF"
const Tab = createBottomTabNavigator();
const MainTabScreen = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#EE2324",
            tabBarInactiveTintColor: "white",
            backgroundColor: "#303342",
            tabBarStyle: {
                // paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                backgroundColor: "#303342",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: Platform.OS == "ios" ? "10%" : 55,
                borderTopWidth: 0,
            }
        }}
        >
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarLabel: () => (
                        <Text style={{ color: WHITE, bottom: 10, fontSize: 10 }}>Home</Text>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome size={25} color={color} name="home" />
                    ),
                }}>
            </Tab.Screen>
            <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    tabBarLabel: () => (
                        <Text style={{ color: WHITE, bottom: 10, fontSize: 10 }}>Profile</Text>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome size={25} color={color} name="user" />
                    ),
                }}>
            </Tab.Screen>

            <Tab.Screen name="About" component={AboutScreen}
                options={{
                    tabBarLabel: () => (
                        <Text style={{ color: WHITE, bottom: 10, fontSize: 10 }}>About</Text>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome size={25} color={color} name="info" />
                    ),
                }}>
            </Tab.Screen>

        </Tab.Navigator>
    )
}

export default MainTabScreen;