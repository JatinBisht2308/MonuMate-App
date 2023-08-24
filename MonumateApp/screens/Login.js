import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
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
        style={[styles.input,styles.shadowProp]}
        placeholder="Email"
        onChangeText={(text) => {
          setEmail(text);
        }}
        value={email}
      />
      <TextInput
        style={[styles.input,styles.shadowProp]}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => {
          setPassword(text);
        }}
        value={password}
      />
      <TouchableOpacity style={[styles.btn,styles.shadowProp]} onPress={handleLogin}>
        <Text style={styles.button}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate("Signup");
        }}
      >
        <Text style={[styles.button,styles.shadowProp]}>Sign Up</Text>
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
    marginBottom: 0,
    marginTop: -30,
  },
  smallLogo: {
    marginBottom: 20,
  },
  textLogo: {

    marginBottom: 20,
  },
  input: {
    width: "50%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
  },
  btn: {
    backgroundColor: "#5669FF",
    borderRadius: 8,
    padding: 10,
    width: "50%",
    marginBottom: 10,
    alignItems: "center",
  },
  button: {
    color: "#fff",
    fontWeight: "bold",
  },
  shadowProp:{
    shadowOffset: {width: 15, height: 30},  
    shadowColor: '#171717',  
    shadowOpacity: 1,  
    shadowRadius: 10,  
  },
});