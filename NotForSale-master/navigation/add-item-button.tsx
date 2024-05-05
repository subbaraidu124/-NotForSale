import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


function AddItemButton({onPress}) {
  
  return (
    <TouchableOpacity onPress = {onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="plus-circle"
          color= "#fff"
          size={40}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fc5c65",
    borderColor: "#fff",
    borderRadius: 20,
    borderWidth: 10,
    bottom: 20,
    height: 70,
    justifyContent: "center",
    width: 70,
  },
});

export default AddItemButton;
