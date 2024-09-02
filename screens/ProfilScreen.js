import {
  KeyboardAvoidingView,
  Platform,
  Image,
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//feuille de style global
const globalCSS = require("../styles/global.js");

import { useSelector } from "react-redux";



export default function ProfilScreen({ navigation }) {
  // Import des profils
  const reduxInfoUser = useSelector((state) => state.user.value);
  const reduxInfoDog = useSelector((state) => state.dog.value);
  console.log("reduxInfoUser", reduxInfoUser);
  console.log("reduxInfoUser", reduxInfoUser);

  return (
    <LinearGradient
      colors={["#F2B872", "#FFFFFF"]}
      style={globalCSS.backgrdContainer}
    >
      <SafeAreaView>
        <KeyboardAvoidingView
          style={globalCSS.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View>
            <Text style={globalCSS.title}>Choisissez un profil</Text>
            <View style={globalCSS.iconsContainer}>
              <TouchableOpacity
                style={globalCSS.profilContainer}
                onPress={() =>
                  navigation.navigate("DogProfil", {
                    dogID: reduxInfoDog.dogID,
                    userID: reduxInfoUser.userID,
                  })
                }
              >
                <Image
                  source={{ uri: reduxInfoDog.photoUrl }}
                  style={globalCSS.dogImage}
                />
                <Text style={globalCSS.stitle}>{reduxInfoDog.dogName}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={globalCSS.profilContainer}
                onPress={() =>
                  navigation.navigate("UserProfil", {
                    userID: reduxInfoUser.userID,
                  })
                }
              >
                <MaterialCommunityIcons
                  name="account-cog-outline"
                  size={80}
                  color="#F2B872"
                />
                <Text style={globalCSS.stitle}>{reduxInfoUser.username}</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("DogProfil", { dogID: null })
                }
                style={globalCSS.button}
                activeOpacity={0.8}
              >
                <Text style={globalCSS.textButton}>Nouveau 4pattes</Text>
              </TouchableOpacity>
            </View>
          </View>
          <StatusBar barStyle={"default"} hidden={false} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

