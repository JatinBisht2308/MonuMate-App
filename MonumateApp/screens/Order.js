// import React, { useState } from "react";
// import { Text, View, StyleSheet, Button, TextInput } from "react-native";
// import { db } from "../firebaseConfig";
// import { doc, setDoc } from "firebase/firestore";
// import moment from "moment";
// import { Alert } from "react-native";

// export default function Order({ route, navigation }) {
//   console.log("this is the route", route);
//   const loc = route.params.name;
//   console.log("this is the location", loc);
//   const [name, setName] = useState("");
//   const [date, setDate] = useState("19-08-2023");
//   const [people, setPeople] = useState(1);

//   handlePayment = async () => {
//     if (name === "" || people === "") {
//       Alert.alert("", "Please fill all the details");
//     }
//     const time = moment().utcOffset("+05:30").format(" hh:mm:ss a");
//     const qrinfo = name + "+" + date + "+" + people + "+" + loc + "+" + time;
//     await setDoc(doc(db, "qrs", qrinfo), {
//       qrinfo: qrinfo,
//     });
//     navigation.navigate("QRScreen", { qrinfo: qrinfo });
//   };
//   return (
//     <View style={styles.container}>
//       <Text style={styles.Heading}>Personal Details</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         required
//         onChangeText={(text) => {
//           console.log("this is the name:", text);
//           setName(text);
//         }}
//         value={name}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="No. of people"
//         required
//         onChangeText={(text) => {
//           setPeople(text);
//           console.log("this is the number of people:", text);
//         }}
//       />
//       <Text style={styles.destination}>Destination: {loc}</Text>
//       <Button
//         title={"Proceed to Pay"}
//         onPress={handlePayment}
//         style={styles.button}
//         color="#5669FF"
//       />
//       <View style={styles.cont2}>
//         <Text style={styles.Heading}>Instructions</Text>
//         <Text style={styles.left}>
//           Kindly follow these instructions while visiting the Monument/Meuseum:{" "}
//         </Text>
//         <Text style={styles.left}>• Do not Litter here and there.</Text>
//         <Text style={styles.left}>• Kindly respect other people's space.</Text>
//         <Text style={styles.left}>• Do not vanderlize the property.</Text>
//         <Text style={styles.left}>• Do not misbehave or create chaos.</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     width: "100%",
//     height: "100%",
//   },
//   cont2: {
//     flex: 1,
//     width: "100%",
//     marginTop: 50,
//     display: "flex",
//     justifyContent: "center",
//     padding: "10%"
//   },
//   input: {
//     width: 230,
//     height: 10,
//     flex: 0.1,
//     paddingLeft: 20,
//     paddingRight: 20,
//     paddingTop: 2,
//     paddingBottom: 2,
//     borderWidth: 2,
//     borderColor: "#807A7A",
//     marginBottom: 15,
//     fontSize: 15,
//     borderRadius: 5,
//   },
//   Heading: {
//     fontSize: 30,
//     fontWeight: "bold",
//     marginBottom: 10,
//     marginTop: 20,
//     color: "#5669FF",
//   },
//   destination: {
//     fontSize: 15,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   button: {
//     marginBottom: "20",
//   },
//   left: {
//     fontSize: 15,
//   },
// });
import React, { useState } from "react";
import { Text, View, StyleSheet, Button, TextInput, SafeAreaView, Alert } from "react-native";
import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import moment from "moment";

export default function Order({ route, navigation }) {
  const loc = route.params.name;
  const [name, setName] = useState("");
  const [people, setPeople] = useState(1);

  const handlePayment = async () => {
    if (name === "" || people === "") {
      Alert.alert("", "Please fill all the details");
    } else {
      const time = moment().utcOffset("+05:30").format(" hh:mm:ss a");
      const qrinfo = `${name}+${date}+${people}+${loc}+${time}`;
      await setDoc(doc(db, "qrs", qrinfo), {
        qrinfo: qrinfo,
      });
      navigation.navigate("QRScreen", { qrinfo: qrinfo });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Personal Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="No. of people"
          onChangeText={(text) => setPeople(text)}
          value={people}
        />
        <Text style={styles.destination}>Destination: {loc}</Text>
        <Button
          title="Proceed to Pay"
          onPress={handlePayment}
          color="#5669FF"
        />
      </View>
      <View style={styles.instructionsContainer}>
        <Text style={styles.heading}>Instructions</Text>
        <Text style={styles.instructionText}>
          Kindly follow these instructions while visiting the Monument/Museum:{" "}
        </Text>
        <Text style={styles.instructionText}>• Do not litter here and there.</Text>
        <Text style={styles.instructionText}>• Kindly respect other people's space.</Text>
        <Text style={styles.instructionText}>• Do not vandalize the property.</Text>
        <Text style={styles.instructionText}>• Do not misbehave or create chaos.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  formContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  instructionsContainer: {
    flex: 1,
    width: "100%",
    marginTop: 50,
    paddingHorizontal: "10%",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
    color: "#5669FF",
  },
  input: {
    width: 230,
    height: 40,
    borderWidth: 2,
    borderColor: "#807A7A",
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 15,
  },
  destination: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 15,
  },
});
