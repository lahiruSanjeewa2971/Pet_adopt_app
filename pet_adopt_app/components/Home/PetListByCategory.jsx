import { FlatList, Text, View } from "react-native";
import Category from "./Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { useState, useEffect } from "react";
import PetListItem from "./PetListItem";

export default function PetListByCategory() {
  const [fetchedPetList, setFetchedPetList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Dogs");
  const [categoryDataLoading, setCategoryDataLoading] = useState(false);

  // Get pets based on selected category
  const getPetsListByCategory = async (category) => {
    setCategoryDataLoading(true);
    const categoryToQuery = category?.trim() ? category : "Dogs";
    try {
      const categoryData = query(
        collection(db, "Pets"),
        where("category", "==", categoryToQuery)
      );
      const queryResponse = await getDocs(categoryData);
      const fetchedData = queryResponse.docs.map((doc) => doc.data());
      setFetchedPetList(fetchedData);
      setCategoryDataLoading(false);
    } catch (error) {
      setFetchedPetList([]);
      setCategoryDataLoading(false);
      console.log("error in category data loading :", error);
    }
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
          refreshing={categoryDataLoading}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <PetListItem petInfo={item} />}
          style={{ marginTop: 10 }}
        />
      ) : (
        <Text style={{ marginTop: 10, fontFamily: "delius" }}>
          No pets found for this category.
        </Text>
      )}
    </View>
  );
}
