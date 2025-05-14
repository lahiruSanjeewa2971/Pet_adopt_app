import React from "react";
import { Image, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import Feather from "@expo/vector-icons/Feather";

export default function OwnerInfo({ petInfo }) {
  return (
    <View
      style={{
        padding: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.PRIMARY,
        margin: 20,
        backgroundColor: Colors.WHITE,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Image
          source={{
            uri:
              petInfo?.userImage ||
              "https://plus.unsplash.com/premium_vector-1720740375507-2c946054580f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
          }}
          style={{ width: 60, height: 60, borderRadius: 99 }}
        />

        <View>
          <Text style={{ fontFamily: "delius", fontSize: 17 }}>
            {petInfo?.userName || "No owner data"}
          </Text>
          <Text style={{ color: Colors.GRAY }}>Pet Owner</Text>
        </View>
      </View>
      <Feather name="send" size={24} color={Colors.PRIMARY} />
    </View>
  );
}
