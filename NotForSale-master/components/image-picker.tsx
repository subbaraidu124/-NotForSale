import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

function ImageInput({data}) {

  const [imageUri, setImageUri] = useState("");

  const handlePress = async () => {
    const { granted } = await ImagePicker.getCameraPermissionsAsync();
    const l = 5
    if (l == 5) {
        if (!imageUri) {
            selectImage();
        }
        else {
            Alert.alert("Delete", "Are you sure you want to delete this image?", [
                { text: "Yes", onPress: () => setImageUri("") },
                { text: "No" },
            ]);
        }
    }
    else {
        alert("You need to enable permission to access the library.");
    }
  };

  const selectImage = async () => {
    try {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.5,
        });
        if (!result.cancelled) {
          setImageUri(result.uri);
          data.imageUri = result.uri;
        }
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri ? (
            <MaterialCommunityIcons
                color= "#fc5c65"
                name="camera"
                size={40}
            />
        ) : (
            <Image source={{ uri: imageUri }} style={styles.image} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#d3d3d3",
    borderRadius: 15,
    height: 100,
    justifyContent: "center",
    marginVertical: 10,
    overflow: "hidden",
    width: 100,
    borderColor : "#fc5c65",
    borderWidth : 1,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default ImageInput;
