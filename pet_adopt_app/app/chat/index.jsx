import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { db } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { GiftedChat } from "react-native-gifted-chat";

export default function Chat() {
  const params = useLocalSearchParams();
  const { user } = useUser();
  const navigation = useNavigation();

  const [messages, setMessages] = useState([]);
  const [receiverName, setReceiverName] = useState(null);

  const onSend = async (messages) => {};

  const GetUserDetails = async () => {
    try {
      const docRef = doc(db, "Chat", params?.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const result = docSnap.data();
        console.log("result :", result);

        const receiver = result?.users.filter(
          (item) => item.email !== user?.primaryEmailAddress?.emailAddress
        );
        if (receiver?.[0]?.name && receiver[0].name !== receiverName) {
          setReceiverName(receiver[0].name);
        }
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

  useEffect(() => {
    if (receiverName) {
      navigation.setOptions({
        headerTitle: receiverName,
      });
    }
  }, [receiverName]);

  return (
    <View>
      <Text>Chat Screen Loaded</Text>;
    </View>
  );

  // return (
  //   <GiftedChat
  //     messages={messages}
  //     onSend={onSend}
  //     user={{
  //       _id: 1,
  //     }}
  //   />
  // );
}
