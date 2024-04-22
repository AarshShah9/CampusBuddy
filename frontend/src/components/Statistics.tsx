import { Text, View } from "react-native";
import React from "react";

export default function Statistics() {
  return (
    <View
      style={{
        borderRadius: 20,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        backgroundColor: "white",
        width: 330,
      }}
    >
      <View
        style={{
          margin: 20,
          padding: 16,
          borderRadius: 20,
          backgroundColor: "#FFFFFF",
        }}
      >
        <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
          Statistics
        </Text>
        <View style={{ paddingTop: 15 }}>
          <Text
            style={{
              color: "black",
              fontSize: 16,
              fontWeight: "bold",
              alignSelf: "flex-start",
            }}
          >
            Event Attendance
          </Text>
          <Text
            style={{
              color: "grey",
              fontSize: 16,
              alignSelf: "flex-start",
            }}
          >
            2,023
          </Text>
          <View style={{ paddingTop: 15 }}>
            <Text
              style={{
                color: "black",
                fontSize: 16,
                fontWeight: "bold",
                alignSelf: "flex-start",
              }}
            >
              Views
            </Text>
            <Text
              style={{
                color: "grey",
                fontSize: 16,
                alignSelf: "flex-start",
              }}
            >
              10,002
            </Text>
          </View>
        </View>
        <View style={{ paddingTop: 15 }}>
          <Text
            style={{
              color: "black",
              fontSize: 16,
              fontWeight: "bold",
              alignSelf: "flex-start",
            }}
          >
            Conversion rate
          </Text>
          <Text
            style={{
              color: "grey",
              fontSize: 16,
              alignSelf: "flex-start",
            }}
          >
            45%
          </Text>
        </View>
        <View style={{ paddingTop: 15 }}>
          <Text
            style={{
              color: "black",
              fontSize: 16,
              fontWeight: "bold",
              alignSelf: "flex-start",
            }}
          >
            Total Revenue
          </Text>
          <Text
            style={{
              color: "grey",
              fontSize: 16,
              alignSelf: "flex-start",
            }}
          >
            $42,050
          </Text>
        </View>
      </View>
    </View>
  );
}
