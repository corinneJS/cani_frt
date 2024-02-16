// Barre d'Icônes à utiliser pour l'édition d'un profil (user ou dog)
// Auteur CP
/////////////////////////////////

import React from "react";
import { View, Alert } from "react-native";

import { FloatingBubble } from "antd-mobile";

import { AntDesign} from "@expo/vector-icons";

const EditIconBar = ({navigation, reducerName}) => {
      
    const validChange = (name, value) => {
        Alert.alert("Info A faire", "Enregistrement du state local dans le redux puis svg en BDD" )
    };
    
    
    const undoChange = (name, value) => {
        Alert.alert(
          "Info A faire",
          "Annule les changements : on refait un fetch depuis le redux"
        );
    };
    
    
    const addNew = (name, value) => {
        Alert.alert(
          "Info A faire",
          "On lance le initialState"
        );
    };
  
  
  return (
    <View>
      <FloatingBubble
        style={{
          "--initial-position-bottom": "24px",
          "--initial-position-right": "24px",
          "--edge-distance": "24px",
        }}
        onClick={undoChange}
      >
        <AntDesign name={"closecircle"} size={24} color={"red"} />
        
      </FloatingBubble>
    {/*   <FloatingBubble
        style={{
          "--initial-position-bottom": "24px",
          "--initial-position-right": "72px",
          "--edge-distance": "24px",
        }}
        onClick={addNew}
      >
        <AntDesign name="pluscircle" size={24} color="black" />
      </FloatingBubble>
      <FloatingBubble
        style={{
          "--initial-position-bottom": "24px",
          "--initial-position-right": "120px",
          "--edge-distance": "24px",
        }}
        onClick={validChange}
      >
        <AntDesign name="checkcircle" size={24} color="green" />
      </FloatingBubble> */}
    </View>
  );
};

export default EditIconBar;
