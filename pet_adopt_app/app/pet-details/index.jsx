import React, { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import PetInfo from "../../components/PetDetails/PetInfo";
import PetSubInfo from "../../components/PetDetails/PetSubInfo";
import AboutPet from "../../components/PetDetails/AboutPet";
import OwnerInfo from "../../components/PetDetails/OwnerInfo";
import Colors from "../../constants/Colors";

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
      <View style={{position: 'absolute', width: '100%', bottom: 0}}>
        <TouchableOpacity style={{padding: 15, backgroundColor: Colors.PRIMARY}}>
          <Text style={{textAlign: 'center', fontFamily: 'delius', fontSize: 20}}>Adopt Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
