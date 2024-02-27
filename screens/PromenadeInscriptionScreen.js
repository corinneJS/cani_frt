// Auteur : KB
// Date : Mercredi 21 Février
// Ecran pour s'inscrire à une promenade
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


export default function PromenadeInscriptionScreen ({ navigation }) {
  

    return (
      <LinearGradient
        colors={["#F2B872", "#FFFFFF"]}
        style={globalCSS.backgrdContainer}
      >
        <Text>Welcome to caniconnect PromenadeInscriptionScreen !</Text>
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
    });
    