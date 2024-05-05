import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import {initialMarkerData} from "../types"
import firebase, {storage} from "../firebase-config"

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function ItemDetails({navigation, route}) {

    const [itemData, setItemData] = useState(initialMarkerData);
    const [imageUri, setImageUri] = useState("");

    useEffect(() => {
        const { itemDetails } = route.params;
        const data = {
            itemName: itemDetails.itemName,
            desc: itemDetails.desc,
            itemId: itemDetails.itemId,
            condition : itemDetails.condition,
            contact : itemDetails.contact,
            imageUri : itemDetails.imageUri,
            userId : itemDetails.userId,
            timestamp : itemDetails.timestamp
        }
        setItemData(data);
        storage
          .ref()
          .child("item-images")
          .child("101.jpg")
          .getDownloadURL()
          .then((url) => {
            setImageUri(url);
            console.log("uri is ====",url)
          })
          .catch(() => {});
    },[])

    return (
        <View style = {styles.container}>
            <View style = {styles.imageContainer}>
                {(imageUri != "") ? (
                    <Image
                        source={{ uri: imageUri }}
                        resizeMode="contain"
                        style={styles.imageUri1}
                    />
                ) : (
                    <Image
                        source= {require("../assets/101.jpg")}
                        resizeMode="contain"
                        style={styles.imageUri1}
                    />
                )
                }
            </View>
            <View style = {styles.dateContainer}>
                <Text>Posted on {itemData.timestamp}</Text>
            </View>
            <View>
                <View style = {styles.nameContainer}>
                    <Text style = {styles.desc}>{itemData.itemName}</Text>
                </View>
                <View style = {styles.nameContainer}>
                <Text style = {styles.desc2}>Description : {itemData.desc}</Text>
                </View>
                <View style = {styles.nameContainer}>
                <Text style = {styles.desc2}>Contact : {itemData.userId}</Text>
                </View>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        padding : 15,
        backgroundColor : "#fff",
        height : "100%"
    },
    imageContainer : {
        height : 200,
        marginBottom : 10
    },
    imageUri1 : {
        height : "100%",
        width : "100%",
    },
    dateContainer : {
        alignContent : "flex-end",
        marginBottom : 30
    },
    desc : {
        fontSize : 21,
        fontWeight : "500"
    },
    desc2 : {
        fontSize : 18,
    },
    nameContainer : {
        padding : 15,
        borderWidth : 1,
        alignItems : "center",
        justifyContent : "center",
        margin : 10,
        borderRadius : 12,
        borderColor : "#fc5c65"
    }
})

export default ItemDetails;