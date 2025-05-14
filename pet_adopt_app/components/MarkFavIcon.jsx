import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GetFavList, UpdateFavDocument } from "../Shared";
import { useUser } from "@clerk/clerk-expo";

export default function MarkFavIcon({ petInfo }) {
  const { user } = useUser();

  const [userFavPets, setUserFavPets] = useState([]);

  useEffect(() => {
    // console.log("pet info ", petInfo);
    if (user) {
      getFavListFromDB();
    }
  }, [user]);

  const getFavListFromDB = async () => {
    const userFavList = await GetFavList(user);
    // console.log("userFavList :", userFavList);
    setUserFavPets(userFavList?.favourites ? userFavList?.favourites : []);
  };

  const addToFav = async () => {
    if (!userFavPets.includes(petInfo?.id)) {
      const newFavList = [...userFavPets, petInfo?.id];
      await UpdateFavDocument(user, newFavList);
      getFavListFromDB();
    }
  };

  const removeFromFav = async () => {
    const newFavList = userFavPets.filter((item) => item !== petInfo?.id);
    // console.log("newFavList ", newFavList);
    await UpdateFavDocument(user, newFavList);
    getFavListFromDB();
  };

  return (
    <View>
      {userFavPets?.includes(petInfo?.id) ? (
        <Pressable onPress={() => removeFromFav()}>
          <Ionicons name="heart" size={30} color="red" />
        </Pressable>
      ) : (
        <Pressable onPress={() => addToFav()}>
          <Ionicons name="heart-outline" size={30} color="black" />
        </Pressable>
      )}
    </View>
  );
}
