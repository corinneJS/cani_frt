// Login_webSrv.js
import Constants from "expo-constants";

export const loginUser_webSrv = async (userData) => {
  const response = await fetch(
    `${Constants.expoConfig.extra.EXPO_PUBLIC_BASE_URL}users/signin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );
  console.log("retour response /signin dans le webSrv", response)
    const data = await response.json()
    console.log("data retourné par loginUser_Srv", data);
      return data;
 
};
