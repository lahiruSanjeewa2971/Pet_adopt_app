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
          title={"Age"}
          value={petInfo?.age + " Years"}
        />
        <PetSubInfoCard
          icon={require("../../assets/images/bone.png")}
          title={"Breed"}
          value={petInfo?.breed}
        />
      </View>

      <View style={{ display: "flex", flexDirection: "row" }}>
        <PetSubInfoCard
          icon={require("../../assets/images/sex.png")}
          title={"Sex"}
          value={petInfo?.sex || 'Male'}
        />
        <PetSubInfoCard
          icon={require("../../assets/images/weight.png")}
          title={"Weight"}
          value={petInfo?.weight || ''}
        />
      </View>
    </View>
  );
}
