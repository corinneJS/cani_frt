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
  Alert,
  BackHandler,
  Image,
} from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import {MultipleSelectList} from "react-native-dropdown-select-list";
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
// import gestion date
import moment from "moment";

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
    birthdate: new Date().toString(),
    isFemale: false,
    isSterilized: false,
    traitID: [],
    activityID: [],
    dateCreated: new Date().toString(),
    dogPhotos: [{}],
    dateModified: new Date().toString(),
    breedID: "",
  };
  const [dogInfo, setDogInfo] = useState("");
  const [traitsDogData, setTraitsDogData] = useState([]);
  // Preparation Listes de Valeurs
  const [traitsData, setTraitsData] = useState([]);
  const [selected, setSelected] = useState([]);
  // Gestion visibilité DatePicker
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  

  

  // ----------------------------------------------------------------------//
  // USE EFFECT
  // ----------------------------------------------------------------------//

  //---------------------------------------------------------------------------------------------------------------------------------------//
  // USE EFFECT pour initialiser le state dogInfo
  // avec les données du store Redux lors du montage du composant
  // si le dogID est renseigné on initialise
  useEffect(() => {
    (async () => {
    if (dogID) {
      setDogInfo(useSelector((state) => state.dog.value));
      setTraitsDogData(dogInfo.traitID);
      console.log("dogInfo du toutou : ", dogInfo);
      //setActivitiesDogData(dogInfo.activityID);
      //setPhotosDogData(dogInfo.photosDog);
    }else{
      setDogInfo(initialStateDogInfo);
    }
    })();
  }, [])
 
  let lovTraits = [];
  // Chargement de la Liste de Valeur traitsDog Fonction exécutée
  useEffect(() => {
    (async () => {
      // Recup liste de tous les traits de caractère en BDD
      const data = await AllTraits_webSrv();
      console.log("data en retour du fetch AllTraits", data);
      // MAJ de la liste des traits de caractère avec sélection des traits
      // du chien constenu dans traitsDogData

      lovTraits = data.traits.map((item) => {
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
  const handleSave = async () => {
    const data = await updateDog_webSrv(dogInfo.dogID);
    if (data.result) {
      dispatch(infoDog(data.dog));
    } else {
      Alert.alert("Oups !", `erreur dans update dog ${data.error}`);
    }
  };

   useEffect(() => {
    
    const unsubscribe = navigation.addListener(
      "beforeRemove",
      (e) => {
        // Vérifier si l'utilisateur quitte la page actuelle
        if (!e.data.action.payload || !e.data.action.payload.action) {
          // L'utilisateur quitte la page actuelle
          
          Alert.alert(
            "caniConnect",
            "Vous quittez la page, voulez-vous enregistrer vos modifications ?",
            [{ text: "annuler", style: "cancel" },
              { text: "enregistrer", onPress: () => handleSave() }],
            { cancelable: true, onDismiss: () => e.preventDefault() }); // Annuler la navigation par défaut
        }
      },[]);
    // Ajouter un écouteur d'événement pour le bouton matériel de retour
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        Alert.alert(
          "caniConnect",
          "Vous quittez la page, voulez-vous enregistrer vos modifications ?",
          [
            { text: "annuler", style: "cancel" },
            { text: "enregistrer", onPress: () => handleSave() },
          ],
          { cancelable: true, onDismiss: () => e.preventDefault() }
        ); // Annuler la navigation par défaut
      }
    );

    // 
    return () => {
      unsubscribe();
      backHandler.remove();
    };
  }, [navigation]); // Fin useEffect Detect sortie de page

  // -----------------------------------------------------------------------------------------------------------
  // FONCTIONS

  // A chaque modif d'un champ, mise à jour du state local (avec fieldname en param)
  const handleFieldChange = (name, value) => {
    setDogInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(`dogInfo MAJ du champ : ${name} avec : ${value}`);
  };

  // A chaque onBlur (sortie d'un champ), mise à jour du store infoDog avec le state local dogInfo
  const handleUpdateDogInfo = (name) => {
    dispatch(
      infoDog({
        ...dogInfo,
        [name]: dogInfo[name],
      })
    );
    console.log(`MAJ infoDog Redux`, useSelector((state)=> state.dog.value));
  };

  //---------------------------------------------------------------------------------------------------------------------------------------//
  // Gestion

  // Fonction pour ouvrir le modal du DatePicker
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
              <Image
                style={styles.image}
                source={require("../assets/olea_verte.jpg")}
              />

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
                  value={
                    dogInfo.birthdate
                      ? moment(dogInfo.birthdate).format("DD/MM/YYYY")
                      : ""
                  }
                  style={globalCSS.input}
                />
                {/*  <TouchableOpacity onPress={showDatePicker}>
              <MaterialIcons name="calendar-month" size={24} color="black" />
            </TouchableOpacity>

            <DatePickerModal
              locale="fr"
              visible={isDatePickerVisible}
              date={dogInfo.birthdate}
              onConfirm={onConfirm}
              onCancel={onCancel}
              mode="single"
            /> */}
              </View>
              <TextInput
                placeholder="Je suis un 4pattes ..."
                onChangeText={(value) =>
                  handleFieldChange("description", value)
                }
                value={dogInfo.description}
                style={globalCSS.input}
              />
              <View>
                <MultipleSelectList
                  setSelected={(val) => setSelected(val)}
                  data={traitsData}
                  save="trait"
                  label="Traits de Caractère"
                  boxStyles={{ marginTop: 25 }}
                />
              </View>
              <Text>
                Mon Humain :{useSelector((state) => state.user.value.username)}
              </Text>
              <Text>
                Modifié le :{moment(dogInfo.dateModified).format("DD/MM/YYYY")}
              </Text>
              <Text>
                Crée le :{moment(dogInfo.dateCreated).format("DD/MM/YYYY")}
              </Text>
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
