import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import SiteBox from "../components/SiteBox";

export default function Home({ navigation }) {
  const [sites, setSites] = useState([]);
  const [filteredData, setFileterdData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  useEffect(() => {
    const getCollection = async () => {
      try {
        const temp = [];
        const querySnapshot = await getDocs(collection(db, "sites"));
        querySnapshot.forEach((doc) => {
          temp.push(doc.data());
          console.log(temp[temp.length -1].cost);
        });
        setSites(temp);
      } catch (error) {
        console.error("Error getting collection:", error);
      }
    };
    getCollection();
  }, []);

  const handleSignout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login", { screen: "Login" });
      })
      .catch((error) => alert(error));
  };

  return (
    <View style={styles.homePage}>
      <FlatList
        data={sites}
        style={styles.monuList}
        renderItem={({ item }) => (
          <SiteBox
            name={item.name}
            state={item.state}
            photo={item.photo}
            desc={item.desc}
            cost={item.cost}
            navigation={navigation}
            style={styles.monuCard}
          />
        )}
      />
      <TouchableOpacity onPress={handleSignout} style={styles.btn}>
        <Text style={styles.logOut}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  homePage: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  monuList: {
    width: "90%",
  },
  monuCard:{
    backgroundColor: "#FFF",
  },
  btn: {
    width: "90%",
    backgroundColor: "#5669FF",
    marginBottom: 15,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  logOut: {
    color: "white",
  },
});
