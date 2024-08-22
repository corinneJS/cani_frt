// Auteur : KB
// Date : Mercredi 21 Février
// Ecran pour créer une promenade
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
  Alert,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient"; 
import { useDispatch, useSelector } from 'react-redux';
import { addWalk, removeWalk, importWalks, addItinerary } from '../reducers/walk';
import { infoUser } from '../reducers/user';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

//feuille de style global
const globalCSS = require("../styles/global.js");

export default function PromenadeCreationScreen ({ navigation }) {
  const dispatch = useDispatch();
  //Récupértion des infos du store redux
  const walk = useSelector((state) => state.walk.value);
  const user = useSelector((state) => state.user.value);
  const dog = useSelector((state) => state.dog.value);

  const [currentPosition, setCurrentPosition] = useState({latitude: 2.3, longitude: 48.8});
  const [name, setName] = useState("");
  const [environment, setEnvironment] = useState("");
  const [rythme, setRythme] = useState("");
  const [distance, setDistance] = useState();
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState();
  const [itinerary, setItinerary] = useState([]);
  const [tempCoordinates, setTempCoordinates] = useState([]);

  // State variables for walkEvent inputs
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventCity, setEventCity] = useState();

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

   
  const handleLongPress = (e) => {
    let coord = e.nativeEvent.coordinate;
    console.log("coord", coord)
    setItinerary([...itinerary, {lat: coord.latitude , lon: coord.longitude }]);
  };

  const handleNewWalk= () => {
    // On s'assure que l'utilisateur a placé au moins un marquer
    if (itinerary === undefined || itinerary.length == 0 ) {
      Alert.alert("Indiquer l'itinéraire en effectuant des appuis longs sur la carte");
      return;
    } else {
      // Send new walk to backend to register it in database
      fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/walks/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: name, 
          environment: environment, 
          rythme: rythme,
          distance: distance,
          description: description,
          token: user.token, // user.token vient du store redux
          dogID: dog.dogID, // dog.dogID vient du store redux
          duration : duration,
          dateCreated: new Date,
          dateModified: null,
          itinerary: itinerary,
          eventName: eventName,
          eventDate: eventDate,
          eventTime: eventTime,
          eventCity: eventCity,
        }),
      }).then((response) => response.json())
        .then((data) => {
          // Dispatch in Redux store if the new place have been registered in database
          if (data.result) {
            dispatch(addWalk({
              name: name, 
              environment: environment, 
              rythme: rythme,
              distance: distance,
              description: description,
              duration : duration,
            }))
            dispatch(addItinerary(itinerary));

            console.log("reducer walk:", walk.walks)
            console.log("itinerary:", itinerary)
            console.log("reducer walk/itineraries:", walk.itineraries)
            setName('');
            setEnvironment('');
            setRythme('');
            setDistance();
            setDescription('');
            setDuration();
            setItinerary([]);
            setEventName('');
            setEventDate('');
            setEventTime('');
            setEventCity('');
            Alert.alert("Promenade créée avec succès !");
          }
        });
      }
  };

  const markers = itinerary.map((data, i) => {
    return <Marker key={i} coordinate={{ latitude: data.lat, longitude: data.lon }} />;
  });

  return (
    <LinearGradient
      colors={["#F2B872", "#FFFFFF"]}
      style={globalCSS.backgrdContainer}
    >
      <Text>Welcome to caniconnect PromenadeCreationScreen !</Text>
      <MapView onLongPress={(e) => handleLongPress(e)} mapType="standard" style={styles.map} 
        region={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
      >
        {currentPosition && <Marker coordinate={currentPosition} title="My position" pinColor="#fecb2d" />}
        {markers}
      </MapView>
      <View style={styles.formContent}>
        <View style={styles.walkInputs}>
          <TextInput placeholder="Nom de la promenade" onChangeText={(value) => setName(value)} value={name} style={styles.input} />
          <View style={styles.envRythme}>
            <TextInput placeholder="Environnement" onChangeText={(value) => setEnvironment(value)} value={environment} style={styles.input} />
            <TextInput placeholder="Rythme" onChangeText={(value) => setRythme(value)} value={rythme} style={styles.input} />
          </View>
          <View style={styles.distDuree}>
            <TextInput placeholder="Distance (en km)" onChangeText={(value) => setDistance(value)} value={distance} style={styles.input} />
            <TextInput placeholder="Durée (en minutes)" onChangeText={(value) => setDuration(value)} value={duration} style={styles.input} />
          </View>
          <TextInput placeholder="Description" onChangeText={(value) => setDescription(value)} value={description} style={styles.input} />
        </View>

        <View style={styles.walkEventInputs}>
          <TextInput placeholder="Nom de l'événement" onChangeText={(value) => setEventName(value)} value={eventName} style={styles.input} />
          <View style={styles.dateTime}>
            <TextInput placeholder="Date" onChangeText={(value) => setEventDate(value)} value={eventDate} style={styles.input} />
            <TextInput placeholder="Heure" onChangeText={(value) => setEventTime(value)} value={eventTime} style={styles.input} />
          </View>
          <TextInput placeholder="Ville" onChangeText={(value) => setEventCity(value)} value={eventCity} style={styles.input} />       
        </View>

        <TouchableOpacity onPress={() => handleNewWalk()} style={globalCSS.button} activeOpacity={0.8}>
            <Text style={globalCSS.textButton}>Valider</Text>
        </TouchableOpacity>
        
      </View>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2B872',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: '100%',
      height: '30%',
    },
    formContent: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      width: "40%",
      marginTop: 25,
      borderBottomColor: "#f2B872",
      borderBottomWidth: 1,
      fontSize: 18,
    },
    walkInputs: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    envRythme: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
    },
    distDuree: {
      flexDirection: 'row',
      justifyContent: "space-around",
      alignItems: "center",
    },
    walkEventInputs: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    dateTime: {
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: "center",
    },
  });
  