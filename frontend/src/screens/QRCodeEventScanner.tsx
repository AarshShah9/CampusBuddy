import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { BarCodeScanningResult, Camera } from "expo-camera";
import { useCameraPermissions } from "expo-image-picker";

export default function QRCodeScanner() {
  const [permissions, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState<boolean>(false);

  if (!permissions) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (!permissions.granted) {
    Alert.alert(
      "Camera permission needed",
      "Please allow camera permission to scan QR code",
    );
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button title="Allow Camera" onPress={requestPermission} />
      </View>
    );
  }

  // Handle the QR code scanning
  const handleBarCodeScanned = ({ type, data }: BarCodeScanningResult) => {
    setScanned(true);
    // console.log(`QR code with type ${type} and data ${data} has been scanned!`);
    alert(`QR code with type ${type} and data ${data} has been scanned!`);
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        onBarCodeScanned={handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: ["qr"],
        }}
      ></Camera>
      {/*{scanned && (*/}
      {/*  <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />*/}
      {/*)}*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  cameraContent: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
