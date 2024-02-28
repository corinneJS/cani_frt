// WelcomeScreen.js
// Auteur : CP
// Contributeurs :
// Objet : Ecran de présentation de l'application
// apparait lorsque l'on souhaite s'inscrire, il suffit de  
// cliquer sur l'écran pour voir le formulaire d'inscription
// 
// 
// --------------------------------------------------
import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  View
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // yarn add expo-linear-gradient

//feuille de style global
const globalCSS = require("../styles/global.js");

export default function WelcomeScreen({navigation}) {
  return (
    <LinearGradient
      colors={["#F2B872", "#FFFFFF"]}
      style={globalCSS.backgrdContainer}
    >
      <SafeAreaView>
        <View style={globalCSS.container}>
          <Image source={require("../assets/ccLogoColor.png")}></Image>
          <Text style={globalCSS.title}>On va se promener ?</Text>
          <Text style={globalCSS.stitle}>
            Localisez et rejoignez les 4pattes préférés de votre loulou de
            sortie dans votre quartier
          </Text>
          <Text style={globalCSS.stitle}>
            Enregistrez votre promenade et partagez votre expérience avec la
            communauté
          </Text>
          <Text style={globalCSS.stitle}>
            Invitez vos amis à vous accompagner
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={globalCSS.button}
            activeOpacity={0.8}
          >
            <Text style={globalCSS.textButton}>Bienvenue</Text>
          </TouchableOpacity>
        </View>
        <StatusBar barStyle={"default"} hidden={false} />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  backgrdImage: {
    flex: 1,
    resizeMode: "cover",
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
}); 
