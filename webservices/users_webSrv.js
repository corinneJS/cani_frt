import { useSelector} from "react-redux";
import { infoUser } from "../reducers/user";
import Constants from "expo-constants";



// Update d'un humain
//-------------------------------------------
export const updateUser_webSrv = async (infoUser) => {
 
  console.log("updateUser_webSrv, reception infoUser ", infoUser);
  
  // supprime userID de infoUser pour update
  const { userID, ...rest } = infoUser;
 console.log("updateUser_webSrv, reception userId ", userID);

  console.log("updateUser_webSrv,  rest", rest);
  
  const response = await fetch(
    `${Constants.expoConfig.extra.EXPO_PUBLIC_BASE_URL}users/updateUser/${userID}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(infoUser),
    }
  );
  console.log("retour response /userUpdate dans le webSrv", response);

  const data = await response.json();
  console.log("data retourné par updateUser_Srv", data);

  if (data.result) {
    return { result: true, user: data.user };
  } else {
    return { result: false, error: "user not found" };
  }
};
