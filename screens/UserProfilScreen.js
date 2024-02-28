// UserProfilScreen : Profil d'un Humain avec galerie photo, visu des chiens
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
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import Gallery from "../components/Gallery.js";
// import CityDropDown from "../components/CityDropDown.js";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

// import pour gestion states
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { infoDog } from "../reducers/dog";
import { infoUser } from "../reducers/user";
// import pour fetch sur Lov traits

import { updateUser_webSrv } from "../webservices/users_webSrv.js";
// import feuille de style globale
const globalCSS = require("../styles/global.js");

//---------------------------------------------------------------------------------------------------------------------------------------//
// COMPOSANT UserProfilScreen
//---------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------//
export default function UserProfilScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const userID = route.params.userID;
  console.log("userID route : ", userID);

  // Préparation des données du State Local userInfo
  const initialStateUserInfo = {
    userID: "",
    username: "",
    email: "",
    password: "",
    token: "",
    firstname: "",
    lastname: "",
    city: "",
    isDogOwner: true,
    isProfessional: false,
    isDeactivated: false,
    birthdate: new Date().toLocaleDateString("fr"),
    dateCreated: new Date().toLocaleDateString("fr"),
    dateModified: new Date().toLocaleDateString("fr"),
  };
  const [userInfo, setUserInfo] = useState("");
  const [userPhotosInfo, setUserPhotosInfo] = useState("");
  // Preparation Listes de Valeurs
  const [dogsData, setDogsData] = useState([]);
  const [selected, setSelected] = useState([]);
  // autocomplete city
  const [dataSet, setDataSet] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  // Gestion birthdate DatePicker
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  // ----------------------------------------------------------------------//
  // USE EFFECT
  // ----------------------------------------------------------------------//

  //---------------------------------------------------------------------------------------------------------------------------------------//
  // USE EFFECT pour initialiser le state userInfo
  // avec les données du store Redux lors du montage du composant
  // si le userID est renseigné on initialise
  const userInfoTmp = useSelector((state) => state.user.value);
  console.log("userInfoTmp (recup du reducer", userInfoTmp);
  useEffect(() => {
    (async () => {
      if (userID) {
        setUserInfo(userInfoTmp);
        setUserPhotosInfo(userInfoTmp.photos);
        console.log("userInfoTmp  : ", userInfoTmp);
      } else {
        setUserInfo(initialStateUserInfo);
      }
    })();
  }, []);

  // FONCTION pour gerer la SVG en bdd
  //
  const handleSave = async () => {
    console.log("userInfo en entrée du handle ", userInfo);
    const data = await updateUser_webSrv(userInfo);
    console.log("Reponse OK j'enregistre : ", userInfo);
    if (data.result) {
      Alert.alert("🐾 caniConnect", data.result);
    } else {
      Alert.alert("Oups !", `erreur dans update user ${data.error}`);
    }
  };

  // -----------------------------------------------------------------------------------------------------------
  // FONCTIONS

  // A chaque modif d'un TextInput, mise à jour du state local (avec fieldname en param)
  const handleFieldChange = (name, value) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(`userInfo MAJ du champ : ${name} avec : ${value}`);
  };

  // A chaque onBlur (sortie d'un TextInput), mise à jour du store infoUser avec le state local userInfo
  const handleUpdateUserInfo = (name) => {
    let value = { ...userInfo, [name]: userInfo[name] };
    dispatch(infoUser(value));
    console.log(`MAJ infoUser Redux`, value);
  };

  //---------------------------------------------------------------------------------------------------------------------------------------//
  // Gestion

  // Galerie :
  // photo de profil

  // Fonction pour gérer l'API cities
  const searchCity = async (query) => {
    // Prevent search with an empty query
    if (query === "") {
      return;
    }

    const response = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${query}`
    );
    const features = await response.json();

    console.log(features);
    const suggestions = features.map((data, i) => {
      return {
        id: i,
        title: data.properties.name,
        context: data.properties.context,
      };
    });
    setDataSet(suggestions);
  };

  // Fonction pour gérer le datePicker

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  // Fonction pour gérer la confirmation de la date
  const onConfirm = (date) => {
    setUserInfo((prevState) => ({
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
  const toggleSwitchIsDogOwner = (params) => {
    setUserInfo((prevState) => ({
      ...prevState,
      isDogOwner: params,
    }));
    let value = { ...userInfo, isDogOwner: params };
    dispatch(infoUser(value));
    console.log(`MAJ infoUser Redux`, value);
  };

  const toggleSwitchIsProfessional = (params) => {
    setUserInfo((prevState) => ({
      ...prevState,
      isProfessional: params,
    }));
    let value = { ...userInfo, isProfessional: params };
    dispatch(infoUser(value));
    console.log(`MAJ infoUser Redux`, value);
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
              {/* <Gallery photosInfo={userInfo.photos} />  */}
              <Text style={globalCSS.stitle}>Ici la galerie photo</Text>
            </View>
            <View style={styles.formContent}>
              <TextInput
                placeholder="Username"
                onChangeText={(value) => handleFieldChange("username", value)}
                value={userInfo.username}
                onBlur={() => handleUpdateUserInfo("username")}
                style={globalCSS.input}
              />

              <View style={styles.listSwitchContainer}>
                <View style={styles.switchContainer}>
                  <Switch
                    trackColor={{ false: "#B39C81", true: "#F2B872" }}
                    thumbColor={userInfo.isDogOwner ? "#F2B872" : "#B39C81"}
                    value={userInfo.isFemale}
                    onValueChange={(value) => toggleSwitchIsDogOwner(value)}
                  />
                  <Text>
                    {userInfo.isDogOwner
                      ? "Humain d'un 4 pattes"
                      : "Sans 4pattes"}
                  </Text>
                </View>

                <View style={styles.switchContainer}>
                  <Switch
                    trackColor={{ false: "#B39C81", true: "#F2B872" }}
                    thumbColor={userInfo.isProfessional ? "#F2B872" : "#B39C81"}
                    onValueChange={(value) => toggleSwitchIsProfessional(value)}
                    value={userInfo.isProfessional}
                  />
                  <Text>Services à proposer ?</Text>
                </View>
              </View>

              <View style={styles.dateContainer}>
                <TextInput
                  placeholder="date de naissance"
                  onChangeText={(value) =>
                    handleFieldChange("birthdate", value)
                  }
                  value={userInfo.birthdate}
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
                  date={userInfo.birthdate}
                  onConfirm={onConfirm}
                  onCancel={onCancel}
                  mode="single"
                />
              </View>

              <TextInput
                placeholder="prenom"
                onChangeText={(value) => handleFieldChange("firstname", value)}
                onBlur={() => handleUpdateUserInfo("firstname")}
                value={userInfo.firstname}
                style={globalCSS.input}
              />
              <TextInput
                placeholder="nom"
                onChangeText={(value) => handleFieldChange("lastname", value)}
                onBlur={() => handleUpdateUserInfo("lastname")}
                value={userInfo.lastname}
                style={globalCSS.input}
              />

              <TextInput
                placeholder="email"
                onChangeText={(value) => handleFieldChange("email", value)}
                onBlur={() => handleUpdateUserInfo("email")}
                value={userInfo.email}
                style={globalCSS.input}
              />
              <TextInput
                placeholder="Ville"
                onChangeText={(value) => handleFieldChange("city", value)}
                onBlur={() => handleUpdateUserInfo("city")}
                value={userInfo.city}
                style={globalCSS.input}
              />
              <View>
                <AutocompleteDropdown
                  onChangeText={(value) => searchCity(value)}
                  onSelectItem={(item) => handleFieldChange("city", item)}
                  onBlur={() => handleUpdateUserInfo("city")}
                  dataSet={dataSet}
                  textInputProps={{ placeholder: "Rechercher votre ville" }}
                  inputContainerStyle={styles.inputContainer}
                  containerStyle={styles.dropdownContainer}
                  suggestionsListContainerStyle={styles.suggestionListContainer}
                  closeOnSubmit
                />
              </View>

              <TouchableOpacity
                onPress={() => handleSave()}
                style={globalCSS.button}
                activeOpacity={0.8}
              >
                <Text style={globalCSS.textButton}>Valider</Text>
              </TouchableOpacity>

              <Text>Modifié le :{userInfo.dateModified}</Text>
              <Text>Crée le :{userInfo.dateCreated}</Text>
            </View>
          </View>
          <StatusBar barStyle={"default"} hidden={false} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gallery: {
    flex: 0.4,
    width: "90%",
  },
  formContent: {
    marginTop: "15%",
    flex: 0.3,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  listSwitchContainer: {
    width: "90%",
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
  dropdownContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#51e181",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 50,
    color: "#51e181",
    fontWeight: "bold",
    alignSelf: "flex-start",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif" }),
    marginBottom: 15,
  },
  suggestionListContainer: {
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  resultContainer: {
    backgroundColor: "#ffffff",
    width: "100%",
    borderRadius: 6,
    padding: 20,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#51e181",
    borderWidth: 1,
  },
  resultText: {
    textAlign: "right",
  },
  resultTitle: {
    fontWeight: "bold",
  },
});
