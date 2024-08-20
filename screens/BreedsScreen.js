import React, { useState, useEffect } from "react";
import {
  
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
  Image

} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

//feuille de style global
const globalCSS = require("../styles/global.js");
import { AllBreeds_webSrv } from "../webservices/breeds_webSrv.js";

export default function BreedsScreen({ navigation }) {
  // préparation de la liste des Breeds
  const [breeds, setBreeds] = useState([]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("BreedDetail", { breed: item })}
    >
      <Image source={{ uri: item.image_link }} style={styles.image} />
      
      <Text style={styles.text}>{item.breedNameFR}</Text>
    </TouchableOpacity>
  );
  useEffect(() => {
    (async () => {
      const data = await AllBreeds_webSrv();

      if (data.result) {
        setBreeds(data.breeds);
      } else {
        Alert.alert("Oups !", "Pas de race trouvée");
      }
    })();
  }, []);

  return (
    <LinearGradient
      colors={["#F2B872", "#FFFFFF"]}
      style={globalCSS.backgrdContainer}
    >
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.container}>
            <FlatList
              data={breeds}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
            />
          </View>

          

          <StatusBar barStyle={"default"} hidden={false} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }, 
  item: { flexDirection: "row", margin :10,  alignItems: "center" },
  image: { width: 50, height: 50, marginRight: 10 },
  text: { fontSize: 18 },
});
