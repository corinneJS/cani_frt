//
// Composant Galerie pour User et Dog
// CP le 27/02
//////////////////////////////////////////////
import React from "react";
import { View, FlatList, Image, Dimensions } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
//feuille de style global
const globalCSS = require("../styles/global.js");

// COMPOSANT
export default function Gallery({ photosInfo }) {
  if (!photosInfo) {
    // si pas photos alors Btn vers SnapCamera
    return (
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={() =>
            navigation.navigate("SnapCamera")
          }
        >
          <MaterialCommunityIcons
            name="camera"
            size={50}
            color="#F2B872"
          />
          <Text style={globalCSS.stitle}>Ajouter</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    // Séparation de la photo de profil des autres photos
    const profilPhoto = photosInfo.find((photo) => photo.isProfilPhoto);
    const otherPhotos = photosInfo.filter((photo) => !photo.isProfilPhoto);

    // Calcul de la taille de l'écran pour la photo de profil
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const profilPhotoSize = screenHeight * 0.25; // 1er quart de l'écran
    return (
      <View style={{ flex: 1 }}>
        {profilPhoto && (
          <Image
            source={{ uri: profilPhoto.uri }}
            style={{ width: screenWidth, height: profilPhotoSize }}
            resizeMode="cover"
          />
        )}
        <FlatList
          data={otherPhotos}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.uri }}
              style={{ width: 100, height: 100, margin: 5 }}
              resizeMode="cover"
            />
          )}
        />
      </View>
    );
  }
}
