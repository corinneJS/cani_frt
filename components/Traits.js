import React, { useEffect } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchTraitsAsync } from "./reducers/trait.js";

const TraitsComponent = () => {
  const { traits, status, error } = useSelector((state) => state.traits);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTraitsAsync());
  }, [dispatch]);

  return (
    <View>
      {status === "loading" && <ActivityIndicator />}
      {status === "failed" && <Text>Erreur: {error}</Text>}
      {traits.map((trait) => (
        <View key={trait.id}>
          <Text>{trait.traitName}</Text>
        </View>
      ))}
    </View>
  );
};

export default TraitsComponent;
