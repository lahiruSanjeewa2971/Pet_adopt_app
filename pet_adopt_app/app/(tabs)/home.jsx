import React from "react";
import { Text, View } from "react-native";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import PetListByCategory from "../../components/Home/PetListByCategory";

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
    </View>
  );
};

export default Home;
