import React from "react";
import { Image, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import PetSubInfoCard from "./PetSubInfoCard";

export default function PetSubInfo({ petInfo }) {
  return (
    <View style={{ padding: 20 }}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <PetSubInfoCard
          icon={require("../../assets/images/calendar.png")}
          title={""}
          value={""}
        />
        <PetSubInfoCard
          icon={require("../../assets/images/bone.png")}
          title={""}
          value={""}
        />
      </View>
    </View>
  );
}
