import React from "react";
import { View, Text, Modal, Alert } from "react-native";
import { useSelector } from "react-redux";



const DevMenu = () => {
const [isVisible, setIsVisible] = useState(true);  


 const dogData = useSelector((state) => state.dog.value);
 const userData = useSelector((state) => state.user.value)
 



return (
  <Modal
    visible={isVisible}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
      setIsVisible(!isVisible);
    }}
  >
    <View>
      <Text>Contenu store Redux</Text>
      <Text>USER :</Text>
      {userData}
      <Text>DOG :</Text>
      {dogData}
    </View>
    
  </Modal>
);
};

export default DevMenu;
