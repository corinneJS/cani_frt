import React from "react";
import { Alert } from "react-native";
import { useSelector } from "react-redux";


import Icon from "react-native-vector-icons/FontAwesome";

const DevMenu = () => {
const [isVisible, setIsVisible] = useState(true);  


 const dogData = useSelector((state) => state.dog.value);
 const userData = useSelector((state) => state.user.value)
 



return (
  <Modal
    visible={isVisible}
    transparent={true}
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
