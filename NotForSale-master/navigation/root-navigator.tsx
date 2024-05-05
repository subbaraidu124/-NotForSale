import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import HomeMapView from "../domain/home-map-view"
import LoginScreen from "../domain/login"
import {getAppState} from "../redux/state-provider"
import AuthNavigator from "./auth-navigator"
import {RootStackList} from "../types"
import BottomTabNavigator from "../navigation/bottom-tab"

const RootNavigator = () => {
    const {
        state,
        dispatch
    } = getAppState();

    const Stack = createStackNavigator<RootStackList>();
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName = "bottomTab"
                screenOptions = {{headerShown : false}}
            >
                <Stack.Screen name = "bottomTab" component={BottomTabNavigator}/>
                <Stack.Screen name = "auth" component ={AuthNavigator}/>
                {/* {(state.isAuthenticated) ? (
                    <Stack.Screen name = "bottomTab" component={BottomTabNavigator}/>
                ) : (
                    <Stack.Screen name = "auth" component ={AuthNavigator}/>
                )} */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigator;