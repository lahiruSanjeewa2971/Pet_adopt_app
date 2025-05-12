import { FlatList, Text, View } from "react-native";
import Category from "./Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { useState, useEffect } from "react";
import PetListItem from "./PetListItem";

export default function PetListByCategory() {
  const [fetchedPetList, setFetchedPetList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Dogs");

  // Get pets based on selected category
  const getPetsListByCategory = async (category) => {
    const categoryToQuery = category?.trim() ? category : "Dogs";
    const categoryData = query(
      collection(db, "Pets"),
      where("category", "==", categoryToQuery)
    );
    const queryResponse = await getDocs(categoryData);
    const fetchedData = queryResponse.docs.map((doc) => doc.data());
    setFetchedPetList(fetchedData);
  };

  useEffect(() => {
    getPetsListByCategory(selectedCategory);
  }, [selectedCategory]);

  return (
    <View>
      <Category getPetsListByCategory={(value) => setSelectedCategory(value)} />

      {fetchedPetList.length > 0 ? (
        <FlatList
          data={fetchedPetList}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <PetListItem petInfo={item} />}
        />
      ) : (
        <Text>No pets found for this category.</Text>
      )}
    </View>
  );
}
