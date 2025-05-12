import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "../../config/FirebaseConfig";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Colors from "../../constants/Colors";

export default function Category() {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Dogs");

  useEffect(() => {
    GetCategories();
  }, []);

  const GetCategories = async () => {
    try {
      const GetCategoriesList = await getDocs(collection(db, "Category"));
      const categoryData = GetCategoriesList.docs.map((doc) => doc.data());
      setCategoryList(categoryData);
    } catch (error) {
      setCategoryList([]);
      console.log("error in category fetching ", error);
    }
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: "delius", fontSize: 20 }}>Category</Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index} style={{ flex: 1 }} onPress={() => setSelectedCategory(item?.name)} >
            <View
              style={[
                styles.container,
                selectedCategory == item?.name &&
                  styles.selectedCategoryContainer,
              ]}
            >
              <Image
                source={{ uri: item?.imageUrl }}
                style={{ width: 40, height: 40, borderRadius: 99 }}
              />
            </View>
            <Text style={{ textAlign: "center", fontFamily: "delius" }}>
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.PRIMARY,
    margin: 5,
  },
  selectedCategoryContainer: {
    backgroundColor: Colors.SESONDARY,
  },
});
