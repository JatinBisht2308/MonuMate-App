// import React from "react";
// import { View, Text, StyleSheet, Image, TouchableOpacity,SafeAreaView } from "react-native";

// export default function ChatBox({
//   name,
//   state,
//   photo,
//   desc,
//   cost,
//   navigation,
// }) {
//   return (
//     <TouchableOpacity
//       style={[styles.container, styles.shadowProp]}
//       onPress={() => {
//         navigation.navigate("Order", {
//           name: name,
//         });
//       }}
//     >
//       <Image
//         source={{ uri: photo }}
//         style={{ width: "40%", height: 150, resizeMode: "cover",borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }}
//       />
//       <SafeAreaView
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-evenly",
//           justifyContent: "center",
//           width: "60%",
//           marginLeft: 10,
//         }}
//       >
//         <Text style={styles.text}>{name}</Text>
//         <Text style={styles.textSub}>{state}</Text>
//         <Text style={styles.desc}>{desc}</Text>
//         <Text style={styles.price}>{cost}/-</Text>
//       </SafeAreaView>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     display: "flex",
//     flexDirection: "row",
//     background: "#FFFFFF",
//     marginTop: 30,
//     borderWidth: 2,
//     borderRadius: 16,
//   },
//   text: {
//     fontSize: 25,
//     fontWeight: "bold",
//     marginBottom: 3,
//   },
//   textSub: {
//     color: "grey",
//     marginBottom: 3,
//   },
//   price: {
//     fontWeight: "bold",
//     color: "#5669FF",
//   },
//   timeStyle: {
//     fontSize: 10,
//   },
//   shadowProp: {
//     shadowOffset: { width: -2, height: 4 },
//     shadowColor: "#171717",
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
//   desc: {
//     marginBottom: 3,
//   },
// });
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
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: photo }}
          style={styles.image}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.state}>{state}</Text>
        <Text style={styles.desc}>{desc}</Text>
        <Text style={styles.cost}>{cost}/-</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
  },
  imageContainer: {
    flex: 0.8,
    backgroundColor: "#000000",
  },
  image: {
    flex: 1,
    width:"100%",
    height: "100%",
    resizeMode: "cover",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  detailsContainer: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  state: {
    color: "grey",
    marginBottom: 5,
  },
  cost: {
    fontWeight: "bold",
    color: "#5669FF",
  },
  desc: {
    marginBottom: 5,
  },
  shadowProp: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
