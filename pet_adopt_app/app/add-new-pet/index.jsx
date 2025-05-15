import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "../../constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "../../config/FirebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddNewPet() {
  const navigation = useNavigation();
  const { user } = useUser();

  const [formData, setFormData] = useState({ category: "Dogs", sex: "Male" });
  const [gender, setGender] = useState("null");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Dogs");
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Pet",
    });
    GetCategories();
  }, []);

  const handleInputChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const uploadImageToFirebaseStorage = async () => {
    setLoading(true);
    console.log("uploadImageToFirebaseStorage");
    try {
      const response = await fetch(image);
      const blobImage = await response.blob();

      const storageRef = ref(storage, "/PetAdoptApp/" + Date.now() + ".jpg");

      // Upload image
      const snapshot = await uploadBytes(storageRef, blobImage);
      console.log("File uploaded");

      // Get download URL
      const downloadUrl = await getDownloadURL(storageRef);
      //   console.log("Download URL:", downloadUrl);

      return downloadUrl;
    } catch (error) {
      setLoading(false);
      console.log("Error in uploadImageToFirebaseStorage:", error);
    }
  };

  const handleOnSubmit = async () => {
    if (Object.keys(formData).length != 8) {
      ToastAndroid.show("Enter All Details.", ToastAndroid.SHORT);
      return;
    }
    try {
      const downloadUrl = await uploadImageToFirebaseStorage(); // ✅ await here
      if (downloadUrl) {
        console.log("Image successfully uploaded. URL:", downloadUrl);

        const docId = Date.now().toString();
        await setDoc(doc(db, "Pets", docId), {
          ...formData,
          imageUrl: downloadUrl,
          username: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          userImage: user?.imageUrl,
          id: docId,
        }).catch((err) => {
          console.log("Firebase setDoc error :", err);
          ToastAndroid.show("Failed to submit record", ToastAndroid.SHORT);
        });
        ToastAndroid.show("Submitted successfully!", ToastAndroid.SHORT);
        setLoading(false);
      } else {
        ToastAndroid.show("Image upload failed.", ToastAndroid.SHORT);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error in handleOnSubmit:", error);
      ToastAndroid.show("Something went wrong.", ToastAndroid.SHORT);
    }
  };

  const imagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontFamily: "delius", fontSize: 20 }}>
        Add New Pet for adoption.
      </Text>

      <Pressable
        onPress={imagePicker}
        style={{
          borderWidth: 2,
          borderRadius: 15,
          width: 100,
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderColor: Colors.GRAY,
          overflow: "hidden",
        }}
      >
        {!image ? (
          <MaterialIcons name="pets" size={40} color={Colors.GRAY} />
        ) : (
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </Pressable>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange("name", text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Category *</Text>
        <Picker
          selectedValue={selectedCategory}
          style={{
            // padding: 5,
            backgroundColor: Colors.WHITE,
            borderRadius: 15,
            fontFamily: "delius",
          }}
          onValueChange={(itemValue) => {
            setSelectedCategory(itemValue);
            handleInputChange("category", itemValue);
          }}
        >
          {categoryList.map((category, index) => (
            <Picker.Item
              label={category.name}
              value={category.name}
              key={index}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput
          style={styles.input}
          //   onChange={(value) => handleInputChange("breed", value)}
          onChangeText={(text) => handleInputChange("breed", text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          //   onChange={(value) => handleInputChange("age", value)}
          onChangeText={(text) => handleInputChange("age", text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender *</Text>
        <Picker
          selectedValue={gender}
          style={{
            // padding: 5,
            backgroundColor: Colors.WHITE,
            borderRadius: 15,
            fontFamily: "delius",
          }}
          onValueChange={(itemValue) => {
            setGender(itemValue);
            handleInputChange("sex", itemValue);
          }}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          //   onChange={(value) => handleInputChange("weight", value)}
          onChangeText={(text) => handleInputChange("weight", text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          style={styles.input}
          //   onChange={(value) => handleInputChange("address", value)}
          onChangeText={(text) => handleInputChange("address", text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput
          style={styles.input}
          numberOfLines={5}
          multiline={true}
          //   onChange={(value) => handleInputChange("about", value)}
          onChangeText={(text) => handleInputChange("about", text)}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleOnSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <Text
            style={{ fontFamily: "delius", fontSize: 20, textAlign: "center" }}
          >
            Submit
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    fontFamily: "delius",
  },
  label: {
    marginVertical: 5,
    fontFamily: "delius",
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginVertical: 30,
    marginBottom: 50,
  },
});
