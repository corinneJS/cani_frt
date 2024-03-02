import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

export default function MultiSelectDropdown ({ options, selectedOptions, onBlur}) {
    console.log("options:", options)
    console.log("selectedOptions:", selectedOptions);
    console.log("onSAVE:", onBlur);

  const [selected, setSelected] = useState([]);
 console.log("selected", selected);
    
  useEffect(() => {
    // Initialiser avec les options sélectionnées préalablement
    setSelected(selectedOptions);
  }, [selectedOptions]);
  const handleSelect = (key) => {
    const currentIndex = selected.findIndex((s) => s.key === key);
    let newSelected = [...selected];

    if (currentIndex === -1) {
      newSelected.push(options.find((option) => option.key === key));
    } else {
      newSelected = newSelected.filter((option) => option.key !== key);
    }

    setSelected(newSelected);
  };
  const handleBlur = () => {
    onBlur(selected);
  };
    
  return (
    <View>
      <ScrollView onBlur={handleBlur}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.key}
            onPress={() => handleSelect(option.key)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 8,

              paddingHorizontal: 12,
            }}
          >
            <View
              style={{
                height: 24,
                width: 24,
                borderRadius: 4,
                borderWidth: 2,
                borderColor: "#000",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
              }}
            >
              {selected.some((s) => s.key === option.key) && (
                <View
                  style={{
                    height: 12,
                    width: 12,
                    backgroundColor: "#000",
                  }}
                />
              )}
            </View>
            <Text>{option.value}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
    </View>
  );
};
