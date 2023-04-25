import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.email.endsWith("@gaurd.com")) {
          navigation.replace("Scanner", { screen: "Scanner" });
        } else {
          navigation.replace("Home", { screen: "Home" });
        }
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("LoggedIn with ", user.email);
      })
      .catch((error) => {
        alert(error);
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
      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.button}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate("Signup");
        }}
      >
        <Text style={styles.button}>Sign Up</Text>
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
