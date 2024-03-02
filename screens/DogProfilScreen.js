// DogProfilScreen : Profil d'un 4pattes avec galerie photo, visu caractéristiques races
// Auteur : CP
//
// --------------------------------------------------
// import des composants
import {
  KeyboardAvoidingView,
  Platform,
  
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Switch,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Affichage Galerie photo
import Gallery from "../components/Gallery.js";
import MultiSelectDropdown from "../components/MultiSelectDropdown";

// import pour gestion states
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { infoDog } from "../reducers/dog";
import { infoUser } from "../reducers/user";
// import pour fetch sur Lov traits
import { AllTraits_webSrv } from "../webservices/traits_webSrv.js";
import { updateDog_webSrv } from "../webservices/dogs_webSrv.js";
// import feuille de style globale
const globalCSS = require("../styles/global.js");

//---------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------//
// COMPOSANT DogProfilScreen
//---------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------//
export default function DogProfilScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const dogID = route.params.dogID;
  const userID = route.params.userID;
  console.log("userID route : ", userID);
  console.log("dogID route : ", dogID);

  const [dogInfo, setDogInfo] = useState({});
  const [photosInfo, setPhotosInfo] = useState([]);
 
  // Preparation Listes de Valeurs
  const [traitsDog, setTraitsDog] = useState([]);
  const [traitsData, setTraitsData] = useState([]);
  const [selected, setSelected] = useState([]);
  // Gestion birthdate DatePicker

  // ----------------------------------------------------------------------//
  // USE EFFECT
  // ----------------------------------------------------------------------//

  //---------------------------------------------------------------------------------------------------------------------------------------//
  // INIT DU STATE LOCAL AVEC STORE REDUX

  const dogInfoTmp = useSelector((state) => state.dog.value);
  
  console.log("dogInfoTmp (recup du reducer)", dogInfoTmp);
  useEffect(() => {
    (async () => {
      if (dogID) {
        setDogInfo(dogInfoTmp);
        setPhotosInfo(dogInfoTmp.dogPhotos);
        
        //setActivitiesDogData(dogInfo.activityID);
      } else {
        // Préparation des données du State Local dogInfo
        const initialStateDogInfo = {
          dogID: "",
          dogName: "",
          description: "",
          userID: userID,
          birthdate: new Date().toISOString(),
          isFemale: false,
          isSterilized: false,
          traitID: [],
          activityID: [],
          dateCreated: new Date().toISOString(),
          dogPhotos: [],
          dateModified: new Date().toISOString(),
          breedID: "",
        };
        setDogInfo(initialStateDogInfo);
      }
      // récup traits
      const data = await AllTraits_webSrv();
      
      if (data.result) {
        const simplifiedArray = await data.traits.map((item) => ({key:item._id,value:item.trait}));
        setTraitsData(simplifiedArray); // init lov Traits
        
        const preparedTraitsDog = dogInfoTmp.traitID.map(trait => {
          const found = simplifiedArray.find(element => element.key === trait);
            return found ? { key: found.key, value: found.value } : null;
        })
        .filter(item => item !== null);
        setSelected(dogInfoTmp.traitID);
        setTraitsDog(preparedTraitsDog);
        

      } else {
        Alert.alert(
          "Oups! ",
          "Les traits de caractères de chien sont introuvables"
        );
      }
    })();
  }, []);

  const handleSave = async () => {
    console.log("dogInfo en entrée du handle ", dogInfo);
    if (dogID) {
      const data = await updateDog_webSrv(dogInfo);
    } else {
      const data = await addDog_webSrv(dogInfo);
    }
    console.log("dataUpdate",data)
    if (data.result) {
      Alert.alert("caniConnect", `MAJ effectuée`);
      if (!dogID) {
        dogID = data.dog._id;
      }
    } else {
      Alert.alert("Oups !", `erreur dans update dog ${data.error}`);
    }
  };

  // -----------------------------------------------------------------------------------------------------------
  // FONCTIONS
// MultiSelect


const handleOnBlurTraits  = (selected) => {
  const listID = selected.map((item) => (item.key));
  setDogInfo((prevState) => ({ ...prevState, traitID: listID }));
  dispatch(infoDog(dogInfo));
};


  // A chaque modif d'un TextInput, mise à jour du state local (avec fieldname en param)
  const handleFieldChange = (name, value) => {
    setDogInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(`dogInfo MAJ du champ : ${name} avec : ${value}`);
  };

  // A chaque onBlur (sortie d'un TextInput), mise à jour du store infoDog avec le state local dogInfo
  const handleUpdateDogInfo = (name) => {
    let value = { ...dogInfo, [name]: dogInfo[name] };
    dispatch(infoDog(value));
    console.log(`MAJ infoDog Redux`, value);
  };

  //---------------------------------------------------------------------------------------------------------------------------------------//
  //DatePickerModal
  // fonction pour date affichée en français 
  const formatDateToFrench = (dateIsoString) => {
    const date = new Date(dateIsoString);
    return date.toLocaleDateString("fr-FR"); // Convertit en format français JJ/MM/AAAA
  };
   
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const onConfirm = (date) => {
    console.log("btn SAVE : nvl date: ",date)
    setDogInfo((prevState) => ({
      ...prevState,
      birthdate: date.toISOString(), // Store selected date in ISO format
    }));
    let value = { ...dogInfo, birthdate: date.toISOString() };
    dispatch(infoDog(value));
    console.log(`MAJ infoDog Redux retour birthdate`, value);
    setDatePickerVisibility(false);
  };
  
  
  
  //---------------------------------------------------------------------------------------------------------------------------------------//
  // gestion des Switchs
  const toggleSwitchIsFemale = (params) => {
    setDogInfo((prevState) => ({
      ...prevState,
      isFemale: params,
    }));
    let value = { ...dogInfo, isFemale: params };
    dispatch(infoDog(value));
    console.log(`MAJ infoDog Redux`, value);
  };

  const toggleSwitchIsSterilized = (params) => {
    setDogInfo((prevState) => ({
      ...prevState,
      isSterilized: params,
    }));
    let value = { ...dogInfo, isSterilized: params };
    dispatch(infoDog(value));
    console.log(`MAJ infoDog Redux`, value);
  };

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
            <View style={styles.gallery}>
              <Gallery
                navigation={navigation}
                photosInfo={dogInfoTmp.dogPhotos}
              />
            </View>
            <ScrollView style={styles.scrollview}>
              <TextInput
                placeholder="Entrez le nom du 4 pattes"
                onChangeText={(value) => handleFieldChange("dogName", value)}
                value={dogInfo.dogName}
                onBlur={() => handleUpdateDogInfo("dogName")}
                style={globalCSS.input}
              />

              <View style={styles.listSwitchContainer}>
                <View style={styles.switchContainer}>
                  <Switch
                    trackColor={{ false: "#B39C81", true: "#F2B872" }}
                    thumbColor={dogInfo.isSterilized ? "#F2B872" : "#B39C81"}
                    value={dogInfo.isFemale}
                    onValueChange={(value) => toggleSwitchIsFemale(value)}
                  />
                  <Text>{dogInfo.isFemale ? "Femelle" : "Mâle"}</Text>
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
                <Text>
                  Je suis né(e) le : {formatDateToFrench(dogInfo.birthdate)}
                </Text>
                <TouchableOpacity
                  style={globalCSS.profilContainer}
                  onPress={() => setDatePickerVisibility(true)}
                >
                  <MaterialCommunityIcons
                    name="calendar-edit"
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
                <DatePickerModal
                  locale="en"
                  mode="single"
                  visible={isDatePickerVisible}
                  onDismiss={() => setDatePickerVisibility(false)}
                  date={new Date(dogInfo.birthdate)} // Convert ISO string back to Date object for the picker
                  onConfirm={({ date }) => onConfirm(date)}
                />
              </View>

              <TextInput
                placeholder="Je suis un 4pattes ..."
                onChangeText={(value) =>
                  handleFieldChange("description", value)
                }
                onBlur={() => handleUpdateDogInfo("description")}
                value={dogInfo.description}
                style={globalCSS.input}
              />
              <View style={styles.selectListContainer}>
                <MultiSelectDropdown
                  options={traitsData}
                  selectedOptions={traitsDog}
                  onBlur={handleOnBlurTraits}
                />
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("UserHistory", {
                    dogID: dogID,
                    userID: userID,
                  })
                }
                style={globalCSS.button}
                activeOpacity={0.8}
              >
                <Text style={globalCSS.textButton}>Historique</Text>
              </TouchableOpacity>
              <Text>
                Mon Humain :{useSelector((state) => state.user.value.username)}
              </Text>
              <Text>
                Modifié le :{formatDateToFrench(dogInfo.dateModified)}
              </Text>
              <Text>Crée le :{formatDateToFrench(dogInfo.dateCreated)}</Text>

              <TouchableOpacity
                onPress={() => handleSave()}
                style={globalCSS.button}
                activeOpacity={0.8}
              >
                <Text style={globalCSS.textButton}>
                  {dogID ? "Enregistrer" : "Ajouter"}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>

        <StatusBar barStyle={"default"} hidden={false} />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    width: "100%",
  },
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
