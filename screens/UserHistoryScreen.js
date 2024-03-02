// UserHistoyScreen : Liste des historiques promenade
// Auteur : CP
//
// --------------------------------------------------
// import des composants
import {
  KeyboardAvoidingView,
  Platform,
  View,
  StyleSheet,
  Text,
  FlatList,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";


// import pour gestion states
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { historyWalkEvent_WebSrv } from "../webservices/userHistory_webSrv.js";


// import feuille de style globale
const globalCSS = require("../styles/global.js");

//---------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------//
// COMPOSANT UserHistoyScreen
//---------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------//
export default function UserHistoryScreen({ navigation, dogID, userID }) {
 console.log("dogID dans history", dogID)
 console.log("userID dans history", userID);

  useEffect(() => {
   (async () => {
     // récup events
    
     const data = await historyWalkEvent_WebSrv(dogID);
     console.log("data en retour du fetch historyWalk", data);
     if (data.result) {
       walkEvents = data.walkEvents;
       console.log("dataResult", data.walkEvents);
     } else {
       Alert.alert("Oups! ", "Pas d'évenements");
     }
   })();
 }, []);
  
  
  // ----------------------------------------------------------------------//
  // USE EFFECT
  // ----------------------------------------------------------------------//

  //---------------------------------------------------------------------------------------------------------------------------------------//
  // INIT DU STATE LOCAL AVEC STORE REDUX

 let walkEvents = [];
   //---------------------------------------------------------------------------------------------------------------------------------------//
  // RETURN DU COMPOSANT
  //---------------------------------------------------------------------------------------------------------------------------------------//
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
            <FlatList
              data={walkEvents}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </KeyboardAvoidingView>

        <StatusBar barStyle={"default"} hidden={false} />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gallery: {
    width: "100%",
    height: "40%",
    backgroundColor: "#ffffff",
  },

  listSwitchContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "space-arrow",
  },

  switchContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: "5",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dropdown: {
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: "#F2B872",
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});
