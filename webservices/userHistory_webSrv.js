import Constants from "expo-constants";
export const historyWalkEvent_WebSrv = async (dogID) => {
  const response = await fetch(
    `${Constants.expoConfig.extra.EXPO_PUBLIC_BASE_URL}walks/history/${dogID}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await response.json();
  if (data.result) {
    return { result: true, walkEvents: data.walkEvents };
  } else {
    return { result: false, error: "event not found" };
  }
};
