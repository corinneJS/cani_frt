// Ecran de connexion
// Auteur : Junior
// Objet : permettre l'authentification d'un user déjà identifié
// par la saisie d'un mot de passe ou via la connexion google.
// possibilité de choisir de s'inscrire
// Contributions :
// CP 08/02/24 : ajout styles, ajout lien vers inscription, ajout commentaires ;-)
// --------------------------------------------------------------------------------
// import des composants
import {
  KeyboardAvoidingView,
  Platform,
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import pour gestion des States et 
import { useState } from "react";
import { useDispatch } from "react-redux";
//CP :  import feuille de style globale & init globalCSS 
const globalCSS = require("../styles/global.js");

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [isConnected, setIsConnected] = useState("");

/* // fct pour btn connect avec ggle  CP : A FAIRE A LA FIN
  const handleGoogle = () => {
        Alert.alert('Oups !',`L'authentification Google n'est pas encore développée`)
  }; */


// fct btn connect via backend
  const handleConnect = () => {
    /* 'https://backend-one-nu-35.vercel.app/' */
    fetch(`${BASE_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }), 
    })
      .then((response) => response.json())
      .then((data) => {
        // CP : ajout isConnect? et gestion Msg Erreur
        if (data.result) {
          dispatch(login({ email, token: data.token, isConnect: true }));
          setEmail("");
          setPassword("");
          navigation.navigate("TabNavigator");
        } else {
          Alert.alert("Oups !", data.error);
          setPassword("");
        }
      });
  };
 
  
  return (
    <LinearGradient // CP : ajout dégradé
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
        <Text style={globalCSS.title}>Heureux de vous retrouver !</Text>
        <View style={styles.formContent}>
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
            onPress={() => handleConnect()}
            style={globalCSS.button}
            activeOpacity={0.8}
          >
            <Text style={globalCSS.textButton}>connexion</Text>
          </TouchableOpacity>
          <Text style={globalCSS.stitle}>Première visite ? Rejoignez-nous !</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={globalCSS.button}
            activeOpacity={0.8}
          >
            <Text style={globalCSS.textButton}>s'inscrire</Text>
          </TouchableOpacity>
        </View>

        {/* <View>  // CP : pour plus tard
          <TouchableOpacity
            onPress={() => handleGoogle()}
            style={globalCSS.button}
            activeOpacity={0.8}
          >
            <Text style={globalCSS.textButton}>se connecter avec google</Text>
          </TouchableOpacity>
        </View> */}
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
  otherContent: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

