import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  
  View,
  StatusBar,
  Text,
 
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient"; 
import { MaterialCommunityIcons } from "@expo/vector-icons";
//feuille de style global
const globalCSS = require("../styles/global.js");


import { useDispatch } from 'react-redux';


export default function HomeScreen({navigation}) {
  

  return (
    <LinearGradient
      colors={["#F2B872", "#FFFFFF"]}
      style={globalCSS.backgrdContainer}
    >
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={globalCSS.container}>
           
            <View style={globalCSS.iconsContainer}>
              <TouchableOpacity
                style={globalCSS.profilContainer}
                onPress={() => navigation.navigate("PromenadeRecherche")}
              >
                <MaterialCommunityIcons
                  name="paw-outline"
                  size={80}
                  color="black"
                />
                <Text style={globalCSS.stitle}>Rechercher une promenade</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={globalCSS.profilContainer}
                onPress={() => navigation.navigate("PromenadeCreation")}
              >
                <MaterialCommunityIcons name="plus" size={80} color="black" />
                <Text style={globalCSS.stitle}>Créer une promenade</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={globalCSS.profilContainer}
                onPress={() => navigation.navigate("Races")}
              >
                <MaterialCommunityIcons name="dog" size={80} color="black" />
                <Text style={globalCSS.stitle}>Annuaire des Races</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>

        <StatusBar barStyle={"default"} hidden={false} />
      </SafeAreaView>
    </LinearGradient>
  );
}


  