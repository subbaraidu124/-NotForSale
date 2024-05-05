import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { userReducer, initialUserState } from "./redux/user-reducer";
import { StateProvider } from "./redux/state-provider";
import MapView from "./domain/home-map-view"
import Login from "./domain/login"
import RootNavigator from "./navigation/root-navigator"



export default function App() {

  return (
    <StateProvider initialState={initialUserState} reducer={userReducer}>
      <RootNavigator/>
    </StateProvider>
  );
}
