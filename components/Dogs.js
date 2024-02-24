import React, { useEffect } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchDogsAsync } from "./reducers/dog.js";

const DogsComponent = () => {
  const { dogs, status, error } = useSelector((state) => state.dogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDogsAsync());
  }, [dispatch]);

  return (
    <View>
      {status === "loading" && <ActivityIndicator />}
      {status === "failed" && <Text>Erreur: {error}</Text>}
      {dogs.map((dog) => (
        <View key={dog._id}>
          <Text>{dog.dogName}</Text>
        </View>
      ))}
    </View>
  );
};

export default DogsComponent;
