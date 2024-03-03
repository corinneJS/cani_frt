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
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient"; 
import { useDispatch, useSelector } from 'react-redux';
import { addWalk, removeWalk, importWalks, addItinerary } from '../reducers/walk';
import { infoUser } from '../reducers/user';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

//feuille de style global
const globalCSS = require("../styles/global.js");


export default function PromenadeInscriptionScreen ({ navigation, route }) {
  const { mapData, eventID} = route.params;
  //const mapData = route.params.mapData;
  //const eventID = route.params.eventID;
  const [scrollerData, setScrollerData] = useState([]);

  // Gestion des dogs et humains inscrits
/*   useEffect(() => {
    let dogsInfo = mapData.dogIDs.map((dogID) => {
      async() => {
        const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}getdogbyid/${dogID}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
    
        if (!data.result) {
          return { result: false, error: "dogInfo not found" };
        } else {
          setScrollerData([...scrollerData, data.dog ]);     
        } 
      }; 
    })
  }, []); */

  console.log(scrollerData);

  console.log("mapData dans promenadeInscriptionScreen", mapData);
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
  
  // Gestion de l'inscription




  



  return (
    <View style={styles.container}>
      <View style={styles.walkEventInfo}>
        <Text> Nom : {mapData[0].eventName}</Text>
        <Text> Date : {mapData[0].eventDate} Heure: {mapData[0].eventTime}</Text>
        <Text> Ville: {mapData[0].eventCity} environment: {mapData[0].walkID.environment} </Text>
        <Text> rythme: {mapData[0].walkID.rythme}</Text>
        <Text> distance: {mapData[0].walkID.distance} km durée: {mapData[0].walkID.duration} min</Text>
        <Text> description: {mapData[0].walkID.description}</Text>
      </View>
      <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("PromenadeCreation")}
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
        {/* <FlatList
              data={scrollerData}
              renderItem={({item}) => 
                <WalkEventSearchCard 
                  name={item.eventName} 
                  duration={item.walkID.duration} 
                  distance={item.walkID.distance}
                  date={item.eventDate}
                  time={item.eventTime}
                  environment={item.walkID.environment}
                  eventID={item._id}
                  selectEventCard={selectEventCard}
                  unselectEventCard={unselectEventCard}
                  participate={participate}
                />
              }
              keyExtractor={item => item._id}
            /> */}
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
        marginTop: '1%',
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
    });
    