import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import HomeMapView from "../domain/home-map-view"
import {getAppState} from "../redux/state-provider"
import {ItemDetailsNavigator} from "../types"
import ItemDetails from "../domain/item-details"

const ItemDetailsStack = createStackNavigator<ItemDetailsNavigator>();

const HomeNavigator = () => {
    const {
        state,
        dispatch
    } = getAppState();
    return (
            <ItemDetailsStack.Navigator
                initialRouteName = "home"
            >
                <ItemDetailsStack.Screen 
                    name = "home" 
                    component ={HomeMapView}
                    options = {{ headerShown : false,
                        headerTitle: "Home"  }}
                />
                <ItemDetailsStack.Screen 
                    name = "itemDetails" 
                    component ={ItemDetails}
                    options = {{
                        headerTitle: "Details" 
                    }}
                />
            </ItemDetailsStack.Navigator>
    );
}

export default HomeNavigator;