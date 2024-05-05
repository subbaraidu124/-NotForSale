import { useState } from "react"
import { number } from "yup/lib/locale"
//import firebase from "../firebase-config"
import {database,storage} from '../firebase-config';
import {itemData} from "../types"

export default () => {

    const setCurrentLocation = async (itemData) => {
      await navigator.geolocation.getCurrentPosition((position) => {
        const data = {
          latitude : position.coords.latitude,
          longitute : position.coords.longitude,
            
        }
        itemData["coordinate"] = position;
    })
    }

    const getItemId = async () => {
        return await database.collection("item-id-manager").doc("admin").get()
    }

    const setItemId = async () => {
        const idConfig = await getItemId();
        let newItemId = idConfig.data()?.itemId;
    
        newItemId = newItemId + 1;
        let data = {
          itemId: newItemId,
        };
        database.collection("item-id-manager").doc("admin").set(data);
    };

    const storeImage = async (currentUri, itemId) => {
      const response = await fetch(currentUri);
      const blob = await response.blob();
      var ref = storage.ref().child("item-images/" + itemId);
      ref.put(blob);
    }

    const addItem = async (itemData : itemData, itemId) => {
      let newItemId = itemId.toString();
      await database.collection("items").doc(newItemId).set(itemData);
    }

    return {
          getItemId,
          setItemId,
          addItem,
          storeImage,
          setCurrentLocation
    }
}