import { config } from "dotenv";
const srvURL = Constants.manifest.extra.srvURL;

export const OneBreedById_webSrv = async (idBreed) => {
  const response = await fetch(
    `${srvURL}breeds?idBreed=${idBreed}`
  );
  const data = await response.json();
  console.log("Retour web-service", data);
  if (data) {
    return { result: true, breeds: data.breed };
  } else {
    return { result: false, error: "breeds not found" };
  }
};
export const AllBreeds_webSrv = async () => {
  const response = await fetch(`${srvURL}breeds/`);
  const data = await response.json();
  console.log("Retour web-service", data);
  if (data) {
    return { result: true, breeds: data.breed };
  } else {
    return { result: false, error: "breeds not found" };
  }
};