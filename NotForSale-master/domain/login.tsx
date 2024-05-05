import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Button, StyleSheet, TextInput } from "react-native";
import { getAppState } from "../redux/state-provider";
import { UserAction } from "../redux/user-reducer";
import firebase from "../firebase-config"
import {PrimaryButton} from "../components/custom-button"

function LoginScreen({navigation}) {
    const {
        state,
        dispatch
    } = getAppState();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


  const signIn = () => {
      firebase.auth().signInWithEmailAndPassword(email,password)
      .then((res)=> {
        let email = res.user?.email;    
        dispatch({type: UserAction.LOGIN_SUCCESS, payload: email})
        console.log("welcome",res.user?.email)
      })
      .catch((error) => {
        console.log("sorry", error);
      })
    // if(email == "sriram" && password == "qwerty") {
    //     console.log("welcome")
        
    // }
    // else {
    //     console.log("sorry");
    // }
  };


  return (
    <SafeAreaView>
        <View style={styles.container}>
        <TextInput
            placeholder = "Email"
            onChangeText = {(txt) => setEmail(txt)}
            autoCapitalize = "none"
            autoCorrect={false}
            style={styles.formInput} 
        />
        <TextInput
            placeholder = "password"
            onChangeText = {(txt) => setPassword(txt)}
            autoCapitalize = "none"
            autoCorrect={false}
            style={styles.formInput} 
        />
        </View>
        <Button title = "Login" onPress = {() => signIn()} />
        <Button title = "Sign up" onPress = {() => navigation.navigate("signUp")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container : {
        alignItems : "center",
        paddingTop : 40
    },
    formInput : {
        borderBottomWidth : 1,
        marginBottom : 30,
        width : "90%",
        fontSize : 20
    }
})

export default LoginScreen;