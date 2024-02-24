import { useEffect, useState, useRef } from "react";
import { Camera } from "expo-camera";
import { Button, View, Text } from "react-native";
import { useIsFocused } from "@react-navigation/native";

export default function Galerie() {
  const [hasPermission, setHasPermission] = useState(false);
const isFocused = useIsFocused();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
 let cameraRef = useRef(null);


 const takePicture = async () => {
   const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
   console.log(photo);
 };
  if (!hasPermission|| !isFocused) {
    return <View></View>;
  }

  return (
  <Camera ref={(ref) => cameraRef = ref}>
     <Button title="Snap" onPress={() => takePicture()} />
   </Camera>);
}
