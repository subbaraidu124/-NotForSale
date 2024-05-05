import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Button, StyleSheet, TextInput } from "react-native";
import { getAppState } from "../redux/state-provider";
import { UserAction } from "../redux/user-reducer";
import firebase from "../firebase-config"


function SignUpScreen({navigation}) {
    const {
        state,
        dispatch
    } = getAppState();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");


  const signUp = () => {
      firebase.auth().createUserWithEmailAndPassword(email,password)
      .then((res)=> {
        const userData = {
            userId : email,
            fullname : fullName,
            phoneNumber : phoneNumber
        }
        firebase.firestore().collection("users").doc(userData.userId).set(userData);
        let userEmail = res.user?.email;
        dispatch({type: UserAction.LOGIN_SUCCESS, payload: userEmail})
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
            placeholder = "Full Name"
            onChangeText = {(txt) => setFullName(txt)}
            autoCapitalize = "none"
            autoCorrect={false}
            style={styles.formInput} 
        />
        <TextInput
            placeholder = "Phone Number"
            onChangeText = {(txt) => setPhoneNumber(txt)}
            autoCapitalize = "none"
            autoCorrect={false}
            style={styles.formInput} 
        />
        <TextInput
            placeholder = "Email"
            onChangeText = {(txt) => setEmail(txt)}
            autoCapitalize = "none"
            keyboardType = "email-address"
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
        <Button title = "Sign up" onPress = {() => signUp()} />
        <Button title = "Back to Login" onPress = {() => navigation.navigate("login")} />
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

export default SignUpScreen;