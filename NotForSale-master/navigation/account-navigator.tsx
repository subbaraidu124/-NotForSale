import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import HomeMapView from "../domain/home-map-view"
import {getAppState} from "../redux/state-provider"
import {AccountStackList} from "../types"
import AccountScreen from "../domain/account/account"
import MyProfileScreen from "../domain/account/my-profile"
import ChangePasswordScreen from "../domain/account/change-password"

const AccountStack = createStackNavigator<AccountStackList>();

const AccountNavigator = () => {
    const {
        state,
        dispatch
    } = getAppState();
    return (
            <AccountStack.Navigator
                initialRouteName = "account"
            >
                <AccountStack.Screen name = "account" component ={AccountScreen}/>
                <AccountStack.Screen name = "myProfile" component ={MyProfileScreen}/>
                <AccountStack.Screen name = "changePassword" component ={ChangePasswordScreen}/>
            </AccountStack.Navigator>
    );
}

export default AccountNavigator;