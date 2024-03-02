// Auteur : KB
// Date : samedi 2 Mars
// Card à afficher pour lors de l'inscription à une promenade pour visualiser les chiens inscrits
import {
    Pressable,
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
  
  
  export default function DogRegisteredCard (props) {
  
      return (
          <Pressable onPressIn={() => handlePressIn()} onPressOut={() => handlePressOut()}>
              <View style={styles.card}>
                  <View style={styles.environmentPicture}>
                      {environmentPicto}
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
                          <Pressable onPress={() => handleParticipate()} style={styles.button} activeOpacity={0.8}>
                              <Text style={styles.textButton}>Je participe</Text>
                          </Pressable>
                      </View> 
                  </View>
              </View>
          </Pressable>
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
    