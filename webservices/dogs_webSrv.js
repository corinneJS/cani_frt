
export const findDogsByUserID_webSrv = async (userID) => {
  console.log("findDogsByUserID_webSrv, reception userId ", userID);

  const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}dogs/first_fromuser/${userID}`)
  
   console.log("retour response /firstDog dans le webSrv", response);
     
    const data = await response.json();
  console.log("data retourné par FindDog_Srv", data);
  return data;
 
};

