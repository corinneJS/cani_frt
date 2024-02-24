// Auteur : KB
// Date : vendredi 23 Février
// Card à afficher pour lors de la recherche d'une promenade
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
import { shadow } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons, AntDesign } from "@expo/vector-icons";


export default function WalkEventSearchCard (props) {
    
    switch (props.environment) {
        case "Campagne":
            urlToEnvironmentImage="../assets/favicon.png";
            iconLib = "F5";
            iconName ="home";
            break;
        case "Forêt":
                urlToEnvironmentImage="../assets/favicon.png";
                iconLib = "MCI";
                iconName ="forest";
            break;
        case "Montagne":
            urlToEnvironmentImage="../assets/favicon.png";
            iconLib = "F5";
            iconName ="mountain";
            break;
        case "Plage":
            urlToEnvironmentImage="../assets/favicon.png";
            iconLib = "F5";
            iconName ="beach";
            break;
        case "Ville":
            urlToEnvironmentImage="../assets/favicon.png";
            iconLib = "F5";
            iconName ="city";
            break;
        default:
          return iconLib = "F5", iconName ="mountain";
    }   

    switch (iconLib) {
        case "F5":
          return <FontAwesome5 name="mountain" size={24} color="black" />;
          break;
        case "MCI":
          return <MaterialCommunityIcons name={iconName} size={24} color="black"/>;
          break;
        case "AD":
          return <AntDesign name={iconName} size={24} color="black" />;
          break;
        default:
          return <FontAwesome5 name="mountain" size={24} color="black" />;
          break;
      }

    return (
        <View style={styles.card}>
            <View style={styles.environmentPicture}>
                {/* <Image source={{uri:urlToEnvironmentImage}} alt={props.title} width={0.5} height={0.5} /> */}
                {(iconLib = "F5") && <FontAwesome5 name={iconName} size={24} color="black" />}
                {(iconLib = "MCI") && <MaterialCommunityIcons name={iconName} size={24} color="black" />}
            </View>
            <View style={styles.centralTexts}>
                <Text style={styles.text}> {props.name}                           </Text>
                <Text style={styles.text}> {props.duration}min - {props.distance}km    </Text>
            </View> 
            <View style={styles.rightPart}>
                <View style={styles.dateTime}>
                    <View style={styles.timePicture}>
                        <Ionicons name="time-outline" size={24} color="black" />
                    </View>
                    <View style={styles.time}>
                        <Text style={styles.text}> {props.date} </Text>
                        <Text style={styles.text}> {props.time} </Text>
                    </View> 
                </View>
                <View style={styles.participateButton}> 
                    <TouchableOpacity onPress={() => handleSearch()} style={styles.button} activeOpacity={0.8}>
                        <Text style={styles.textButton}>Je participe</Text>
                    </TouchableOpacity>
                </View> 
            </View>
        </View>
      );
}

const styles = StyleSheet.create({
    card: {
        width: "95%",
        height: 100,
        margin: 10,
        padding: 10,
        backgroundColor: '#FFF8F4',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        borderRadius: 50,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    environmentPicture: {
        width: "20%",
        height: "70%",
    },
    centralTexts: {
      width: "30%",

    },
    rightPart: {
        width: "40%",
        flexDirection: "column",
        justifyContent: "space-around",
        
    },
    dateTime: {
        width: "100%",
        height: "30%",
        flexDirection: "row",
    },
    timePicture: {
       /*  width: "20%",
        height: "90%", */
    },
    time: {
        width: "80%",
        height: "90%",
    },
    participateButton: {
        width: "90%",
        height: "70%",
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 8,
      width: "90%",
      height: "50%",
      marginTop: 30, 
      backgroundColor: "#f2B872",
      borderRadius: 10,
      marginBottom: 80,
      borderRadius: 50,
    },
    textButton: {
      color: "#ffffff",
      height: 30,
      fontWeight: "600",
      fontSize: 16,
    }, 
    text: {
        fontFamily: "Lato_400Regular",
        fontSize: 12,
        color: "black",
    },
});
  