import React from "react";
import { Image, Text, View } from "react-native";
import Colors from "../../constants/Colors";

export default function PetSubInfoCard({ icon, title, value }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.WHITE,
        padding: 10,
        margin: 5,
        borderRadius: 8,
        gap: 10,
        flex: 1,
      }}
    >
      <Image source={icon} style={{ width: 40, height: 40 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: "delius", fontSize: 16 }}>{title}</Text>
        <Text style={{ fontFamily: "delius", fontSize: 20 }}>{value}</Text>
      </View>
    </View>
  );
}
