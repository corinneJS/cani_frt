// Ecran de connexion
// Auteur : Junior
// Objet : permettre l'authentification d'un user déjà identifié
// par la saisie d'un mot de passe ou via la connexion google.
// possibilité de choisir de s'inscrire
// Contributions :
// CP 08/02/24 : ajout styles, ajout lien vers inscription, ajout commentaires
// CP 15/02/24 : gestion fetch dans fichier /webservices
// Init redux store infoUser et InfoDog (si existe)
// --------------------------------------------------------------------------------
// import des composants
import {
  KeyboardAvoidingView,
  Platform,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import pour gestion des States et 
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { infoUser } from "../reducers/user";
import { infoDog } from "../reducers/dog";
//CP :  import feuille de style globale & init globalCSS 
const globalCSS = require("../styles/global.js");
import{findDogsByUserID_webSrv} from "../webservices/dogs_webSrv.js"
import { loginUser_webSrv } from "../webservices/Login_webSrv.js"


////
/////


export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [isConnect, setIsConnect] = useState(false);
  const reduxInfoUser = useSelector((state) => state.user.value);
  const reduxInfoDog = useSelector((state) => state.dog.value);


// fct btn connect via backend
  const handleConnect = async () => {
    const userData = {
          email: email,
          password: password
        };
    // vérif login en bdd
    const data = await loginUser_webSrv(userData);

      console.log("data USER in screen Login", data);
      if (data.result) {
            // MAJ Store infoUser
            dispatch(infoUser({
                email,
                username: data.user.username,
                isDogOwner: data.user.isDogOwner,
                isProfessional: data.user.isProfessional,
                city: data.user.city,
                token: data.user.token,
                userID:data.user.userID,
                isConnect: true,
            }));
            
           
            // Si proprietaire d'un 4pattes alors MAJ store redux Dog
            if (data.user.isDogOwner) {
              // recherche du 1er chien possédé et mise à jour infoDog
               
              const dogData = await findDogsByUserID_webSrv(data.user.userID); 
             
              if (dogData.result) {
                // MAJ Store infoDog
                dispatch(infoDog(dogData.dog));
                
                
              } else {
                Alert.alert("Oups !", `Vous êtes propriétaire mais je ne trouve pas votre 4pattes. Erreur : ${dogData.error}`);
              }
            }  
            // on vide les states locaux 
            setEmail("");
            setPassword("");
            navigation.navigate("TabNavigator");
        }else{
          Alert.alert("Oups !", data.error)
        };
      
  }; // Fin HandleConnect
  
  
  return (
    <LinearGradient // CP : ajout dégradé
      colors={["#F2B872", "#FFFFFF"]}
      style={globalCSS.backgrdContainer}
    >
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={globalCSS.container}>
            <Image
              style={styles.image}
              source={require("../assets/ccLogoColor.png")}
            />
            <Text style={globalCSS.title}>Heureux de vous retrouver !</Text>
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
            <Text style={globalCSS.stitle}>
              Première visite ? Rejoignez-nous !
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Welcome")}
              style={globalCSS.button}
              activeOpacity={0.8}
            >
              <Text style={globalCSS.textButton}>s'inscrire</Text>
            </TouchableOpacity>
          </View>
          <StatusBar barStyle={"default"} hidden={false} />
        </KeyboardAvoidingView>
      </SafeAreaView>
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

