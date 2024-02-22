// Auteur : KB
// Date : Mercredi 21 Février
// Ecran pour rechercher une promenade par ville
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
  Modal,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient"; 
import { useDispatch, useSelector } from 'react-redux';
import { addWalk, removeWalk, importWalks, addItinerary } from '../reducers/walk';
import { infoUser } from '../reducers/user';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

//feuille de style global
const globalCSS = require("../styles/global.js");


export default function PromenadeRechercheScreen ({ navigation }) {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [name, setName] = useState("");
  const [environment, setEnvironment] = useState("");
  const [rythme, setRythme] = useState("");
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [description, setDescription] = useState("");

  const handleSearch = () => {
    let walkEvents = [];
    fetch(`${process.env.EXPO_PUBLIC_BASE_URL}walks/walkevent/${eventCity}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
      .then(data => {
        walkEvents = data.walkEvents;
        //console.log("walkEvents", walkEvents)
      });
      console.log("walkEvents", walkEvents)
  };

    return (
      <LinearGradient
        colors={["#F2B872", "#FFFFFF"]}
        style={globalCSS.backgrdContainer}
      >
        <Text>Welcome to caniconnect PromenadeRechercheScreen !</Text>
        <View style={styles.searchBar}>
          <TextInput placeholder="Ville" onChangeText={(value) => setEventCity(value)} value={eventCity} style={styles.input} />
          <TouchableOpacity onPress={() => handleSearch()} style={styles.button} activeOpacity={0.8}>
              <Text style={styles.textButton}>Valider</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.walkInfo}>
          <Text> Nom de la promenade : {name} </Text>
          <Text> Environment : {environment} </Text>
          <Text> Rythme : {rythme}</Text>
          <Text> Distance : {distance} </Text>
          <Text> Duration : {duration} </Text>
          <Text> Description : {description} </Text>
        </View> 
        <View style={styles.walkEventInfo}>
          <Text> Nom de l'événement' : {eventName} </Text>
          <Text> Date : {eventDate} </Text>
          <Text> Heure : {eventTime} </Text>
          <Text> Ville : {eventCity} </Text>
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
      searchBar: {
        /* flexDirection: 'column',
        justifyContent: "space-around",
        alignItems: "center", */
      },
      input: {
        width: "80%",
        marginTop: 25,
        borderBottomColor: "#f2B872",
        borderBottomWidth: 1,
        fontSize: 18,
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
      walkInfo: {
        borderColor: '#f2B872',
      },
      walkEventInfo: {
        borderColor: '#f2B872',
      }
    });
    