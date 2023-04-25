import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import moment from "moment";
import { db } from "../firebaseConfig";
import { doc, getDocs, collection } from "firebase/firestore";
import { auth } from "../firebaseConfig";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function Scanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const getCollection = async (data) => {
    const temp = [];
    try {
      const querySnapshot = await getDocs(collection(db, "qrs"));
      querySnapshot.forEach((doc) => {
        if (doc.data().qrinfo === data);
        temp.push(doc.data().qrinfo);
      });
    } catch (error) {
      console.error("Error getting collection:", error);
    }

    for (var i = 0; i < temp.length; i++) {
      if (data === temp[i]) {
        var [name, date, people, site, _] = data.split("+");
        const time = moment().utcOffset("+05:30").format(" hh:mm:ss a");
        alert(
          "Name: " +
            name +
            "\n" +
            "Date: " +
            date +
            "\n" +
            "No. of people: " +
            people +
            "\n" +
            "Location: " +
            site +
            "\n" +
            "Time: " +
            time
        );
        break;
      }
    }
    if (i == temp.length) alert("Not Verified!");
  };

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    getCollection(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleSignout = () => {
    Alert.alert("Confirm", "Are you sure want to log out?", [
      {
        text: "Yes",
        onPress: () => {
          auth
            .signOut()
            .then(() => {
              navigation.replace("Login", { screen: "Login" });
            })
            .catch((error) => alert(error));
        },
      },
      {
        text: "No",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
      <TouchableOpacity style={styles.btn} onPress={handleSignout}>
        <Text style={styles.button}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    fontSize: 15,
    color: "#FFFFFF",
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
    position: "absolute",
    bottom: 18,
  },
});
