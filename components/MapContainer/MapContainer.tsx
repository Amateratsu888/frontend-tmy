"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

interface MapContainerProps {
  google?: any; // You can improve the type for google if needed
  latitude: number;
  setLatitude: Dispatch<SetStateAction<number>>;
  longitude: number;
  setLongitude: Dispatch<SetStateAction<number>>;
  altitude: number;
  setAltitude: Dispatch<SetStateAction<number>>;
}

const MapContainer: React.FC<MapContainerProps> = ({
  google,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  altitude,
  setAltitude,
}: MapContainerProps) => {
  const mapStyles = {
    width: "70%",
    height: "90%",
  };

  // Handle the map click event to get the coordinates
  const onMapClick = (mapProps: any, map: any, clickEvent: any) => {
    setLatitude(clickEvent.latLng.lat());
    setLongitude(clickEvent.latLng.lng());
  };

  return (
    //The <Map></Map> need the following props
    //initialCenter={} will be the center on the Map
    <div className="">
      <Map
        google={window.google}
        zoom={12}
        style={mapStyles}
        initialCenter={{
          lat: latitude,
          lng: longitude,
        }}
        onClick={onMapClick}
      >
        <Marker
          position={{
            lat: latitude,
            lng: longitude,
          }}
        />
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyASEx6Tw3L4lNegdVtj9NbcW7WW9qY_0Rs", // Replace with your Google Maps API Key
})(MapContainer);
