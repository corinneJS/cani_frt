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
  Text,
  TextInput,
  Switch,
  ScrollView,
  SafeAreaView, TouchableOpacity,
  Alert
 
} from "react-native";
import { DatePickerModal } from "react-native-paper-dates";

import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import {MultipleSelectList} from "react-native-dropdown-select-list";
// Affichage Galerie photo
import {Gallery} from "../components/Gallery.js";

// import pour gestion states
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { infoDog } from "../reducers/dog";
import { infoUser } from "../reducers/user";
// import pour fetch sur Lov traits
import {AllTraits_webSrv} from "../webservices/traits_webSrv.js";
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
  console.log("dogID route : ", dogID);

  // Préparation des données du State Local dogInfo
  const initialStateDogInfo = {
    dogID: "",
    dogName: "",
    description: "",
    userID: "",
    birthdate: new Date().toLocaleDateString("fr"),
    isFemale: false,
    isSterilized: false,
    traitID: [],
    activityID: [],
    dateCreated: new Date().toLocaleDateString("fr"),
    dogPhotos: [],
    dateModified: new Date().toLocaleDateString("fr"),
    breedID: "",
  };
  const [dogInfo, setDogInfo] = useState("");
  const [photosInfo, setPhotosInfo] = useState([]);
  const [traitsDogData, setTraitsDogData] = useState([]);
  // Preparation Listes de Valeurs
  const [traitsData, setTraitsData] = useState([]);
  const [selected, setSelected] = useState([]);
  // Gestion birthdate DatePicker
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  

  // ----------------------------------------------------------------------//
  // USE EFFECT
  // ----------------------------------------------------------------------//

  //---------------------------------------------------------------------------------------------------------------------------------------//
  // USE EFFECT pour initialiser le state dogInfo
  // avec les données du store Redux lors du montage du composant
  // si le dogID est renseigné on initialise
  const dogInfoTmp = useSelector((state) => state.dog.value);
  console.log("dogInfoTmp (recup du reducer", dogInfoTmp);
  useEffect(() => {
    (async () => {
      if (dogID) {
        setDogInfo(dogInfoTmp);
        setPhotosInfo(dogInfoTmp.dogPhotos);
        setTraitsDogData(dogInfoTmp.traitID);
        console.log("dogInfoTmp du toutou : ", dogInfoTmp);
        //setActivitiesDogData(dogInfo.activityID);
        //setPhotosDogData(dogInfo.photosDog);
      } else {
        setDogInfo(initialStateDogInfo);
      }
    })();
  }, []);

  let lovTraits = [];
  // Chargement de la Liste de Valeur traitsDog Fonction exécutée
  useEffect(() => {
    (async () => {
      // Recup liste de tous les traits de caractère en BDD
      const data = await AllTraits_webSrv();
      console.log("data en retour du fetch AllTraits", data);
      // MAJ de la liste des traits de caractère avec sélection des traits
      // du chien constenu dans traitsDogData

      lovTraits = await data.traits.map((item) => {
        // Vérifie si l'item actuel correspond à un élément dans `traitsDogData`
        console.log("traitDogData avec Some", traitsDogData);
        const haveTraits = traitsDogData.some((trait) => trait.id === item._id);
        if (haveTraits) {
          return { key: item._id, value: item.trait, isSelected: true };
        }
        // Sinon, retourne l'item sans sélection
        return { key: item._id, value: item.trait, isSelected: false };
      });
      console.log("lovtraits", lovTraits);
      setTraitsData(lovTraits); // init lov Traits avec selected traits de dog
      console.log(
        "traitsData avec les traits du chien sélectionnés",
        traitsData
      );
    })();
  }, []);

  // use effect pour gerer la navigation (si on sort on enregistre en bdd)
  //
  const handleSave = async () => {
    console.log("dogInfo en entrée du handle ", dogInfo);
    const data = await updateDog_webSrv(dogInfo);
    console.log("Reponse OK j'enregistre : ", dogInfo);
    if (data.result) {
      // dispatch(infoDog(dogInfo));
    } else {
      Alert.alert("Oups !", `erreur dans update dog ${data.error}`);
    }
  };

  
  // -----------------------------------------------------------------------------------------------------------
  // FONCTIONS

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
  // Gestion

  // Galerie :
  // photo de profil

  // Fonction pour gérer le datePicker
  
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
        <ScrollView style={styles.scrollView}>
          <KeyboardAvoidingView
            style={globalCSS.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.formContent}>
              <View style={styles.Galerie}>
              {/*   <Gallery photosInfo={dogInfoTmp.dogPhotos} /> */}
              </View>

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
                <TextInput
                  placeholder="date de naissance"
                  onChangeText={(value) =>
                    handleFieldChange("birthdate", value)
                  }
                  value={dogInfo.birthdate}
                  style={globalCSS.input}
                />
                <TouchableOpacity onPress={showDatePicker}>
                  <MaterialIcons
                    name="calendar-month"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>

                <DatePickerModal
                  locale="en"
                  visible={isDatePickerVisible}
                  date={dogInfo.birthdate}
                  onConfirm={onConfirm}
                  onCancel={onCancel}
                  mode="single"
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
              <View>
                <MultipleSelectList
                  setSelected={(val) => setSelected(val)}
                  data={traitsData}
                  save="trait"
                  label="Traits de Caractère"
                  boxStyles={{
                    marginTop: 25,
                    backgroundColor: "#F2B872",
                    color: "#ffffff",
                    borderColor: "#F2B872",
                  }}
                  dropdownStyles={{ borderColor: "#F2B872" }}
                  checkBoxStyles={{ borderColor: "#F2B872" }}
                  badgeStyles={{
                    backgroundColor: "#F2B872",
                    color: "#ffffff",
                    borderColor: "#F2B872",
                  }}
                />
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => handleSave()}
                  style={globalCSS.button}
                  activeOpacity={0.8}
                >
                  <Text style={globalCSS.textButton}>Valider</Text>
                </TouchableOpacity>
              </View>
              <Text>
                Mon Humain :{useSelector((state) => state.user.value.username)}
              </Text>
              <Text>Modifié le :{dogInfo.dateModified}</Text>
              <Text>Crée le :{dogInfo.dateCreated}</Text>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
  },
  image: {
    width: "80%",
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
