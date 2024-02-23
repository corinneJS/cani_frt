import { useSelector} from "react-redux";
import { infoDog } from "../reducers/dog";



// Les 4pattes rattachés à un userID
//-------------------------------------------
export const findDogsByUserID_webSrv = async (userID) => {
  console.log("findDogsByUserID_webSrv, reception userId ", userID);

  const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}dogs/first_fromuser/${userID}`);
  console.log("retour response /firstDog dans le webSrv", response);

  const data = await response.json();
  console.log("data retourné par FindDog_Srv", data);

  if (data.result) {
    return { result: true, dog: data.dog };
  } else {
    return { result: false, error: "dog not found" };
  }
};
// Update d'un 4pattes
//-------------------------------------------
export const updateDog_webSrv = async (dogID) => {
  console.log("updateDog_webSrv, reception dogId ", dogID);
  
  const infoDog = useSelector((state) => state.dog.value);
  console.log("updateDog_webSrv, InfoDog ", infoDog);
  
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BASE_URL}dogs/updateDog/${dogID}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(infoDog),
    }
  );
  console.log("retour response /dogUpdate dans le webSrv", response);

  const data = await response.json();
  console.log("data retourné par updateDog_Srv", data);

  if (data.result) {
    return { result: true, dog: data.dog };
  } else {
    return { result: false, error: "dog not found" };
  }
};
