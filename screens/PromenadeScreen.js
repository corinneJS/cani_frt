// Auteur : KB
// Date : Mercredi 14 Février
// Ecran pour créer une promenade
import { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient"; 
import { useDispatch, useSelector } from 'react-redux';
import { addPlace, importPlaces } from '../reducers/user';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

//feuille de style global
const globalCSS = require("../styles/global.js");

import { updateNickname } from '../reducers/user';

export default function PromenadeScreen() {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [name, setName] = useState("");
  const [environment, setEnvironment] = useState("");
  const [rythme, setRythme] = useState("");
  const [distance, setDistance] = useState(0);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [itinerary, setItinerary] = useState([]);
  
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
            setCurrentPosition(location.coords);
          });
      }
    })();

  /*   fetch(`${BACKEND_ADDRESS}/places/${user.nickname}`)
      .then((response) => response.json())
      .then((data) => {
        data.result && dispatch(importPlaces(data.places));
      }); */
  }, []);

  /* const markers = user.places.map((data, i) => {
    return <Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} title={data.name} />;
  }); */

  return (
    <LinearGradient
      colors={["#F2B872", "#FFFFFF"]}
      style={globalCSS.backgrdContainer}
    >
      <Text>Welcome to caniconnect PromenadeScreen !</Text>
      <MapView onLongPress={(e) => handleLongPress(e)} mapType="standard" style={styles.map}>
        {currentPosition && <Marker coordinate={currentPosition} title="My position" pinColor="#fecb2d" />}
       
      </MapView>
      <View style={styles.formContent}>
        <TextInput placeholder="Nom de la promenade" onChangeText={(value) => setName(value)} value={name} style={globalCSS.input} />
        <TextInput placeholder="Environnement" onChangeText={(value) => setEnvironment(value)} value={environment} style={globalCSS.input} />
        <TextInput placeholder="Rythme" onChangeText={(value) => setRythme(value)} value={rythme} style={globalCSS.input} />
        <TextInput placeholder="Distance" onChangeText={(value) => setDistance(value)} value={distance} style={globalCSS.input} />
        <TextInput placeholder="Desription" onChangeText={(value) => setDescription(value)} value={description} style={globalCSS.input} />
        <TextInput placeholder="Durée" onChangeText={(value) => setDuration(value)} value={duration} style={globalCSS.input} />
        <TextInput placeholder="Itinéraire" onChangeText={(value) => setItinerary(value)} value={itinerary} style={globalCSS.input} />

        <TouchableOpacity onPress={() => handleNewWalk()} style={globalCSS.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>Valider</Text>
        </TouchableOpacity>
        
      </View>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2B872',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: '100%',
      height: '30%',
    },
    formContent: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    text:{
      fontFamily: "Lato_400Regular",
      fontSize: 12,
      color: "black",
  
    },
    button: {
      alignItems: "center",
      paddingTop: 8,
      width: "80%",
      marginTop: 30,
      backgroundColor: "#f2B872",
      borderRadius: 10,
      marginBottom: 80,
    },
    textButton: {
      color: "#ffffff",
      height: 30,
      fontWeight: "600",
      fontSize: 16,
    },
    input: {
      width: "80%",
      marginTop: 25,
      borderBottomColor: "#f2B872",
      borderBottomWidth: 1,
      fontSize: 18,
    },
  });
  