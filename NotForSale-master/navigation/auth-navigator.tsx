import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import HomeMapView from "../domain/home-map-view"
import LoginScreen from "../domain/login"
import {getAppState} from "../redux/state-provider"
import SignUpScreen from "../domain/sign-up"
import {AuthenticationStackList} from "../types"

const AuthStack = createStackNavigator<AuthenticationStackList>();

const AuthNavigator = () => {
    const {
        state,
        dispatch
    } = getAppState();
    return (
            <AuthStack.Navigator
                initialRouteName = "login"
            >
                <AuthStack.Screen name = "login" component ={LoginScreen}/>
                <AuthStack.Screen name = "signUp" component ={SignUpScreen}/>
            </AuthStack.Navigator>
    );
}

export default AuthNavigator;