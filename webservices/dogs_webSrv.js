// RegisterWebServices.js

export const viewDog_webSrv = (dogData) => {
  console.log("Dogs_webSrv, reception viewDog_webSrv dogData ", dogData);

/*   fetch(`${process.env.EXPO_PUBLIC_BASE_URL}dogs/add`, {
   
   
    body: JSON.stringify(dogData),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })

    .then((data) => {
      console.log("Dogs_webSrv, retour viewDog_webSrv", data);
      return data;
    }); */
};

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
