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
// import pour gestion states
import { useState } from "react";
import { useDispatch } from "react-redux";
//CP : import pour la gestion des échanges avec le backend
import { dogs_webSrv } from "../webservices/dogs_webSrv.js";

//CP :  import feuille de style globale
const globalCSS = require("../styles/global.js");

export default function DogProfilScreen({ navigation }) {
  const dispatch = useDispatch();
  const [dogName, setDogName] = useState("");
  const [birthdate, setBirthdate] = useState(""); // CP A faire DatePicker
  const [gender, setGender] = useState(""); // CP A faire proposer Mâle / Femelle
  const [isSterilized, setIsSterilized] = useState(False);
  const toggleSwitchIsSterilized = () =>
    setIsSterilized((previewsState) => !previewsState);
  const [trait, setTrait] = useState(""); // CP : A faire : proposer liste déroulante choix multiple
  const [activity, setActivity] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [dateModified, setDateModified] = useState("");

  const [userID, setUserID] = useState(""); // CP : A faire : init avec user connecté
  const [breedID, setBreedID] = useState("");

  const [openModal, setOpenModal] = React.useState(false);
  // fct btn Save via backend
  const handleSave = async () => {
    const dogData = {
      dogName: dogName,
      description: description,
      birthdate: birthdate,
      gender: gender,
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
            gender,
            isSterilized,
          })
        );
        Alert.alert('Profil', `le profil de ${dogName} est enregistré !`)  
        
      } else {
        Alert.alert("Oups !", `un pb est survenu : ${data.error}`);
      }
    });
  };

  const onDismissSingle =
    (() => {
      setOpenModal(false);
    },
    [setOpenModal]);

  const onConfirmSingle =
    ((params) => {
      setOpenModal(false);
      setBirthdate(params.birthdate);
    },
    [setOpen, setDate]);

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
            label="Choisissez votre :"
            onChangeText={(value) => setName(value)}
            value={name}
            style={globalCSS.input}
          />
          <View
            style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
          >
            <Button
              onPress={() => setOpen(true)}
              uppercase={false}
              mode="outlined"
            >
              Choisir une date
            </Button>
            <DatePickerModal
              locale="fr"
              mode="single"
              visible={open}
              onDismiss={onDismissSingle}
              date={date}
              onConfirm={onConfirmSingle}
            />
          </View>
          <TextInput
            placeholder="votre ville"
            onChangeText={(value) => setCity(value)}
            value={city}
            style={globalCSS.input}
          />
          <View style={styles.listSwitchContainer}>
            <View style={styles.switchContainer}>
              <Switch
                trackColor={{ false: "#B39C81", true: "#F2B872" }}
                thumbColor={isDogOwner ? "#F2B872" : "#B39C81"}
                onValueChange={toggleSwitchDogOwner}
                value={isDogOwner}
              />
              <Text>Je suis propriétaire d'un ou plusieurs 4 pattes.</Text>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                trackColor={{ false: "#B39C81", true: "#F2B872" }}
                thumbColor={isProfessional ? "#F2B872" : "B39C81"}
                onValueChange={toggleSwitchProfessional}
                value={isProfessional}
              />
              <Text>Je suis un professionel</Text>
            </View>
          </View>
          <TextInput
            placeholder="Email"
            autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
            keyboardType="email-address" // https://reactnative.dev/docs/textinput#keyboardtype
            textContentType="emailAddress" // https://reactnative.dev/docs/textinput#textcontenttype-ios
            autoComplete="email" // https://reactnative.dev/docs/textinput#autocomplete-android
            onChangeText={(value) => setEmail(value)}
            value={email}
            style={globalCSS.input}
          />

          <TextInput
            placeholder="Password"
            onChangeText={(value) => setPassword(value)}
            value={password}
            secureTextEntry={true}
            style={globalCSS.input}
          />

          <TouchableOpacity
            onPress={() => handleSave()}
            style={globalCSS.button}
            activeOpacity={0.8}
          >
            <Text style={globalCSS.textButton}>Enregistrer</Text>
          </TouchableOpacity>
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
    justifyContent: "flex-start",
    alignItems: "center",
  },

  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
