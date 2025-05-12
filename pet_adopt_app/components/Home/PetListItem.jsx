import React from "react";
import { Image, Text, View } from "react-native";
import Colors from "../../constants/Colors";

export default function PetListItem({ petInfo }) {
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
      }}
    >
      <Image
        source={{ uri: petInfo?.imageUrl }}
        style={{
          width: 150,
          height: 135,
          objectFit: "cover",
          borderRadius: 10,
        }}
      />

      <Text style={{fontFamily: 'delius', fontSize: 18}}>{petInfo?.name}</Text>
    </View>
  );
}
