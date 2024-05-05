import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export function PrimaryInput({placeholderText, ...rest}) {
    return (
      <View style = {styles.inputContainer}>
          <TextInput
              placeholder = {placeholderText} 
              style = {styles.buttonText}
              numberOfLines = {1}
              {...rest}
          />
      </View>
    );
}

const styles = StyleSheet.create({
    buttonText : {
        fontSize : 20,
        width : "100%"
        //color : "#a9a9a9"
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor : "#fc5c65",
        borderRadius: 10,
        borderWidth : 1,
        width : "95%",
        padding : 10
      },
})

export default PrimaryInput;