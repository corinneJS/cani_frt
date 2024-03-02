// Auteur : KB
// Date : Mercredi 21 Février
// Ecran pour rechercher une promenade par ville
import { useEffect, useState } from 'react';
import {
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  FlatList,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import WalkEventSearchCard from '../components/walkEventSearchCard';

//feuille de style global
const globalCSS = require("../styles/global.js");

/* color available for marker :
red (default)
tomato
orange
yellow
gold
wheat
tan
linen
green
blue / navy
aqua / teal / turquoise
violet / purple / plum
indigo */

export default function PromenadeRechercheScreen ({ navigation }) {  
  const [eventCity, setEventCity] = useState("");
  const [isSeachBarVisible, setIsSeachBarVisible] = useState(true);
  const [currentPosition, setCurrentPosition] = useState({latitude: -16.5, longitude: -151.74});
  const [scrollerData, setScrollerData] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [pressed, setPressed] = useState(false);
 
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
            setCurrentPosition(location.coords);
          });
      }
    })();
    //console.log("currentPosition:", currentPosition);
  }, []);

  //Fonction envoyée en props à la card WalkEventSearchCard pour utilisation en inverse data flow
  // pour les actions à faire lors d'un appui sur une card.
  const selectEventCard = (cardId, cardName) => {
    setMapData(mapData.filter(e => e._id === cardId));
    setPressed(true);
  }; // fin de la fonction selectEventCard

  //Fonction envoyée en props à la card WalkEventSearchCard pour les actions à faire lorsque le doigt quitte une card (onPressOut).
  const unselectEventCard = () => {
    setMapData(scrollerData);
    setPressed(false);
  }; 

  // Fonction envoyée en props à la card WalkEventSearchCard pour l'appui sur le bouton "je participe"
  const participate = (cardId, cardName) => {
    navigation.navigate("PromenadeInscription", { mapData: scrollerData.filter(e => e._id === cardId), eventID : cardId })
  };

  const handleSearch = async() => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}walks/walkevent/${eventCity}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();

    if (!data.result) {
      return { result: false, error: "walkEvents not found" };
    } else {
      setEventCity("");
      setIsSeachBarVisible(false);
      setScrollerData(data.walkEvents);
      setMapData(data.walkEvents);     
    } 
  }; // fin de la fct handleSearch

  let markers = mapData.map ((event, i, arr) => {
      console.log("event", event);
      //console.log("event.walkID.itinerary", event.walkID.itinerary);
      if (!event) return 
      if (arr.length === 1) {
        //console.log("here");
        return event.walkID.itinerary.map ((marker, j) => {
          return  <Marker 
                    key={i-j} 
                    coordinate={{ latitude: marker.lat, longitude: marker.lon }} 
                    pinColor="orange"    
                    eventName={event.eventName}
                    eventID={event._id}         
                  />;
        });
      } else {
        return event.walkID.itinerary.map ((marker, j) => {
          switch (i%13) {
            case 0:
              color = "violet";
              break;
            case 1:
              color = "green";
              break;  
            case 2:
              color = "yellow";
              break;
            case 3:
              color = "tomato";
              break;
            case 4:
              color = "indigo";
              break;  
            case 5:
              color = "wheat";
              break;
            case 6:
              color = "linen";
              break;  
            case 7:
              color = "yellow";
              break;
            case 8:
              color = "wheat";
              break;
            case 9:
              color = "tan";
              break; 
            case 10:
              color = "linen";
              break;  
            case 11:
              color = "green";
              break;
            case 12:
              color = "blue";
              break;   
            default:
              color = "red";
          }   
          
          return  <Marker 
                    key={i-j} 
                    coordinate={{ latitude: marker.lat, longitude: marker.lon }} 
                    pinColor={color}    
                    eventName={event.eventName}
                    eventID={event._id}         
                  />;
        });
      } 
    })

  //console.log("markers", markers);
  //console.log(mapData);
  let initialCoords = mapData.length ? mapData[mapData.length-1]?.walkID.itinerary[0] : {lat: -16.5, lon: -151.74}
  
    return (
      <View style={styles.container}>
          { isSeachBarVisible &&
            <View style={styles.searchBar}>
              <Text style={styles.textButton}>Saisissez une ville pour y trouver des promenades</Text>
              <TextInput placeholder="Ville" onChangeText={(value) => setEventCity(value)} value={eventCity} style={styles.input} />
              <TouchableOpacity onPress={() => handleSearch()} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>Valider</Text>
              </TouchableOpacity>
            </View>
          }
          { !isSeachBarVisible &&
            <MapView mapType="standard" style={styles.map} 
            region={{
                latitude: initialCoords.lat,
                longitude: initialCoords.lon,
                latitudeDelta: pressed ? 0.02 : 0.0922,
                longitudeDelta: 0.0421,
              }}
          >
            {currentPosition && <Marker coordinate={currentPosition} title="My position" pinColor="#fecb2d" />}
            { markers }
          </MapView>
          }
         {!isSeachBarVisible &&
            <FlatList
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
            />
          } 
          <StatusBar style="auto" />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#f4d8b7',
        alignItems: 'center',
        justifyContent: 'center',
      },
      searchBar: {
        height: "100%",
        width: "100%",
        marginTop: "50%",
        justifyContent: "center",
        alignItems: "center",
      },
      input: {
        width: "80%",
        marginTop: 25,
        borderBottomColor: "#f2B872",
        borderBottomWidth: 1,
        fontSize: 18,
      },
      button: {
        alignItems: "center",
        paddingTop: 8,
        width: "80%",
        marginTop: 30,
        backgroundColor: "#f2B872",
        borderRadius: 10,
        marginBottom: 80,
      },
      textButton: {
        color: "#ffffff",
        height: 30,
        fontWeight: "600",
        fontSize: 16,
      },
      map: {
        width: '100%',
        height: '30%',
        marginTop: '15%',
      },
      scrollView: {
        marginTop: '5%',
      },
      resultatsText:  {
        textAlign: 'center',
        color: "#ffffff",
        height: 30,
        fontWeight: "600",
        fontSize: 16,
      },
    });
    
   