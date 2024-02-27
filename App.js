// Fichier App.js de l'application
// Auteur : KB
// Objet : Page principale
// MAJ 08/02, CP : ajout écrans supplémentaires, TabNavigation et Stack, 
// gestion fontGoogle MaterialCommunityIcons, suppression des imports et fonctions inutilisées
// MAJ 15/02, CP :  ajout reducer dog, modif du Menu right header du Stack.navigator : DevMenu 
// MAJ 15/02, KB : ajout reducer walk
// MAJ 21/02, KB : ajout des écrans PromenadeCreationScreen, PromenadeInscriptionScreen, PromenadeRechercheScreen
// --------------------------------------------------

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import for redux persistance
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

//import storage from 'redux-persist/lib/storage'; //KB : pour react "classique"
import AsyncStorage from "@react-native-async-storage/async-storage";

//import of Screen

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import BreedsScreen from "./screens/BreedsScreen";

import WelcomeScreen from "./screens/WelcomeScreen";
import ProfilScreen from "./screens/ProfilScreen";
import DogProfilScreen from "./screens/DogProfilScreen";
import UserProfilScreen from "./screens/UserProfilScreen";
import GalerieScreen from "./screens/GalerieScreen";
import SnapCamera from "./screens/SnapCamera";
import RegisterScreen from "./screens/RegisterScreen";

// import of screens related to Promenade
import PromenadeScreen from "./screens/PromenadeScreen";
import PromenadeCreationScreen from "./screens/PromenadeCreationScreen";
import PromenadeInscriptionScreen from "./screens/PromenadeInscriptionScreen";
import PromenadeRechercheScreen from "./screens/PromenadeRechercheScreen";

// import Component
import DevMenu from "./components/DevMenu";



import {Alert,StyleSheet,View,TouchableOpacity} from "react-native";

// import font & Icons
import {
  useFonts,
  BioRhyme_400Regular,
  BioRhyme_700Bold,
} from "@expo-google-fonts/biorhyme";
import { Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";

import { MaterialCommunityIcons, MaterialIcons, AntDesign } from "@expo/vector-icons";
// import for DatePicker in app
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", enGB);

// import of reducers
import user, { logout } from "./reducers/user";
import dog from "./reducers/dog";
import walk from "./reducers/walk";

/* const reducers = combineReducers({ user, dog, walk });
const persistConfig = { key: "caniconnect", storage: AsyncStorage }; //ici le storage de react est remplacé par "storage: AsyncStorage" de react-native
 */
const store = configureStore({
  reducer: { user, dog, walk },/* persistReducer(persistConfig, reducers), */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  
});

/* const persistor = persistStore(store); */



//pour la navigation "nested"
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";
          let iconLib = "";
          color = "#000000";
          size = 24;

          switch (route.name) {
            case "Home":
              iconLib = "MI";
              iconName = "home";

              break;
            case "Promenade":
              iconLib = "MCI";
              iconName = "paw-outline";
              break;
            case "Races":
              iconLib = "AD";
              iconName = "idcard";
              break;
            case "Profil":
              iconLib = "MCI";
              iconName = "dog";
              break;
            /*
            // a activer pour rechercher un pro
            case "ContactPro":
              iconLib= "AD"
              iconName = "contacts"
              break; */
            default:
              return Alert.alert(
                "Oups !",
                "Pb switch case TabNavigator : route.name "
              );
          }
          switch (iconLib) {
            case "MI":
              return (
                <MaterialIcons name={iconName} size={size} color={color} />
              );
              break;
            case "MCI":
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
              break;
            case "AD":
              return <AntDesign name={iconName} size={size} color={color} />;
              break;
            default:
              return Alert.alert("Oups !", "Pb switch iconLib TabNavigator");
              break;
          }
        },
        tabBarActiveTintColor: "#f2B872",
        tabBarInactiveTintColor: "#335561",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Promenade" component={PromenadeScreen} />
      <Tab.Screen name="Races" component={GalerieScreen} />
      {/*  <Tab.Screen name="Races" component={BreedsScreen} /> */}
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
};
// CP : Mise en oeuvre des CustomHeaderRight de la stack Navigation
function CustomHeaderRight({ navigation, screenName }) {
  switch (screenName) {
            case 'DogProfil' || 'UserProfil':
              return (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => console.log('Ajouter')}>
                    <MaterialIcons name="add" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => console.log('Enregistrer')}>
                    <MaterialIcons name="save" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              );
            default:
              return (
                <View style={{ flexDirection: "row" }}>
                  <MaterialIcons
                    name="location-off" // "location-on" CP : Changez le nom de l'icône en fonction du statut
                    size={24}
                    onPress={() => {
                      // Logique pour basculer/afficher le statut de géolocalisation
                    }}
                  />
                  <MaterialCommunityIcons
                    name="sign-direction"
                    size={24}
                    onPress={() => {}} // METTRE ICI CREER UNE BALADE
                  />
                  <MaterialIcons
                    name="menu"
                    size={24}
                    onPress={() => handleMenu()}
                  />
                </View>
              );
  }
} 

export default function App() {
  // utilisation font google
  let [fontsLoaded] = useFonts({
    BioRhyme_400Regular,
    BioRhyme_700Bold,
    Lato_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  //
  // Affichage userMenu ou DevMenu 
  // 
  const handleMenu = () => {
    return <DevMenu/>
  };

  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            headerTransparent: true,
            headerRight: () => {
              <View style={{ flexDirection: "row" }}>
                <MaterialIcons
                  name="location-off" // "location-on" CP : Changez le nom de l'icône en fonction du statut
                  size={24}
                  onPress={() => {
                    // Logique pour basculer/afficher le statut de géolocalisation
                  }}
                />
                
                <MaterialIcons
                  name="menu"
                  size={24}
                  onPress={() => handleMenu()}
                
                />
              </View>;
            },
          })}
        >
          <Stack.Screen
            name="Login"
            options={{ title: "🐾 caniConnect" }}
            component={LoginScreen}
            /* options={{ headerShown: false }} */
          />
          <Stack.Screen
            name="DogProfil"
            component={DogProfilScreen}
            options={({ navigation }) => ({
              title: "🐾 Profil 4 pattes",
              /* headerRight: () => (
                <CustomHeaderRight
                  navigation={navigation}
                  screenName="DogProfil"
                />
              ), */
            })}
          />
          <Stack.Screen
            name="SnapCamera"
            component={SnapCamera}
            options={({ navigation }) => ({
              title: "🐾 Camera",
              /* headerRight: () => (
                <CustomHeaderRight
                  navigation={navigation}
                  screenName="DogProfil"
                />
              ), */
            })}
          />
          <Stack.Screen
            name="UserProfil"
            options={{ title: "🐾 caniConnect" }}
            component={UserProfilScreen}
            /* options={{ headerShown: false }} */
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: "🐾 S'inscrire" }}
            /* options={{ headerShown: false }} */
          />
          {/*  <Stack.Screen name="UserMenu" component={UserMenu} /> */}
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ title: "🐾 caniConnect" }}
          />
          <Stack.Screen
            name="PromenadeCreation"
            component={PromenadeCreationScreen}
          />
          <Stack.Screen
            name="PromenadeRecherche"
            component={PromenadeRechercheScreen}
          />
          <Stack.Screen
            name="PromenadeInscription"
            component={PromenadeInscriptionScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {/* </PersistGate> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
