import React from "react";
import { TouchableOpacity, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { resetDogStore } from "../reducers/dog.js"; 
import Icon from "react-native-vector-icons/FontAwesome";

const DevMenu = () => {
const [visible, setVisible] = useState(Visible);  
    const showModal = () => setVisible(true);
    const closeModal = () => setVisible(false);

const handleResetDogStore = () => {
    dispatch(resetDogStore());
    Alert.alert()
    closeModal();
  };    

return (
  <Modal
    visible={visible}
    transparent
    onClose={closeModal}
    title="Menu Développeur"
    footer={[
      {
        text: "Fermer",
        onPress: () => {
          closeModal();
        },
      },
    ]}
  >
    <Button onClick={handleResetDogStore}>Réinitialiser le Dog Store</Button>
  </Modal>
);
};

export default DevMenu;
