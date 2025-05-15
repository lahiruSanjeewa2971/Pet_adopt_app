import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import PetListByCategory from "../../components/Home/PetListByCategory";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "../../constants/Colors";
import { Link } from "expo-router";

const Home = () => {
  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      {/* Header */}
      <Header />

      {/* Slider */}
      <Slider />

      {/* Category */}
      <PetListByCategory />

      {/* Add new pet option */}
      <Link
        href={"/add-new-pet"}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          textAlign: "center",
          padding: 20,
          marginTop: 20,
          backgroundColor: Colors.LIGHT_PRIMARY,
          borderWidth: 1,
          borderColor: Colors.PRIMARY,
          borderRadius: 15,
          borderStyle: "dashed",
          justifyContent: "center",
        }}
      >
        <MaterialIcons name="pets" size={24} color={Colors.PRIMARY} />
        <Text
          style={{ fontFamily: "delius", color: Colors.PRIMARY, fontSize: 18 }}
        >
          Add New Pet
        </Text>
      </Link>
    </View>
  );
};

export default Home;
