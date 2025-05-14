import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import PetInfo from "../../components/PetDetails/PetInfo";
import PetSubInfo from "../../components/PetDetails/PetSubInfo";
import AboutPet from "../../components/PetDetails/AboutPet";
import OwnerInfo from "../../components/PetDetails/OwnerInfo";

export default function PetDetails() {
  const petInfo = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  return (
    <View>
      <ScrollView>
        {/* Pet info */}
        <PetInfo petInfo={petInfo} />

        {/* Pet details */}
        <PetSubInfo petInfo={petInfo} />

        {/* about */}
        <AboutPet petInfo={petInfo} />

        {/* owner details */}
        <OwnerInfo petInfo={petInfo} />
        <View style={{height: 70}}></View>
      </ScrollView>

      {/* adopt me button  */}
    </View>
  );
}
