import { useState } from 'react';
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
//feuille de style global
const globalCSS = require("../styles/global.js");


import { useDispatch } from 'react-redux';


export default function BreedsScreen() {
  

  return (
    <LinearGradient
      colors={["#F2B872", "#FFFFFF"]}
      style={globalCSS.backgrdContainer}
    >
      <Text>Welcome to caniconnect BreedsScreen !</Text>
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
  