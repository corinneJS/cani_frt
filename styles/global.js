// Feuille de style globale pour caniConnect
// Auteur : CP
// Contributeurs :
// Objet : liste les styles de base de l'application.
// Utilisation depuis un composant :
// const s = require('../styles/global.js');
// ... puis
// <View style={s.container} ></View>
// --------------------------------------------------


import { StyleSheet } from "react-native";
/* import {
  useFonts,
  BioRhyme_400Regular,
  BioRhyme_700Bold,
} from "@expo-google-fonts/biorhyme";
import {  
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato"; */

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent:"flex-end",
    alignItems: "center",
  },
  divider: {
    borderBottomColor: "#F2B872",
    borderBottomWidth: 1,
    height: 1,
    width: "100%",
  },
  /* body: {
    fontFamily: "Lato_400Regular",
    fontSize: 22,
    color: "black",
  }, */
  title: {
    fontFamily: "BioRhyme_700Bold",
    fontSize: 22,
    color: "black",
    marginBottom: 20,
  },
  stitle: {
    fontFamily: "BioRhyme_400Regular",
    fontSize: 18,
    color: "black",
  },
  text: {
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
  backgrdContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    marginTop: 25,
    borderBottomColor: "#f2B872",
    borderBottomWidth: 1,
    fontSize: 18,
  },
});
