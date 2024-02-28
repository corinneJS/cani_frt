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
import {Dimensions} from "react-native";

// variables pour gestion hauteur du container principal
const screenHeight = Dimensions.get("window").height;
const headerHeight = 65;
const bottomHeight = 50;
const screenWidth = Dimensions.get("window").width;


module.exports = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth - 30,
    height: screenHeight - (bottomHeight + headerHeight),
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 65,
  },
  iconsContainer: {
    flexDirection: "row",
    
    flexWrap: "wrap",

    flexGrow:1,
    minWidth: "26%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  profilContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 10,
    padding: 10,
  },
  divider: {
    borderBottomColor: "#000000",
    borderBottomWidth: 4,
    height: 2,
    width: "100vw",
  },

  title: {
    fontFamily: "BioRhyme_700Bold",
    fontSize: 22,
    color: "black",
    marginVertical: 40,
  },
  stitle: {
    fontFamily: "BioRhyme_400Regular",
    fontSize: 18,
    color: "black",
    marginVertical: 10,
  },
  text: {
    fontFamily: "Lato_400Regular",
    fontSize: 12,
    color: "black",
  },
  button: {
    alignItems: "center",
    paddingTop: 8,

    width: "90%",
    marginTop: 30,
    marginHorizontal: 20,
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
    width: "90%",
    marginTop: 20,
    borderBottomColor: "#F2B872",
    borderBottomWidth: 1,
    fontSize: 18,
  },
});
