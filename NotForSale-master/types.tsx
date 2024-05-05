import { LatLng } from "react-native-maps";
import { number } from "yup/lib/locale";

export type RootStackList = {
    bottomTab: undefined;
    auth: undefined;
  };

export type AuthenticationStackList = {
    login: undefined;
    signUp: undefined;
};

export type BottomTabList = {
  home: undefined,
  addItem : undefined,
  account : undefined
}

export type AccountStackList = {
  account: undefined,
  myProfile: undefined,
  changePassword: undefined
}

export type ItemDetailsNavigator = {
  home : undefined,
  itemDetails : undefined
}

export interface UserData {
  userId : string,
  phoneNumber : string,
  name : string
}

export const initialUserData : UserData = {
  userId : "",
  phoneNumber : "",
  name : ""
}

export interface coordinates {
  latitude : number,
  longitude : number,
}

export const initialCoordinates : coordinates = {
  latitude: 42.65476340829496,
  longitude: -71.32835290017333,
}

export interface itemData {
  itemId: number,
  userId: string,
  itemName: string,
  desc: string,
  condition: string,
  contact: string,
  timestamp: Date,
  coordinate: LatLng,
  imageUri : string,
}

export const initialItemData : itemData = {
  itemId: 0,
  userId: "",
  itemName: "",
  desc: "",
  condition: "",
  contact: "",
  timestamp: new Date(),
  coordinate: {
    latitude : 0,
    longitude : 0
  },
  imageUri : "",
}

export const initialMarkerData = {
    itemName: "",
    desc: "",
    itemId: 0,
    condition : "",
    contact : "",
    imageUri : "",
    userId : "",
    timestamp : ""
}

export interface coordinatesData {
  itemId : number,
  itemName: string,
  desc: string,
  imageUri: string,
  userId: string,
  coordinate : {
    latitude : number,
    longitude : number
  }
}
