// DogProfilScreen : Profil d'un 4pattes avec galerie photo, visu caractéristiques races
// Auteur : CP
//
// --------------------------------------------------
// import des composants
import {
  KeyboardAvoidingView,
  Platform,
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import { LinearGradient } from "expo-linear-gradient";
import {  MaterialIcons} from "@expo/vector-icons";
// import pour gestion states
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
//CP : import pour la gestion des échanges avec le backend
import { viewDog_webSrv } from "../webservices/dogs_webSrv.js";

//CP :  import feuille de style globale
const globalCSS = require("../styles/global.js");

export default function DogProfilScreen({ navigation }) {
  const dispatch = useDispatch();

  // Variables Form
  const [dogName, setDogName] = useState("");
  const [description, setDescription] = useState("");
  const [birthdate, setBirthdate] = useState(new Date()); // CP A faire DatePicker
  const [isFemale, setIsFemale] = useState(Boolean); 
  const toggleSwitchIsFemale = () =>
    setIsFemale((previewsState) => !previewsState);
  const [isSterilized, setIsSterilized] = useState(false);
  const toggleSwitchIsSterilized = () =>
    setIsSterilized((previewsState) => !previewsState);
  const [trait, setTrait] = useState(""); // CP : A faire : proposer liste déroulante choix multiple
  const [activity, setActivity] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [dateModified, setDateModified] = useState("");
  const [userID, setUserID] = useState(""); // CP : A faire : init avec user connecté
  const [breedID, setBreedID] = useState("");

// variables UX
const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);



  //
  // FONCTIONS UX

  // Gestion Picker Date
  // Fonction pour ouvrir le modal
  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  // Fonction pour gérer la confirmation de la date
  const onConfirm = (date) => {
    setBirthdate(date);
    setIsDatePickerVisible(false); // Fermer le modal après la sélection
  };

  // Fonction pour gérer l'annulation
  const onCancel = () => {
    setIsDatePickerVisible(false);
  };
//
// FONCTIONS CRUD
// 
// Afficher le 4pattes

// Ajouter un nouveau 4pattes
const handle_ADD = async () => {
    const dogData = {
      dogName: dogName,
      description: description,
      birthdate: birthdate,
      isFemale: isFemale,
      isSterilized: isSterilized,
      trait: trait,
      activity: activity,
      dateCreated: dateCreated,
      dateModified: dateModified,
      //userID
      //breedID
    };
    console.log("dog_data en partance vers ws:", dogData);
    dogs_webSrv(dogData).then((data) => {
      console.log("data in screen", data);
      if (data.result) {
        dispatch(
          infoDog({
            dogName,
            isFemale,
            isSterilized,
          })
        );
        Alert.alert("Profil 4 pattes", `le profil de ${dogName} est enregistré !`);
      } else {
        Alert.alert("Oups !", `un pb est survenu : ${data.error}`);
      }
    });
  };

  // 
  // Use Effect : afficher le profil du 4 pattes
  //
/*   useEffect(() => {
    (async () => {




viewDog_webSrv(userData).then((data) => {
      console.log("data in screen", data);
      if (data.result) {
        dispatch(
          infoUser({
            username,
            email,
            isDogOwner,
            isProfessional,
            city,
            token: data.token,
          })
        );
        setUsername("");
        setEmail("");
        setIsDogOwner(true);
        setIsProfessional(false);
        setPassword("");
        setCity("");
        setDescription("");
        navigation.navigate("TabNavigator");
      } else {
        Alert.alert("Oups !", `un pb est survenu : ${data.error}`);
      }
    });
        
  };





      
      if () {
        
      }
    })();
    fetch(
      `http://192.168.1.198:3000/places/${encodeURIComponent(user.nickname)}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(importPlaces(data.places));
          setPlaces(data.places);
        }
      });
  }, []); */
  
  
  
  
  
  
  
  //
  // RETURN DU COMPOSANT
  //
  return (
    <LinearGradient
      colors={["#F2B872", "#FFFFFF"]}
      style={globalCSS.backgrdContainer}
    >
      <KeyboardAvoidingView
        style={globalCSS.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.formContent}>
          <TextInput
            placeholder="nom du 4 pattes"
            onChangeText={(value) => setDogName(value)}
            value={dogName}
            style={globalCSS.input}
          />

          <View style={styles.listSwitchContainer}>
            <View style={styles.switchContainer}>
              <Text>{isFemale ? "Femelle" : "Mâle"}</Text>
              <Switch
                value={isFemale}
                onValueChange={toggleSwitchIsFemale}
                color={isFemale ? "#E91E63" : "#3F51B5"}
              />
            </View>

            <View style={styles.switchContainer}>
              <Switch
                trackColor={{ false: "#B39C81", true: "#F2B872" }}
                thumbColor={isSterilized ? "#F2B872" : "#B39C81"}
                onValueChange={toggleSwitchIsSterilized}
                value={isSterilized}
              />
              <Text>Stérilisé ?</Text>
            </View>
          </View>

          <View style={styles.dateContainer}>
            <TextInput
              placeholder="date de naissance"
              onChangeText={(value) => setBirthdate(value)}
              value={birthdate}
              style={globalCSS.input}
            />
            <TouchableOpacity onPress={showDatePicker}>
              <MaterialIcons name="calendar-month" size={24} color="black" />
            </TouchableOpacity>

            <DatePickerModal
              locale="fr"
              // Propriété pour rendre le modal visible ou non
              visible={isDatePickerVisible}
              // La date actuellement sélectionnée à afficher
              date={birthdate}
              // Fonction appelée lorsque l'utilisateur confirme la sélection
              onConfirm={onConfirm}
              // Fonction appelée lorsque l'utilisateur annule la sélection
              onCancel={onCancel}
              // Configuration supplémentaire, comme la limitation de la plage de dates
              mode="single"
            />
          </View>
          <TextInput
            placeholder="Je suis un 4pattes ..."
            onChangeText={(value) => setDescription(value)}
            value={description}
            style={globalCSS.input}
          />

          <TextInput
            placeholder="traits de caractère"
            onChangeText={(value) => setTrait(value)}
            value={trait}
            style={globalCSS.input}
          />
          <TextInput
            placeholder="Activités"
            onChangeText={(value) => setActivity(value)}
            value={activity}
            style={globalCSS.input}
          />
          <TextInput
            placeholder="créé le"
            onChangeText={(value) => setDateCreated(value)}
            value={dateCreated}
            style={globalCSS.input}
          />
          <TextInput
            placeholder="Modifié le"
            onChangeText={(value) => setDateModified(value)}
            value={dateModified}
            style={globalCSS.input}
          />
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "90%",

    resizeMode: "contain",
  },
  formContent: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  listSwitchContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  switchContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
