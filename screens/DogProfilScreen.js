// DogProfilScreen : Profil d'un 4pattes avec galerie photo, visu caractéristiques races
// Auteur : CP
//
// --------------------------------------------------
// import des composants
import {KeyboardAvoidingView,Platform,View,StyleSheet,Text,TextInput,Switch,TouchableOpacity} from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
// import pour gestion states
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { infoDog } from "../reducers/dog";
// import pour fetch sur Lov traits
import {AllTraits_webSrv} from "../webservices/traits_webSrv.js";

// import gestion date
import moment from "moment";

// import dropdown
import {SelectList,MultipleSelectList} from "react-native-dropdown-select-list";

// import feuille de style globale
const globalCSS = require("../styles/global.js");


//---------------------------------------------------------------------------------------------------------------------------------------//
// COMPOSANT DogProfilScreen
//---------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------//
export default function DogProfilScreen({ navigation }) {
  const dispatch = useDispatch();

  //---------------------------------------------------------------------------------------------------------------------------------------//
  // MECANISMEs CRUD
  // Init state local dogInfo
  // 1. state local dogInfo
  const [dogInfo, setDogInfo] = useState({
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
  });
  console.log("dogInfo (init state local)", dogInfo);

  // 2. useSelector pour récupération des données du store Redux (initialisé lors du login)
  const dogData = useSelector((state) => state.dog.value);
  console.log("dogData (info redux)", dogData);

  // 3. useEffect pour initialiser le state dogInfo avec les données du store Redux lors du montage du composant
  // et à chaque MAJ de dogData
  useEffect(() => {
    if (dogData) {
      setDogInfo(dogData);
      console.log(
        "dogInfo state local MAJ avec dogData Redux)",
        dogInfo
      );
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
  //CP : à faire sur sortie de la page : fetch en bdd







  //---------------------------------------------------------------------------------------------------------------------------------------//
  // INIT MODULES UX
  //
  // Init LoV traits
  //
  // 1. useEffect pour chargement liste des traits de caractères avec ceux du chien
  //---------------------------------
  const [traitsDogData, setTraitsDogData] = useState(dogInfo.traitID);
  console.log("TRAITS : traitsDogData depuis le state", traitsDogData);
  const [traitsData, setTraitsData] = useState([]);
  const [selected, setSelected] = useState([]);
 /*  useEffect(() => { */
    // Chargement de la Liste de Valeur traitsDog
      (async () => {
      // Recup liste de tous les traits de caractère en BDD
      const data = await AllTraits_webSrv();
      console.log("data en retour du fetch AllTraits", data);
      //setTraitsData(data);
      // MAJ de la liste des traits de caractère avec sélection des traits
      // du chien constenu dans traitsDogData

      const lovTraits = data.traits.map((item) => {
        // Vérifie si l'item actuel correspond à un élément dans `traitsDogData`
        const haveTraits = traitsDogData.some((trait) => trait.id === item._id);
        if (haveTraits) {
          return { key: item._id, value: item.trait, isSelected: true };
        }
        // Sinon, retourne l'item sans sélection
        return { key: item._id, value: item.trait, isSelected: false };
      });
      console.log ("lovtraits", lovTraits)
      setTraitsData(lovTraits); // init lov Traits avec selected traits de dog
      console.log(
        "TraitsData avec les traits du chien sélectionnés",
        traitsData
      );
    })();
    
/*   }); */
  console.log("state traitsData enregistré ", traitsData);
 
  console.log("state traitsData enregistré ", traitsData);
  console.log("state traitsDogData enregistré ", traitsDogData);
  //---------------------------------------------------------------------------------------------------------------------------------------//
  // Gestion Picker Date
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
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
              visible={isDatePickerVisible}
              date={dogInfo.birthdate}
              onConfirm={onConfirm}
              onCancel={onCancel}
              mode="single"
            />
          </View>
          <TextInput
            placeholder="Je suis un 4pattes ..."
            onChangeText={(value) => handleFieldChange("description", value)}
            value={dogInfo.description}
            style={globalCSS.input}
          />
          <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
           <MultipleSelectList
              setSelected={(val) => setSelected(val)}
              data={traitsData}
              save="trait"
              label="Traits de Caractère"
              boxStyles={{ marginTop: 25 }}
            />
            <View style={{ marginTop: 50 }}>
              <Text>Traits de caractères : </Text>
              {/*   {traitsData.map((item) => {
                return (<Text key={item} style={{ marginTop: 10, color: "#F2B872" }}>{item}</Text>);
              })} */}
            </View>
          </View>

          <Text>Modifié le : {dogInfo.dateModified}</Text>
          <Text>Crée le : {dogInfo.dateCreated}</Text>
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
