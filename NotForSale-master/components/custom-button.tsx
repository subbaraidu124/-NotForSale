import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

export function PrimaryButton({ buttonTitle, ...rest }:any) {
    const { style, ...otherParams } = rest;
    return (
      <TouchableOpacity style={[styles.primaryButton, style]} {...otherParams}>
        <Text style={[styles.primaryButtonText, style]}>{buttonTitle}</Text>
      </TouchableOpacity>
    );
  }

const styles = StyleSheet.create({
    primaryButton : {
        padding : 15,
        alignItems : "center",
        justifyContent : "center",
        backgroundColor : "#fc5c65",
        width : "90%",
        marginBottom : 10,
        marginTop : 20,
        alignSelf : "center",
        borderRadius : 5,
    },
    primaryButtonText : {
        fontSize: 14,
    }
})
