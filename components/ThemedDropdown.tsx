import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";

export type ThemedDropdownProps<T> = {
  data: T[];
  value?: T;
  onSelect?: React.Dispatch<React.SetStateAction<T | undefined>>;
  // You can add other props as needed
};

const ThemedDropdown = (props: ThemedDropdownProps<any>) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);
  const handleSelect = (item: any) => {
    props.onSelect && props.onSelect(item);
    setDropdownVisible(false);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
        <Text style={styles.buttonText}>
          {props.value || "Select an option"}{" "}
        </Text>
      </TouchableOpacity>
      {isDropdownVisible && (
        <ScrollView style={styles.dropdown} nestedScrollEnabled={true}>
          <FlatList
            data={props.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  button: {
    padding: 15,
    backgroundColor: "#3498db",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  dropdown: {
    position: "absolute",
    width: "100%",
    top: "100%",
    zIndex: 99999,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
  },
});

export default ThemedDropdown;
