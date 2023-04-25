import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function ChatBox({
  name,
  state,
  photo,
  desc,
  cost,
  navigation,
}) {
  return (
    <TouchableOpacity
      style={[styles.container, styles.shadowProp]}
      onPress={() => {
        navigation.navigate("Order", {
          name: name,
        });
      }}
    >
      <Image
        source={{ uri: photo }}
        style={{ width: "40%", height: 150, resizeMode: "cover" }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          justifyContent: "center",
          width: "60%",
          marginLeft: 10,
        }}
      >
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.textSub}>{state}</Text>
        <Text style={styles.desc}>{desc}</Text>
        <Text style={styles.price}>{cost}/-</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    background: "#FFFFFF",
    bordeRadius: 16,
    marginTop: 30,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 2,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 3,
  },
  textSub: {
    color: "grey",
    marginBottom: 3,
  },
  price: {
    fontWeight: "bold",
    color: "#5669FF",
  },
  timeStyle: {
    fontSize: 10,
  },
  shadowProp: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  desc: {
    marginBottom: 3,
  },
});
