import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import MapView, { AnimatedRegion, Marker, Callout, CalloutSubview } from 'react-native-maps';
import {PrimaryButton} from "../components/custom-button"
import {getAppState} from "../redux/state-provider"
import { UserAction } from '../redux/user-reducer';
import ItemService from "../firebase-services/get-item-data"
import {initialItemData, itemData} from "../types"
import MarkItems from "../components/marker"
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
// const LATITUDE = 29.9990674;
// const LONGITUDE = -90.0852767;
const LATITUDE_DELTA = 0.0722;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.001;


const initialMapData = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0
}
const coordinates = {
  latitude: 42.65460967523673,
  longitude: -71.32841492305862,
}


export default function HomeMapView({navigation}) {
  const {
    state,
    dispatch
} = getAppState();

  const [region, setRegion] = useState(initialMapData);
  const [marker, setMarker] = useState(coordinates);
  const initialData : itemData[] = [];
  const localData : itemData[] = [];
  const [itemsData, setItemsData] = useState([initialItemData]);

  // useEffect(() => {
  //   console.log("user is",markers)
  // },[])

  useEffect(()  =>  {
    getAllItems();
  },[])

  useEffect(()  =>  {
    getCurrentLocation();
  },[])

  const getAllItems = () => {
    ItemService().getAllItems()
    .then((docSnapshot) => {
      docSnapshot.forEach((doc) => {
        const data = {
          itemId: doc.get("itemId"),
          userId: doc.get("userId"),
          itemName: doc.get("itemName"),
          desc: doc.get("desc"),
          condition: doc.get("condition"),
          contact: doc.get("contact"),
          timestamp: doc.get("timestamp"),
          coordinate: doc.get("coordinate"),
          imageUri : doc.get("imageUri"),
        }
        localData.push(data)
      })
      
      setItemsData(localData);
      //console.log("items data is ",itemsData)
    })
  }

  const getCurrentLocation = async () => {
    await navigator.geolocation.getCurrentPosition((position) => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude, 
          latitudeDelta: 0.0722,
          longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO
        };
        setRegion(region);
        const coordinates = {
            latitude: region.latitude + SPACE,
            longitude: region.longitude + SPACE
        }
        setMarker(coordinates);
    },
  );
}



  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        //initialRegion={region}
        region={region}
        zoomTapEnabled={false}
        showsUserLocation={true}
      >
        {itemsData.map((item) => (
            <Marker 
              key = {item.itemId}
              coordinate={item.coordinate}
              // title = {item.title}
              // onCalloutPress = {()=>{}}
            >
              <Callout tooltip style = {styles.markerContainer} onPress = {() => navigation.navigate("itemDetails", {itemDetails : item})}>
                <Text style = {styles.itemTitle}>{item.itemName}</Text>
                {/* <Button title = "View Details" onPress = {() => navigation.navigate("itemDetails")}/> */}
                <TouchableOpacity
                  style = {styles.markerButton} 
                  onPress = {() => navigation.navigate("itemDetails", {itemDetails : item})}
                >
                  <Text>View Details</Text>
                </TouchableOpacity>
              </Callout>
              
              
            </Marker>
        ))}
            
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  buttons : {
    position : "absolute",
    bottom : width * 0.2,
    width : "100%"
  },
  markerContainer : {
    padding : 3,
    alignContent : "center",
    alignItems : "center"
  },
  itemTitle : {
    fontSize : 18
  },
  markerButton : {
    padding : 8,
    backgroundColor : "#fc5c65",
    borderRadius : 7,
    marginTop : 5
  }
});

