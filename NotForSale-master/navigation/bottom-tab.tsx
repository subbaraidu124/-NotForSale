import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import React, { useEffect, useState } from "react";
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons"
import {BottomTabList} from "../types"
import HomeMapView from "../domain/home-map-view"
import AddItemScreen from "../domain/add-item"
import AccountNavigator from "../navigation/account-navigator"
import AddItemButton from "./add-item-button"
import HomeNavigator from "../navigation/item-details-navigator"
import ItemDetails from "../domain/item-details";

const BottomTab = createBottomTabNavigator<BottomTabList>();

const BottomTabNavigator = () => {

    const [dd, setdd] = useState("");

    return (
        <BottomTab.Navigator
            initialRouteName = "home"
        >
            <BottomTab.Screen 
                name = "home"
                component = {HomeNavigator}
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                      <AntDesign name="home" size={24} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen 
                name = "addItem"
                component = {AddItemScreen}
                options={({navigation}) => ({
                    tabBarButton: () => (
                        <AddItemButton
                            onPress={() => navigation.navigate("addItem")}
                        />
                    ),
                })}
            />
            <BottomTab.Screen 
                name = "account"
                component = {AccountNavigator}
                options={{
                    title: "Account",
                    tabBarIcon: ({ color }) => (
                      <AntDesign name="user" size={24} color={color} />
                    ),
                }}
            />
        </BottomTab.Navigator>
    )
}

export default BottomTabNavigator; 