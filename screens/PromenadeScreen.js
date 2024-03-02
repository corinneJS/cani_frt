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

export default function PromenadeScreen({ navigation }) {
 
 
  return (
    <LinearGradient
      colors={["#F2B872", "#FFFFFF"]}
      style={globalCSS.backgrdContainer}
    >
      <Text> Créez ou recherchez une promenade !</Text>

      <View style={styles.formContent}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("PromenadeCreation")}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={globalCSS.textButton}>Créer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("PromenadeRecherche")}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={globalCSS.textButton}>Chercher</Text>
          </TouchableOpacity>
        </View>
        
      </View>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    formContent: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
    },
    button: {
      alignItems: "center",
      paddingTop: 8,
      width: "30%",
      marginTop: 30,
      marginLeft: 20,
      backgroundColor: "#f2B872",
      borderRadius: 10,
      marginBottom: 80,
    },
  });
  