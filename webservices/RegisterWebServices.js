// RegisterWebServices.js

const BASE_URL = "http://localhost:3000"
// "https://backend-lyart-mu.vercel.app";


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
