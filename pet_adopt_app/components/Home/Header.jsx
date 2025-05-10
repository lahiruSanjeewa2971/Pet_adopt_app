import { useUser } from "@clerk/clerk-expo";
import React from "react";
import { Image, Text, View } from "react-native";

export default function Header() {
  const { user } = useUser();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text style={{ fontFamily: "delius", fontSize: 18 }}>welcome,</Text>
        <Text style={{ fontFamily: "delius", fontSize: 25 }}>
          {user?.fullName}
        </Text>
      </View>
      <Image
        source={{ uri: user?.imageUrl }}
        style={{ width: 40, height: 40, borderRadius: 99 }}
      />
    </View>
  );
}
