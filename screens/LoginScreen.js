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
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
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

/* // fct pour btn connect avec ggle  CP : A FAIRE A LA FIN
  const handleGoogle = () => {
        Alert.alert('Oups !',`L'authentification Google n'est pas encore développée`)
  }; */


  const handleRegister = () => {
    fetch('https://backend-lyart-mu.vercel.app/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: signUpUsername, email: signUpEmail, password: signUpPassword }),
    }).then(response => {
      console.log(response)
      return response.json()
      })
      .then(data => {
        console.log(data)
        if (data.result) {
          dispatch(login({ username: signUpUsername, token: data.token }));
          setSignUpUsername('');
          setSignUpEmail('')
          setSignUpPassword('');
         navigation.navigate('TabNavigator')
        }
      });
  };


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
              console.log(data.user.userID);          
              const dogData = await findDogsByUserID_webSrv(data.user.userID); 
              console.log("dogData dans le screen", dogData)
              if (dogData.result) {
                // MAJ Store infoDog
                dispatch(infoDog(dogData.dog));
              } else {
              Alert.alert("Oups !", `un pb est survenu : ${data.error}`);
              }
            }  
            // on vide les states locaux 
            setEmail("");
            setPassword("");
            console.log("infoUser enregistré dans le store ", reduxInfoUser);
            navigation.navigate("TabNavigator");
        };
      
  }; // Fin HandleConnect
  
  
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


      <TextInput placeholder="Username" onChangeText={(value) => setSignUpUsername(value)} value={signUpUsername} style={styles.input} />
      <TextInput placeholder="Email" onChangeText={(value) => setSignUpEmail(value)} value={signUpEmail} style={styles.input} />
      <TextInput placeholder="Password" onChangeText={(value) => setSignUpPassword(value)} value={signUpPassword} style={styles.input} />
      <TouchableOpacity onPress={() => handleRegister()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>s'inscrire</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )

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

