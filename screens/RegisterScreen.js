// RegisterScreen : inscription des utilisateurs
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
import { LinearGradient } from "expo-linear-gradient";
// import pour gestion states
import { useState } from "react";
import { useDispatch } from "react-redux";
//CP : import pour la gestion des échanges avec le backend
import {addUser_ws} from "../webservices/RegisterWebServices.js"; 

//CP :  import feuille de style globale
const globalCSS = require("../styles/global.js");
// Import Fct FETCH



export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const[isOwnerDog, setIsOwnerDog] = useState(true);
  const toggleSwitchOwnerDog = ()=> setIsOwnerDog(previewsState => !previewsState);
  const [isProfessional, setIsProfessional] = useState(false);
  const toggleSwitchProfessional = () => setIsProfessional((previewsState) => !previewsState);
  const [description, setDescription] = useState("");

// fct btn connect via backend
  const handleRegister = async () => {
  
  await  addUser_ws(
        {firstname,
        lastname,
        email,
        isOwnerDog,
        isProfessional,
        password,
        city,
        description}
      )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(infoUser({ firstname,email, isOwnerDog, isProfessional, city, token: data.token }));
          setFirstname("");
          setLastname("");
          setEmail("");
          setIsOwnerDog(true);
          setIsProfessional(false);
          setPassword("");
          setCity("");
          setDescription("");
          navigation.navigate("Home");
        } else {
          Alert.alert("Oups !", `un pb est survenu : ${data.error}`);
          // a supprimer quand le data.result sera traité
          navigation.navigate("Home");
        }})
        
  };

 
 
  return (
    <LinearGradient
      colors={["#F2B872", "#FFFFFF"]}
      style={globalCSS.backgrdContainer}
    >
      <KeyboardAvoidingView
        style={globalCSS.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Image
          style={styles.image}
          source={require("../assets/ccLogoColor.png")}
        />
        <Text style={globalCSS.stitle}>Bienvenue !</Text>
        <View style={styles.formContent}>
          <TextInput
            placeholder="prénom"
            onChangeText={(value) => setFirstname(value)}
            value={firstname}
            style={globalCSS.input}
          />
          <TextInput
            placeholder="nom"
            onChangeText={(value) => setLastname(value)}
            value={lastname}
            style={globalCSS.input}
          />
          <TextInput
            placeholder="city"
            onChangeText={(value) => setCity(value)}
            value={city}
            style={globalCSS.input}
          />
          <View style={styles.switchContainer}>
            <Switch
              trackColor={{ false: "#B39C81", true: "#F2B872" }}
              thumbColor={isOwnerDog ? "#F2B872" : "#B39C81"}
              onValueChange={toggleSwitchOwnerDog}
              value={isOwnerDog}
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
          <TextInput
            placeholder="description"
            onChangeText={(value) => setDescription(value)}
            value={description}
            style={globalCSS.input}
          />
          <TouchableOpacity
            onPress={() => handleRegister()}
            style={globalCSS.button}
            activeOpacity={0.8}
          >
            <Text style={globalCSS.textButton}>enregistrer</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

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
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

