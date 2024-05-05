import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {getAppState} from "../../redux/state-provider"
import { UserAction } from '../../redux/user-reducer';
import firebase from "../../firebase-config";

function AccountScreen(props) {
    const {
        state,
        dispatch
    } = getAppState();

    const userId : string = state.user as string;
    const [userData, setUserData] = useState([]);

    // useEffect(()=> {
    //     firebase.firestore().doc(userId).get()
    //     .then((doc) => {
            
    //     })
    // },[])

    return (
        <View style = {styles.container}>
            <Text style = {styles.nameText}>Hello Sriram{state.user},</Text>
            <TouchableOpacity style = {styles.buttonContainer}>
                <MaterialCommunityIcons name = "account" size = {40} color = "#fc5c65"/>
                <Text style = {styles.buttonText}>My Profile</Text>
                <View style = {styles.arrow}>
                <MaterialCommunityIcons name = "arrow-right" size = {20} color = "#a9a9a9"/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.buttonContainer}>
                <MaterialCommunityIcons name = "security" size = {40} color = "#fc5c65"/>
                <Text style = {styles.buttonText}>Change Password</Text>
                <View style = {styles.arrow}>
                <MaterialCommunityIcons name = "arrow-right" size = {20} color = "#a9a9a9"/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                style = {styles.buttonContainer2}
                onPress = {() => {
                    firebase.auth().signOut();
                    dispatch({type: UserAction.LOGOUT})}}
            >
                <Text style = {styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        padding : 30,
        backgroundColor :"#fff",
        height : "100%"
    },
    buttonContainer : {
        padding : 10,
        flexDirection : "row",
        width : "100%",
        borderWidth : 1,
        borderRadius : 15,
        alignItems : "center",
        borderColor : "#fc5c65",
        marginBottom : 15,
    },
    buttonContainer2 : {
        padding : 15,
        //flexDirection : "row",
        width : "100%",
        borderWidth : 1,
        borderRadius : 15,
        alignItems : "center",
        justifyContent : "center",
        borderColor : "#fc5c65",
        marginTop : 60,
    },
    buttonText : {
        fontSize : 20,
        marginLeft : 10,
        //color : "#a9a9a9"
    },
    arrow : {
        position : "absolute",
        right : 10
    },
    nameText : {
        fontSize : 25,
        marginBottom : 30
    }
})

export default AccountScreen;