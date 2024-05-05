import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import {PrimaryInput} from "../components/custom-input"
import ImageInput from "../components/image-picker"
import RadioGroup from "react-native-radio-buttons-group";
import RadioButtons from "../components/radio-buttons"
import {PrimaryButton} from "../components/custom-button"
import * as Yup from "yup";
import { Formik } from "formik";
import {initialItemData, coordinates} from "../types"
import AddItemService from "../firebase-services/add-item-service"
import itemService from '../firebase-services/add-item-service';
import addItemService from '../firebase-services/add-item-service';
import { date } from 'yup/lib/locale';
import firebase from "../firebase-config"

const validationSchema = Yup.object().shape({
    itemName: Yup.string()
        .required("Required*")
        .min(5, "Minimum 5 characters Needed")
        .label("Item Name"),
    description: Yup.string().label("Item Description"),
  });

function AddItemScreen(props) {

    const [itemId, setItemId] = useState(0);

    const [itemData, setItemData] = useState(initialItemData);

    const itemConditions = [
        {
            value : 0,
            label : "Good"
        },
        {
            value : 1,
            label : "Not Good"
        },
        {
            value : 2,
            label : "Broken"
        }
    ]

    const contact = [
        {
            value : 0,
            label : "Email"
        },
        {
            value : 1,
            label : "Phone Number"
        },
        {
            value : 2,
            label : "Both"
        },
        {
            value : 3,
            label : "None"
        }
    ]

    const addItem = async (values) => {
        itemData["itemName"] = values.itemName;
        itemData["desc"] = values.description;
        await addItemService().setCurrentLocation(itemData)
        itemData["timestamp"] = new Date();
        let itemNum = await addItemService().getItemId();
        let newItemId: number = itemNum.data()?.itemId;
        itemData["itemId"] = newItemId;
        itemData["userId"] = "sriram";
        addItemService().setItemId();
        if(itemData.imageUri != "") {
            await addItemService().storeImage(itemData.imageUri, itemData.itemId)
            .then(() => {
                itemData.imageUri = newItemId.toString();
            })
        }
        //console.log(itemData);
        addItemService().addItem(itemData, itemData.itemId)
        .then(() => {
            alert("Item Added");
        })
          .catch((error) => {
            alert("Item Not added");
            console.log("error is :",error);
        })
        
    }

    return (
        <SafeAreaView style = {styles.safeAreaContainer}>
            <ScrollView style = {styles.scroll}>
            <View style = {styles.container}>
                <ImageInput data = {itemData}/>
                <Formik
                    initialValues = {{
                        itemName : "",
                        description : ""
                    }}
                    onSubmit={(values) => {
                        addItem(values);
                    }}
                    validationSchema = {validationSchema}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        errors,
                        setFieldTouched,
                        touched,
                    }) => (
                    <>
                    <View style = {styles.nameContainer}>
                        <Text style = {styles.conditionText}>Item Name</Text>
                        <PrimaryInput 
                            placeholderText = "Name"
                            value = {values.itemName}
                            onChangeText={handleChange("itemName")}
                            onBlur={() => setFieldTouched("itemName")}
                        />
                        <View>
                            {touched.itemName && (
                            <Text style={styles.errorText}>{errors.itemName}</Text>
                            )}
                        </View>
                    </View>
                
                    <View style = {styles.conditionContainer}>
                        <Text style = {styles.conditionText}>Item Condition</Text>
                        <RadioButtons 
                            data = {itemConditions} 
                            itemData = {itemData} 
                            type = "condition"
                        />
                    </View>

                    <View style = {styles.contactContainer}>
                        <Text style = {styles.conditionText}>Show Contact</Text>
                        <RadioButtons 
                            data = {contact} 
                            itemData = {itemData}
                            type = "contact"
                        />
                    </View>
                    <View style = {styles.contactContainer}>
                        <Text style = {styles.conditionText}>Description</Text>
                        <View style = {styles.descContainer}>
                            <TextInput
                                style = {styles.descText}
                                numberOfLines = {3}
                                value = {values.description}
                                onChangeText={handleChange("description")}
                                onBlur={() => setFieldTouched("description")}
                            />
                            <View>
                                {touched.description && (
                                <Text style={styles.errorText}>{errors.description}</Text>
                                )}
                            </View>
                        </View>
                    </View>
                    <PrimaryButton 
                        buttonTitle = "Submit" 
                        style = {styles.submitButton}
                        onPress = {() => handleSubmit()}
                    />
                    </>
                    )}

                </Formik>
                <View style = {styles.gap}></View>
                
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container : {
        alignItems : "center",
        alignContent : "center",
        padding : 10,
        backgroundColor : "#fff",
        height : "100%"
    },
    safeAreaContainer : {
        backgroundColor : "#fff"
    },
    gap : {
        height : 20
    },
    conditionText : {
        fontSize : 20,
        fontWeight : "bold",
        //color : "#fc5c65",
        marginBottom : 10
    },
    conditionContainer : {
        justifyContent : "flex-start",
        paddingTop : 20,
        width : "100%",
        paddingLeft : 10
    },
    nameContainer : {
        justifyContent : "flex-start",
        paddingTop : 20,
        width : "100%",
        paddingLeft : 10
    },
    contactContainer : {
        justifyContent : "flex-start",
        paddingTop : 20,
        width : "100%",
        paddingLeft : 10,  
    },
    scroll : {
        backgroundColor : "#fff",
        height : "100%"
    },
    descContainer: {
        borderColor : "#fc5c65",
        borderRadius: 10,
        borderWidth : 1,
        width : "95%",
        padding : 10,
        height : 120
      },
      descText : {
        fontSize : 15,
        width : "100%"
        //color : "#a9a9a9"
    },
    submitButton : {
        fontSize : 20,
        color : "#fff"
    },
    errorText : {
        color : "#ff0000"
    }
})

export default AddItemScreen;