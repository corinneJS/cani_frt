// RegisterWebServices.js


export const registerUser_ws = async ({userData}) => {
  console.log("register_ws, userData ", userData);
  /* 'https://backend-one-nu-35.vercel.app/' */
  await fetch(`https://backend-one-nu-35.vercel.app/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({userData}),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("register_ws, data ", data);
      return data;
    });
};
