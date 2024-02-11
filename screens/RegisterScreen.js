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
import {registerUser_ws} from "../webservices/RegisterWebServices.js"; 

//CP :  import feuille de style globale
const globalCSS = require("../styles/global.js");




export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
   const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const[isDogOwner, setIsDogOwner] = useState(true);
  const toggleSwitchDogOwner = ()=> setIsDogOwner(previewsState => !previewsState);
  const [isProfessional, setIsProfessional] = useState(false);
  const toggleSwitchProfessional = () => setIsProfessional((previewsState) => !previewsState);
  

// fct btn connect via backend
  const handleRegister = async () => { // KB :voir si async est nécessaire risque pb aleatoire
    const userData = {
      username: username,
      email: email,
      password: password,
      isDogOwner: isDogOwner,
      isProfessional: isProfessional,
      city:city,
    };
    await registerUser_ws({userData}).then((data) => {
      Alert.alert("le data reçu dans le Screen", data);
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
            placeholder="nom d'utilisateur"
            label="Choisissez votre :"
            onChangeText={(value) => setUsername(value)}
            value={username}
            style={globalCSS.input}
          />

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
            onPress={() => handleRegister()}
            style={globalCSS.button}
            activeOpacity={0.8}
          >
            <Text style={globalCSS.textButton}>je valide</Text>
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

