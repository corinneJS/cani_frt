import { useState } from "react";
import {Image,StyleSheet,View,FlatList,Text,TouchableOpacity} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//feuille de style global
const globalCSS = require("../styles/global.js");

import { useDispatch, useSelector } from "react-redux";

export default function GalerieScreen({ navigation }) {
  const dispatch = useDispatch();
  const dogPhotosInfo = useSelector((state) => state.dog.value.dogPhotos);
  const photos = dogInfo.dogPhotos.map((item) => {
    console.log("constitution galerie", item);
    return (
      <View key={item._id} style={styles.photoContainer}>
        <Image source={{ uri: data.uri }} />
        <Text>{data.dogPhotoName}</Text>
        <TouchableOpacity onPress={() => dispatch(removePhoto(data._id))}>
          <MaterialCommunityIcons name="trash-can-outline" size={20} color="#F2B872"/>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <LinearGradient
      colors={["#F2B872", "#FFFFFF"]}
      style={globalCSS.backgrdContainer}
    >
      <Text>Welcome to Galerie !</Text>
      <View Style={styles.cameraContainer}>
        <ScrollView contentContainerStyle={styles.galleryContainer}>
          {photos}

          <View style={styles.photoContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("SnapScreen")}>
              <MaterialCommunityIcons
                name="camera-plus-outline"
                size={30}
                color="#F2B872"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <StatusBar style="auto" />
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
  cameraContainer: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    flex: "0.5",
  },
});
