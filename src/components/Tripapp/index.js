import React, { useEffect } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import MyComponent from "./map";
import { DirectionsService } from "@react-google-maps/api";
const Tripapp = (props) => {
  const { color, text } = props;
  const [useMyLocation, setUseMyLocation] = React.useState(false);
  const [points, setPoints] = React.useState(null);

  useEffect(() => {
    const directionsService = new DirectionsService();
    const origin = {
      lat: 45.267136,
      lng: 19.833549,
    };
    const destination = {
      lat: 44.7866,
      lng: 20.4489,
    };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        //travelMode: google.maps.TravelMode.DRIVING,
        waypoints: [
          {
            location: new google.maps.LatLng(45.267136, 19.833549),
          },
          {
            location: new google.maps.LatLng(44.7866, 20.4489),
          },
        ],
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log(result);
          setPoints({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      },
    );
  }, []);

  useEffect(() => {
    if (useMyLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPoints((prevPoints) => {
            const newPoints = [...prevPoints];

            return newPoints.push({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          });
        },
        (error) => {
          console.error(error);
        },
      );
    }
  }, [useMyLocation]);

  return (
    <View style={styles.wrapper}>
      <Text style={{ color }}>{text}</Text>
      <MyComponent points={points} />
      <TextInput disabled={useMyLocation} />
      <TextInput disabled={useMyLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Tripapp;
