import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  View,
  StatusBar,
  Text,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Image

} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
//feuille de style global
const globalCSS = require("../styles/global.js");
import { OneBreedById_webSrv } from "../webservices/breeds_webSrv.js";

export default function BreedDetailScreen({route}) {
  // préparation de la liste des Breeds
  console.log(route.params);
  const [breed, setBreed] = useState([]);

  const  idBreed  = route.params.breed._id;
  useEffect(() => {
    (async () => {
      const data = await OneBreedById_webSrv(idBreed);

      if (data.result) {
        setBreed(data.breeds);
        console.log("breed", breed)
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
          <View>
            <Image source={{ uri: breed.image_link }} style={styles.image} />
            <Text style={styles.text}>{breed.breedNameFR}</Text>
            <Text style={styles.text}>
              Amical avec les enfants : {breed.good_with_children}
            </Text>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={5}
              value={breed.good_with_children}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
            />
            <Text style={styles.text}>
              Amical aves les autres 4pattes : {breed.good_with_other_dogs}
            </Text>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={5}
              value={breed.good_with_other_dogs}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
            />
            <Text style={styles.text}>
              Amical avec les étrangers : {breed.good_with_strangers}
            </Text>
            <Text style={styles.text}>Perte de poils : {breed.shedding}</Text>
            <Text style={styles.text}>
              Longueur du Poil :{breed.coat_length}
            </Text>
            <Text style={styles.text}>Dressage :{breed.trainability}</Text>
            <Text style={styles.text}>Aboiement : {breed.barking}</Text>
            <Text style={styles.text}>
              Espérance de vie min : {breed.min_life_expectancy}
            </Text>
            <Text style={styles.text}>
              Espérance de vie max : {breed.max_life_expectancy}
            </Text>
            <Text style={styles.text}>
              Taille max Mâle : {breed.max_height_male}
            </Text>
            <Text style={styles.text}>
              Taille Max Femelle :{breed.max_height_female}
            </Text>
            <Text style={styles.text}>
              Poids max Mâle : {breed.max_weight_male}
            </Text>
            <Text style={styles.text}>
              Poids max femelle :{breed.max_weight_female}
            </Text>
            <Text style={styles.text}>
              Taille mini Mâle : {breed.min_height_male}
            </Text>
            <Text style={styles.text}>
              Taille mini Femelle : {breed.min_height_female}
            </Text>
            <Text style={styles.text}>
              Poids mini Femelle : {breed.min_weight_female}
            </Text>
            <Text style={styles.text}>Toilettage : {breed.grooming}</Text>
            <Text style={styles.text}>Bavage :{breed.drooling}</Text>
            <Text style={styles.text}>Joueur :{breed.playfulness}</Text>
            <Text style={styles.text}>Protecteur :{breed.protectiveness}</Text>
            <Text style={styles.text}>Energie : {breed.energy}</Text>
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
    backgroundColor: "#f2B872",
    alignItems: "center",
    justifyContent: "center",
  },
  item: { flexDirection: "row", padding: 20, alignItems: "center" },
  image: { width: 50, height: 50, marginRight: 10 },
  text: { fontSize: 18 },
});
