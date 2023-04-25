import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home", { screen: "Home" });
      }
    });

    return unsubscribe;
  }, []);

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          email: email,
          guard: false,
        });
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../assets/logomonumate.png")}
        style={styles.smallLogo}
      />
      <Image
        source={require("../assets/textlogo.png")}
        style={styles.textLogo}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => {
          setName(text);
        }}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => {
          setEmail(text);
        }}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => {
          setPassword(text);
        }}
        value={password}
      />
      <TouchableOpacity style={styles.btn} onPress={handleSignup}>
        <Text style={styles.button}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.button}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  smallLogo: {
    marginBottom: 20,
  },
  textLogo: {
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 10,
    flex: 0.1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 2,
    paddingBottom: 2,
    borderWidth: 2,
    borderColor: "#807A7A",
    marginBottom: 15,
    fontSize: 15,
    borderRadius: 8,
  },
  btn: {
    width: 200,
    backgroundColor: "#5669FF",
    marginBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  button: {
    fontSize: 15,
    color: "#FFFFFF",
  },
});
