import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import PetInfo from "../../components/PetDetails/PetInfo";
import PetSubInfo from "../../components/PetDetails/PetSubInfo";
import AboutPet from "../../components/PetDetails/AboutPet";
import OwnerInfo from "../../components/PetDetails/OwnerInfo";
import Colors from "../../constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";

export default function PetDetails() {
  const { user } = useUser();
  const router = useRouter();
  const petInfo = useLocalSearchParams();
  // console.log('petInfo', petInfo)
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  const InitiateChat = async () => {
    setLoading(true);
    const docId1 = `${user.primaryEmailAddress.emailAddress}_${petInfo.email}`;
    const docId2 = `${petInfo.email}_${user.primaryEmailAddress.emailAddress}`;

    try {
      const chatQuery = query(
        collection(db, "Chat"),
        where("id", "in", [docId1, docId2])
      );

      const chatSnapshot = await getDocs(chatQuery);
      // console.log('chatSnapshot :', chatSnapshot)

      if (!chatSnapshot.empty) {
        console.log("Chat already exists:", chatSnapshot.docs[0].data());
        router.push({
          pathname: "/chat",
          params: { id: docId1 },
        });
        setLoading(false);
      } else {
        const chatDocRef = doc(db, "Chat", docId1);
        await setDoc(chatDocRef, {
          id: docId1,
          users: [
            {
              email: user?.primaryEmailAddress?.emailAddress || null,
              imageUrl: user?.imageUrl || null,
              name: user?.fullName || null,
            },
            {
              email: petInfo?.email || null,
              imageUrl: petInfo?.userImage || null,
              name: petInfo?.username || null,
            },
          ],
          createdAt: new Date().toISOString(),
        });
        console.log("created a chat with :", docId1);
        setLoading(false);
        router.push({
          pathname: "/chat",
          params: { id: docId1 },
        });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error in initiating a chat :", error);
    }
  };

  return (
    <View>
      <ScrollView>
        {/* Pet info */}
        <PetInfo petInfo={petInfo} />

        {/* Pet details */}
        <PetSubInfo petInfo={petInfo} />

        {/* about */}
        <AboutPet petInfo={petInfo} />

        {/* owner details */}
        <OwnerInfo petInfo={petInfo} />
        <View style={{ height: 70 }}></View>
      </ScrollView>

      {/* adopt me button  */}
      <View style={{ position: "absolute", width: "100%", bottom: 0 }}>
        <TouchableOpacity
          style={{ padding: 15, backgroundColor: Colors.PRIMARY }}
          onPress={InitiateChat}
        >
          <Text
            style={{ textAlign: "center", fontFamily: "delius", fontSize: 20 }}
          >
            Adopt Me
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
