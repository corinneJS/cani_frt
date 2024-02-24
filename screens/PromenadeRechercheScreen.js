// Auteur : KB
// Date : Mercredi 21 Février
// Ecran pour rechercher une promenade par ville
import { useEffect, useState } from 'react';
import {
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
import { LinearGradient } from "expo-linear-gradient"; 
import { useDispatch, useSelector } from 'react-redux';
import { addWalk, removeWalk, importWalks, addItinerary, addMarkers, addMapPositionCentered  } from '../reducers/walk';
import { infoUser } from '../reducers/user';
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
  const dispatch = useDispatch();
  const walk = useSelector((state) => state.walk.value);

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [name, setName] = useState("");
  const [environment, setEnvironment] = useState("");
  const [rythme, setRythme] = useState("");
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [description, setDescription] = useState("");
  const [isSeachBarVisible, setIsSeachBarVisible] = useState(true);
  const [positionCentered, setPositionCentered] = useState({latitude: -16.5, longitude: -151.74});
  const [currentPosition, setCurrentPosition] = useState({latitude: -16.5, longitude: -151.74});
  const [scrollerData, setScrollerData] = useState([]);
  const [markers, setMarkers] = useState([]);

  
/*   const handleSearch = () => {
    let walkEvents = [];
    fetch(`${process.env.EXPO_PUBLIC_BASE_URL}walks/walkevent/${eventCity}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
      .then(data => {
        walkEvents = data.walkEvents;
        //console.log("walkEvents", walkEvents)
      });
      console.log("walkEvents", walkEvents)
  }; */

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
    console.log("currentPosition:", currentPosition);
  }, []);

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
      //console.log("walkEvents", data.walkEvents);
      setScrollerData(data.walkEvents);
            
      data.walkEvents.forEach((event, i) => {
        let color = red;
        switch (i%13) {
          case 0:
            color = "tomato";
            break;
          case 1:
            color = "orange";
            break;  
          case 2:
            color = "yellow";
            break;
          case 3:
            color = "violet";
            break;
          case 4:
            color = "indigo";
            break;  
          case 5:
            color = "wheat";
            break;
          case 6:
            color = "orange";
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
          let tempCoord = (event.walkID.itinerary.map((coord, j) => {
            setMarkers(...markers, tempCoord);
            setPositionCentered({latitude: coord.lat, longitude: coord.lon});
            return  <Marker 
                      key={i-j} 
                      coordinate={{ latitude: coord.lat, longitude: coord.lon }} 
                      pinColor = {color}
                    />;
          }));
          /* dispatch(addMarkers(tempCoord)); */
          /* dispatch(addMapPositionCentered({latitude: coord.lat, longitude: coord.lon})); */
      });
      
    }
  }; // fin de la fct handleSearch
  
  console.log(walk);
  /* let markers = walk.markers; */
  console.log("markers", markers);
 
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
            <MapView /* onLongPress={(e) => handleLongPress(e)} */ mapType="standard" style={styles.map} 
            region={{
                latitude: positionCentered.latitude,
                longitude: positionCentered.longitude,
                latitudeDelta: 0.15,
                longitudeDelta: 0.065,
              }}
          >
            {currentPosition && <Marker coordinate={currentPosition} title="My position" pinColor="#fecb2d" />}
            {markers}
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
    
   {/* <ScrollView style={styles.scrollView}>
              <Text style={styles.resultatsText}>Resultats </Text>
                <WalkEventSearchCard 
                  key="1" 
                  name="Promenade n°1" 
                  duration="60" 
                  distance="5"
                  urlToEnvironmentImage={require("../assets/favicon.png")}
                />
                <WalkEventSearchCard 
                  key="2" 
                  name="Promenade n°2" 
                  duration="60" 
                  distance="5"
                  urlToEnvironmentImage={require("../assets/favicon.png")}
                />
                <WalkEventSearchCard 
                  key="3" 
                  name="Promenade n°3" 
                  duration="60" 
                  distance="5"
                  urlToEnvironmentImage={require("../assets/favicon.png")}
                />
            </ScrollView> */}