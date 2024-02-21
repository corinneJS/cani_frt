
export const findTraitsByDogID_webSrv = async (dogID) => {
  console.log("findTraitsByDogID_webSrv, reception dogID ", dogID);

  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BASE_URL}traits/${dogID}`
  );

  console.log("retour response /findTraitsBydogID dans le webSrv", response);

  const data = await response.json();
  console.log("data retourné par FindTraits_Srv", data);
  if (data.result) {
    return { result: true, traitsDog: data.trait };
  } else {
    return { result: false, error: "traitsDog not found" };
  }
};
export const AllTraits_webSrv = async () => {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}traits/`
      );
      const data = await response.json();
  if (data.result) {
    return {"result": true, "traits": data.trait };
  }else{
    return { "result": false, "error": "traits not found" };
  };
  
};
