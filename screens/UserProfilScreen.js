<<<<<<< HEAD
// userProfilScreen : profil des utilisateurs
// Auteur : JZ
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
 
  
  
  //CP :  import feuille de style globale
  const globalCSS = require("../styles/global.js");
  
  //
 
  //
  export default function DogProfilScreen({ navigation }) {
    const dispatch = useDispatch();
    const user=useSelector((state) => state.user.value)
  
const[firstname, setFirstName]= useState("");
const[lastName,setLastName]= useState("");
const [email,setEmail]= useState("");
const [isDogOwner, setIsDogOwener]=useState("");
const [isProfessional, setIsProfessional]= useState("");
const [isWalker, setIsWalker]= useState("");
const [city, setCity]= useState("");
const [password, setPassword]=("");

 
  
//     // useSelector pour récupération des données du store Redux
//     const dogData = useSelector((state) => state.dog.value);
//     console.log("dogData (info redux)",dogData);
  
//     // useEffect pour initialiser le state dogInfo avec les données du store Redux lors du montage du composant
//     // et à chaque MAJ de dogData
//     useEffect(() => {
//       if (dogData) {
//         setDogInfo(dogData);
//         console.log("dogInfo (Chargement Screen et chaque modif de dogData (le store) : state local MAJ avec dogData)", dogInfo);
//       }
//     }, [dogData]);
  
//     // A chaque modif d'un champ, mise à jour du state local (avec fieldname en param)
//     const handleFieldChange = (name, value) => {
      
//           setDogInfo((prevState) => ({
//             ...prevState,
//             [name]: value,
//           }));
//         console.log(
//           "dogInfo (A chaque changement de valeur d'un champ : state local MAJ avec saisie et fieldname en param)",
//           dogInfo
//         );
  
  
     
//       };
   
//     // A chaque onBlur (sortie d'un champ), mise à jour du store infoDog avec le state local dogInfo 
//     const handleUpdateDogInfo = (name) => {
//       dispatch(
//         infoDog({
//           ...dogInfo,
//           [name]: dogInfo[name],
          
//         })
        
  
//       );
//    console.log(
//           "infoDog (A chaque sortie de champ : Store redux MAJ state local dogInfo avec fieldname en param)",
//           infoDog
//         );
//        };
  
 
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
              placeholder="Prénom"
              onChangeText={(value) => setFirstName(value)}
              value= {firstname}
              style={globalCSS.input}
                
            />
    <TextInput
              placeholder="Nom"
              onChangeText={(value) => setLastName(value)}
              value= {lastName}
              style={globalCSS.input}
                
    />
        <TextInput
              placeholder="Ville"
              onChangeText={(value) => setCity(value)}
              value= {city}
              style={globalCSS.input}
                
            />
    <TextInput
               placeholder="Email"
               autoCapitalize="none" 
               keyboardType="email-address"
               autoComplete="email" 
               onChangeText={(value) => setEmail(value)}
               value={email}
               style={globalCSS.input}
                
            />
    <TextInput
              placeholder="Mot de passe"
              onChangeText={(value) => setPassword(value)}
              value= {password}
              style={globalCSS.input}
                
            />
  
  <View style={styles.switchContainer}>
                <Switch
                  trackColor={{ false: "#B39C81", true: "#F2B872" }}
                  thumbColor={isOwnerDog ? "#F2B872" : "#B39C81"}
                  onValueChange={toggleSwitchIsSterilized}
                  value={isOwnerDog}
                />
              </View>

              <View style={styles.switchContainer}>
                <Switch
                  trackColor={{ false: "#B39C81", true: "#F2B872" }}
                  thumbColor={isProfessional ? "#F2B872" : "#B39C81"}
                  onValueChange={toggleSwitchIsSterilized}
                  value={isProfessional}
                />
               
              </View>

              <View style={styles.switchContainer}>
                <Switch
                  trackColor={{ false: "#B39C81", true: "#F2B872" }}
                  thumbColor={isWalker ? "#F2B872" : "#B39C81"}
                  onValueChange={toggleSwitchIsSterilized}
                  value={iswalker}
                />
               
              </View>







  
          
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
      alignItems: "center",}