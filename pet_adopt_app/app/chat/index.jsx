import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { db } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
// import {GiftedChat} from 'react-native-gifted-chat'

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const {user} = useUser()
  const navigation = useNavigation();

  const GetUserDetails = async () => {
    try {
      const docRef = doc(db, "Chat", params?.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const result = docSnap.data();
        console.log("result :", result);

        const receiver = result?.users.filter((item) => item.email !== user?.primaryEmailAddress?.emailAddress)
        navigation.setOptions({
          headerTitle: receiver[0]?.name
        })
      } else {
        console.log("No such chat document.");
      }
    } catch (error) {
      console.log("error in getUserDetails :", error);
    }
  };

  useEffect(() => {
    if (params?.id) {
      GetUserDetails();
    }
  }, [params?.id]);

  return (
    // <GiftedChat></GiftedChat>
    <></>
  );
}
