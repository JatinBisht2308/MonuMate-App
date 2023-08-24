import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home", { screen: "Home" });
      }
    });

    return unsubscribe;
  }, []);

  const handleSignup = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        guard: false,
      });
      navigation.navigate("Home");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logomonumate.png")}
          style={styles.smallLogo}
        />
        <Image
          source={require("../assets/textlogo.png")}
          style={styles.textLogo}
        />
      </View>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  smallLogo: {
    // Add styles for your logo image
    marginBottom: 15,
  },
  textLogo: {
    // Add styles for your text logo image
    marginBottom: 5,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 20,
    fontSize: 15,
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
