// Register_webSrv.js


export const registerUser_webSrv = (userData) => {
  console.log("register_ws, userData ", userData);
  
  fetch(`${process.env.EXPO_PUBLIC_BASE_URL}users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    /*  .then((response) => {
      console.log(response);
      return response.json();
    }) */
    .then((response) =>  response.json())
    .then((data) => {
      console.log("register_ws, data ", data);
      return data;
    });
};
