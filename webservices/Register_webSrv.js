// Register_webSrv.js


export const registerUser_webSrv = async (userData) => {

  
  const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    console.log("webservice", response)
    const data = await response.json()
    
console.log("webservice data", data);
      return data;
 
};
