// Register_webSrv.js
import Constants from "expo-constants";

export const registerUser_webSrv = async (userData) => {

  
  const response = await fetch(
    `${Constants.expoConfig.extra.EXPO_PUBLIC_BASE_URL}users/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );
    console.log("webservice", response)
    const data = await response.json()
    
console.log("webservice data", data);
      return data;
 
};
