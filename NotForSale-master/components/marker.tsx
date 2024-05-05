import React, { useEffect } from 'react';
import { View } from 'react-native';
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';

function MarkItems({coordinates}) {

    useEffect(() => {
        console.log("coordinates are :",coordinates)
    })

    return (
        <Marker 
            coordinate = {coordinates}
        />
    );
}

export default MarkItems;