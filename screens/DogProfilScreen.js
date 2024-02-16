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
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { infoDog } from "../reducers/dog";

// import gestion date
import moment from "moment";

// import composants internes
import { EditIconBar } from "../components/EditIconBar.js";

//CP :  import feuille de style globale
const globalCSS = require("../styles/global.js");

//
// COMPOSANT DogProfilScreen
//
export default function DogProfilScreen({ navigation }) {
  const dispatch = useDispatch();

  // Init state local dogInfo
  const [dogInfo, setDogInfo] = useState({
    dogName: "",
    description:"",
    userID: "",
    birthdate: new Date(),
    isFemale: false,
    isSterilized: false,
    traitID: [{}],
    activityID: [{}],
    dateCreated: new Date(),
    dogPhotos: [{}],
    dateModified: new Date(),
    breedID: "",
  });
  console.log("dogInfo (init state local)", dogInfo);

  // useSelector pour récupération des données du store Redux
  const dogData = useSelector((state) => state.dog.value);
  console.log("dogData (info redux)",dogData);

  // useEffect pour initialiser le state dogInfo avec les données du store Redux lors du montage du composant
  // et à chaque MAJ de dogData
  useEffect(() => {
    if (dogData) {
      setDogInfo(dogData);
      console.log("dogInfo (Chargement Screen et chaque modif de dogData (le store) : state local MAJ avec dogData)", dogInfo);
    }
  }, [dogData]);

  // A chaque modif d'un champ, mise à jour du state local (avec fieldname en param)
  const handleFieldChange = (name, value) => {
    
        setDogInfo((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      console.log(
        "dogInfo (A chaque changement de valeur d'un champ : state local MAJ avec saisie et fieldname en param)",
        dogInfo
      );


   
    };
 
  // A chaque onBlur (sortie d'un champ), mise à jour du store infoDog avec le state local dogInfo 
  const handleUpdateDogInfo = (name) => {
    dispatch(
      infoDog({
        ...dogInfo,
        [name]: dogInfo[name],
        
      })
      

    );
 console.log(
        "infoDog (A chaque sortie de champ : Store redux MAJ state local dogInfo avec fieldname en param)",
        infoDog
      );
     };

  
  
  
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
          setDogInfo((prevState) => ({
            ...prevState,
            birthdate: date,
          }));
          setIsDatePickerVisible(false); // Fermer le modal après la sélection
        };

        // Fonction pour gérer l'annulation
        const onCancel = () => {
          setIsDatePickerVisible(false);
        };

        // gestion des Switchs
        const toggleSwitchIsFemale = (value) =>
          setDogInfo((prevState) => ({
          ...prevState,
          isFemale: value,
          
        }));
        const toggleSwitchIsSterilized = (value) =>
          setDogInfo((prevState) => ({
            ...prevState,
            isSterilized: value,
          }));
  //
  // FONCTIONS CRUD
  //

  
 
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
            placeholder="Entrez le nom du 4 pattes"
            onChangeText={(value) => handleFieldChange("dogName", value)}
            value={dogInfo.dogName}
            onBlur={() => handleUpdateDogInfo("dogName")}
            style={globalCSS.input}
          />

          <View style={styles.listSwitchContainer}>
            <View style={styles.switchContainer}>
              <Text>{dogInfo.isFemale ? "Femelle" : "Mâle"}</Text>
              <Switch
                value={dogInfo.isFemale}
                onValueChange={(value) => toggleSwitchIsFemale(value)}
                color={dogInfo.isFemale ? "#E91E63" : "#3F51B5"}
              />
            </View>

            <View style={styles.switchContainer}>
              <Switch
                trackColor={{ false: "#B39C81", true: "#F2B872" }}
                thumbColor={dogInfo.isSterilized ? "#F2B872" : "#B39C81"}
                onValueChange={(value) => toggleSwitchIsSterilized(value)}
                value={dogInfo.isSterilized}
              />
              <Text>Stérilisé ?</Text>
            </View>
          </View>

          <View style={styles.dateContainer}>
            <TextInput
              placeholder="date de naissance"
              onChangeText={(value) => handleFieldChange("birthdate", value)}
              value={
                dogInfo.birthdate
                  ? moment(dogInfo.birthdate).format("DD/MM/YYYY")
                  : ""
              }
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
              date={dogInfo.birthdate}
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
            onChangeText={(value) => handleFieldChange("description", value)}
            value={dogInfo.description}
            style={globalCSS.input}
          />

          {/* <TextInput
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
          */}
       {/*    <EditIconBar navigation={navigation} reducerName="infoDog" /> */}
          <Text>"Modifié le : " {infoDog.dateModified}</Text>
          <Text>"Crée le : " {infoDog.dateCreated}</Text>
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
