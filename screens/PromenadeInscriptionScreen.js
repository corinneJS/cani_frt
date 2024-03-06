// Auteur : KB
// Date : Mercredi 21 Février
// Ecran pour s'inscrire à une promenade
import { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient"; 
import { useDispatch, useSelector } from 'react-redux';
import { addWalk, removeWalk, importWalks, addItinerary } from '../reducers/walk';
import { infoUser } from '../reducers/user';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import DogRegisteredCard  from '../components/dogRegisteredCard';

//feuille de style global
const globalCSS = require("../styles/global.js");


export default function PromenadeInscriptionScreen ({ navigation, route }) {
  const { mapData, eventID} = route.params;
  const user = useSelector((state) => state.user.value);
  const dog = useSelector((state) => state.dog.value);
  const [scrollerData, setScrollerData] = useState([]);
  const [dogOwner, setDogOwner] = useState([]);
  const [dogInfoWithUser, setDogInfoWithUser] = useState([]);

  let dogsIDs = mapData[0].dogIDs.map ((dog) => {
    return  dog._id
  })
  //console.log ("dogsIDs", dogsIDs)

  //let username = mapData[0].dogIDs[0].userID.username;
  //console.log("username", username);
   

  // Mise en forme des données pour le scroller (Flatlist)
  let scrollerInfoPart1 = mapData[0].dogIDs.map ((dog, i) => {
    let dogInfo = {
      key: i,
      dogName: dog.dogName,
      isFemale: dog.isFemale,
      dogBirthdate: dog.birthdate,
      breedName: dog.breedID?.breedNameEN ? dog.breedID.breedNameEN : null, // le ? permet d'eviter que l'appli ne plante si dog.breedID est "undefined"
      username: dog.userID.username,
    }
    return dogInfo;
  })

  // console.log("mapData dans promenadeInscriptionScreen", mapData);
  //console.log("mapData[0].dogIDs", mapData[0].dogIDs);
  //console.log ("scrollerInfoPart1", scrollerInfoPart1)
  //console.log("dogInfoWithUser", dogInfoWithUser); 
  //console.log("scrollerData", scrollerData);
  

  // Gestion de l'inscription
  let eventIDSent = eventID ? eventID : "";
  let tokenSent = user.token ? user.token : "";
  let dogIDSent = dog.dogID ? dog.dogID : "";

  const handleRegister = () => {
    // Send new walk to backend to register it in database
    fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/walks/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        eventID: eventIDSent, // eventID vient de route.params
        token: tokenSent, // user.token vient du store redux
        dogID: dogIDSent, // dog.dogID vient du store redux
      }),
    }).then((response) => response.json())
      .then((data) => {
        //console.log("here data", data);
        if (data.result) {
          Alert.alert("Inscription effectuée")
        } else {
          Alert.alert("Inscription non effectuée : un problème est survenu")
        }
      });
  };
 
  // Gestion de la map
  mapData.length > 1 && console.log("mapData continent plus d'un élément : ceci est anormal");
  !mapData.length && console.log("mapData n'est pas truthy : ceci est anormal");

  if (mapData.length !== 1) return
  let markers = mapData[0].walkID.itinerary.map ((marker, j) => {
    return <Marker 
              key={j} 
              coordinate={{ latitude: marker.lat, longitude: marker.lon }} 
              pinColor="orange"           
            />;
  });

  let initialCoords = mapData.length ? mapData[mapData.length-1]?.walkID.itinerary[0] : {lat: -16.5, lon: -151.74}
  
  return (
    <View style={styles.container}>
      <View style={styles.walkEventInfo}>
        <View style={styles.walkEventLine}>
          <Text style={styles.textPropriety}> Nom : </Text>
          <Text style={styles.textValue}>{mapData[0].eventName}</Text>
        </View>
        <View style={styles.walkEventLine}>
          <Text style={styles.textPropriety}> Date - Heure : </Text>
          <Text style={styles.textValue}>{mapData[0].eventDate} - {mapData[0].eventTime} </Text>
        </View>
        <View style={styles.twoProprietyOnOneLine}>      
          <View style={styles.walkEventLine}>
            <Text style={styles.textPropriety}> Ville: </Text>
            <Text style={styles.textValue}>{mapData[0].eventCity} </Text>
          </View>
          <View style={styles.walkEventLine}>
            <Text style={styles.textPropriety}> Environment: </Text>
            <Text style={styles.textValue}> {mapData[0].walkID.environment} </Text>
          </View>
        </View> 
        <View style={styles.walkEventLine}>
          <Text style={styles.textPropriety}> rythme: </Text>
          <Text style={styles.textValue}>{mapData[0].walkID.rythme} </Text>
        </View>
        <View style={styles.twoProprietyOnOneLine}>      
          <View style={styles.walkEventLine}>
            <Text style={styles.textPropriety}> Distance: </Text>
            <Text style={styles.textValue}>{mapData[0].walkID.distance} km </Text>
          </View>
          <View style={styles.walkEventLine}>
            <Text style={styles.textPropriety}> Durée: </Text>
            <Text style={styles.textValue}> {mapData[0].walkID.duration} min </Text>
          </View>
        </View> 
        <View style={styles.walkEventLine}>
          <Text style={styles.textPropriety}> description: </Text>
          <Text style={styles.textValue}>{mapData[0].walkID.description}</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => handleRegister()}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={globalCSS.textButton}>Je m'inscris</Text>
          </TouchableOpacity>
      </View>
      <MapView mapType="standard" style={styles.map} 
          region={{
              latitude: initialCoords.lat,
              longitude: initialCoords.lon,
              latitudeDelta: 0.02,
              longitudeDelta: 0.0421,
            }}
        >
          { markers }
      </MapView>
      <View style={styles.participantsText}>
        <Text> Participants </Text>
        </View>
        <FlatList
              data={scrollerInfoPart1}
              renderItem={({item}) => 
                <DogRegisteredCard 
                  dogName={item.dogName} 
                  breedName={item.breedName} 
                  isFemale={item.isFemale}
                  username={item.username} 
                />
              }
              keyExtractor={item => item.key}
            />
      <StatusBar style="auto" />
    </View>
    );
  }
  
  const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#f4d8b7',
        alignItems: 'center',
        //justifyContent: 'center',
      },
      walkEventInfo: {
        marginTop: "15%",
        justifyContent: "space-between",
        alignItems: "center",
      },
      map: {
        width: '100%',
        height: '30%',
        marginTop: '-15%',
      },
      buttonsContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
      },
      button: {
        alignItems: "center",
        paddingTop: 8,
        width: "30%",
        marginTop: 30,
        marginLeft: 20,
        backgroundColor: "#f2B872",
        borderRadius: 10,
        marginBottom: 80,
      },
      walkEventLine: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
      },
      textValue: {
        color: "blue",
        fontWeight: "bold",
      },
      twoProprietyOnOneLine: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
      }
    });
    