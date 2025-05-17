import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "expo-router";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { db } from "../../config/FirebaseConfig";
import PetListItem from "../../components/Home/PetListItem";
import Colors from "../../constants/Colors";
import { useIsFocused } from "@react-navigation/native";

export default function UserPost() {
  const isFocused = useIsFocused();
  const { user } = useUser();
  const navigation = useNavigation();

  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "User Posts",
    });
    if (user && isFocused) {
      GetUserPosts();
    }
  }, [user, isFocused]);

  const GetUserPosts = async () => {
    setLoading(true);
    try {
      const getPostsQuery = query(
        collection(db, "Pets"),
        where("email", "==", user?.primaryEmailAddress?.emailAddress)
      );
      const querySnapshot = await getDocs(getPostsQuery);
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      setUserPosts(posts);
      setLoading(false);
    } catch (error) {
      setUserPosts([]);
      setLoading(false);
      console.log("error in getUserPosts :", error);
    }
  };

  const handleDeletePost = async (docId) => {
    if (!docId) {
      return;
    }

    Alert.alert(
      "Do you want to Delete ?",
      "Do you really want to delete this record",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel clicked."),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handelDelete(docId),
          style: 'destructive'
        },
      ]
    );
  };

  const handelDelete = async (docId) => {
    if (!docId) {
      return;
    }

    try {
      await deleteDoc(doc(db, "Pets", docId));
      await GetUserPosts();
    } catch (error) {
      console.log("Error in deleting a post ", error);
      Alert.alert("Delete failed", "Something went wrong while deleting the post.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "delius", fontSize: 25 }}>UserPost</Text>

      <FlatList
        data={userPosts}
        numColumns={2}
        renderItem={({ item, index }) => (
          <View>
            <PetListItem petInfo={item} key={index} />
            <Pressable
              style={styles.deleteButton}
              onPress={() => handleDeletePost(item?.id)}
            >
              <Text style={{ fontFamily: "delius", textAlign: "center" }}>
                Delete
              </Text>
            </Pressable>
          </View>
        )}
      />

      {userPosts.length === 0 && <Text>No post were added.</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 5,
    borderRadius: 7,
    marginTop: 5,
    marginRight: 10,
  },
});
