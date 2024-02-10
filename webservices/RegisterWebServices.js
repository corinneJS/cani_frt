// RegisterWebServices.js

const BASE_URL = "https://backend-one-nu-35.vercel.app/"
// "https://backend-one-nu-35.vercel.app/";


export const addUser_ws = async (userData) => {
  
  await  fetch(`${BASE_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {return data})
      
  
};
