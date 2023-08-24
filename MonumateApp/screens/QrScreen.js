import {
  Text,
  View,
  StyleSheet,
  Button,
  StatusBar,
  TextInput,
} from "react-native";

import QRCode from 'react-native-qrcode-svg';
export default function QRScreen({route}) {
  const qrinfo = route.params.qrinfo;
  return (
    <View style={styles.container}>
      <QRCode value={qrinfo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    textAlign: "center",
    marginTop: 20,
  },
  left: {
    textAlign: "left",
    marginTop: 20,
    marginLeft: 20,
  },
});
