import { useState } from "react"
import { number } from "yup/lib/locale"
//import firebase from "../firebase-config"
import {database,storage} from '../firebase-config';
import {itemData} from "../types"

export default () => {

    const getAllItems = async () => {
        return await database.collection("items").get();
    }
    return {
        getAllItems
    }
}