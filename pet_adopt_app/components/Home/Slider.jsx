import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { db } from "../../config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    GetSliderData();
  }, []);

  const GetSliderData = async () => {
    setSliderList([]);
    const snapshot = await getDocs(collection(db, "Sliders"));
    snapshot.forEach((singleDoc) => {
      //   console.log("singleDoc", singleDoc.data());
      setSliderList((sliderList) => [...sliderList, singleDoc.data()]);
    });
  };

  return (
    <View style={{ marginTop: 15 }}>
      <FlatList
        data={sliderList}
        horizontal
        pagingEnabled
        snapToAlignment="start"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ width: Dimensions.get("window").width }}>
            <Image
              source={{ uri: item?.imageUrl }}
              style={style?.sliderImage}
            />
          </View>
        )}
      />
    </View>
  );
}

const style = StyleSheet.create({
  sliderImage: {
    width: Dimensions.get("screen").width * 0.9,
    height: 160,
    borderRadius: 14,
    marginRight: 14,
  },
});
