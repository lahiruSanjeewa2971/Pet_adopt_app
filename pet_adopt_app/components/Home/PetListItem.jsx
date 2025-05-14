import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function PetListItem({ petInfo }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/pet-details",
          params: petInfo,
        })
      }
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

      <Text style={{ fontFamily: "delius", fontSize: 18 }}>
        {petInfo?.name}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: Colors.GRAY, fontFamily: "delius" }}>
          {petInfo?.breed}
        </Text>
        <Text
          style={{
            fontFamily: "delius",
            color: Colors.PRIMARY,
            backgroundColor: Colors.LIGHT_PRIMARY,
            paddingHorizontal: 7,
            borderRadius: 10,
            fontSize: 11,
          }}
        >
          {petInfo?.age} YRS
        </Text>
      </View>
    </TouchableOpacity>
  );
}
