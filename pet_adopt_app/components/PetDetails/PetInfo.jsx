import React from "react";
import { Image, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import MarkFavIcon from "../MarkFavIcon";

export default function PetInfo({ petInfo }) {
  return (
    <View>
      <Image
        source={{ uri: petInfo?.imageUrl }}
        style={{ width: "100%", height: 400, objectFit: "cover" }}
      />

      <View
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontFamily: "delius", fontSize: 27 }}>
            {petInfo?.name}
          </Text>
          <Text
            style={{ fontFamily: "delius", fontSize: 16, color: Colors.GRAY }}
          >
            {petInfo?.address || "No address found."}
          </Text>
        </View>
        <MarkFavIcon petInfo={petInfo} />
      </View>
    </View>
  );
}
