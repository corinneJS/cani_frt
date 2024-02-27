import { useState } from "react";
import {
  Image,
  
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialCommunityIcons
} from "@expo/vector-icons";
//feuille de style global
const globalCSS = require("../styles/global.js");


import { useSelector } from "react-redux";



// variables pour gestion hauteur du container principal
const screenHeight = Dimensions.get("window").height;
const headerHeight = 60;

export default function ProfilScreen({navigation}) {
// Import des profils
const reduxInfoUser = useSelector((state) => state.user.value);
const reduxInfoDog = useSelector((state) => state.dog.value);
console.log(reduxInfoDog);


  return (
    <LinearGradient
      colors={["#F2B872", "#FFFFFF"]}
      style={globalCSS.backgrdContainer}
    >
      <View
        style={[globalCSS.container, { height: screenHeight - headerHeight }]}
      >
        <Text style={globalCSS.title}>Choisissez un profil</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            style={styles.profileContainer}
            onPress={() => navigation.navigate("UserProfil")}
          >
            <MaterialCommunityIcons
              name="account-cog-outline"
              size={50}
              color="#F2B872"
            />
            <Text style={globalCSS.stitle}>{reduxInfoUser.username}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profilContainer}
            onPress={() =>
              navigation.navigate("DogProfil", { dogID: reduxInfoDog.dogID })
            }
          >
            <MaterialCommunityIcons name="dog" size={50} color="#F2B872" />
            <Text style={globalCSS.stitle}>{reduxInfoDog.dogName}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileContainer}
            onPress={() => navigation.navigate("DogProfil", { dogID: null })}
          >
            <MaterialCommunityIcons name="dog" size={50} color="#F2B872" />
            <Text style={globalCSS.stitle}>Ajouter...</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  iconsContainer: {
    flex: 1,
    flexDirection: "row",
    width:"50%",
    alignItems:"center",
    justifyContent:"space-around"
  },
});
