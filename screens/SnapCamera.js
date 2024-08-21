import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from 'react-redux';
import { addPhoto } from '../reducers/user';
import { addDogPhoto } from '../reducers/dog';
import Constants from "expo-constants";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';
// import feuille de style globale
const globalCSS = require("../styles/global.js");


export default function SnapCamera() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);

  let cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    console.log("photo.Uri", photo.uri)
    const formData = new FormData();

    formData.append('photoFromFront', {
      uri: photo.uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    const response = await fetch(
      `${Constants.expoConfig.extra.EXPO_PUBLIC_BASE_URL}upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
      console.log("data retourné par fetch upload vers backend", data);
      
    if (data.result) {
        const dogPhotoData = {
          dogPhotoName: "une photo",
          uri: data.url,
          isProfilPhoto : true}
        dispatch(addDogPhoto({dogPhotoData}));    
        return { result: true, photo:dogPhotoData };
  } else {
    return { result: false, error: "Take Photo : Pb upload photo" };
  }
 
}
 
 
 
        
 

  if (!hasPermission || !isFocused) {
    return <View />;
  }

  return (
    <LinearGradient
      colors={["#F2B872", "#FFFFFF"]}
      style={globalCSS.backgrdContainer}
    >
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Camera
            type={type}
            flashMode={flashMode}
            ref={(ref) => (cameraRef = ref)}
            style={styles.camera}
          >
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() =>
                  setType(
                    type === CameraType.back
                      ? CameraType.front
                      : CameraType.back
                  )
                }
                style={styles.button}
              >
                <FontAwesome name="rotate-right" size={25} color="#ffffff" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  setFlashMode(
                    flashMode === FlashMode.off
                      ? FlashMode.torch
                      : FlashMode.off
                  )
                }
                style={styles.button}
              >
                <FontAwesome
                  name="flash"
                  size={25}
                  color={flashMode === FlashMode.off ? "#ffffff" : "#e8be4b"}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.snapContainer}>
              <TouchableOpacity onPress={() => cameraRef && takePicture()}>
                <FontAwesome name="circle-thin" size={95} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </Camera>
        </KeyboardAvoidingView>
        <StatusBar barStyle={"default"} hidden={false} />
      </SafeAreaView>
    </LinearGradient>
  );

  }
const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 50,
  },
  snapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 25,
  },
});
