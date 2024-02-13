// RegisterWebServices.js

export const dogs_webSrv = (dogData) => {
  console.log("dogs_webSrv, reception dogData ", dogData);

  fetch(`${process.env.EXPO_PUBLIC_BASE_URL}dogs/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dogData),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })

    .then((data) => {
      console.log("dog_webSrv, retour data ", data);  
      return data;
    });
};
