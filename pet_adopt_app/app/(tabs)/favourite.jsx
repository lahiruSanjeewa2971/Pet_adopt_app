import { FlatList, Text, View } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { GetFavList } from "../../Shared";
import { doc, getDoc } from "firebase/firestore";
import PetListItem from "../../components/Home/PetListItem";
import { db } from "../../config/FirebaseConfig";

export default function Favourite() {
  const { user } = useUser();

  const [userFavPetIDs, setUserFavPetIDs] = useState([]);
  const [userFavPetDetails, setUserFavPetDetails] = useState([]);
  const [makeListRefresh, setMakeListRefresh] = useState(false);

  useEffect(() => {
    if (user) {
      getUserFavPets();
    }
  }, [user]);

  const getUserFavPets = async () => {
    setMakeListRefresh(true);
    const response = await GetFavList(user);
    // console.log("fav list :", response?.favourites);
    setUserFavPetIDs(response?.favourites ? response?.favourites : []);
    setMakeListRefresh(false);
    getPetDetailsById(response?.favourites);
  };

  const getPetDetailsById = async (idList) => {
    try {
      /**
       |--------------------------------------------------
       | this whole pain is caused by not storing the document id in every single Pet,
       | when adding a pet by the system, add it to that single pet details and change this logic also.
       |--------------------------------------------------
       */
      setMakeListRefresh(true);
      const data = idList.map((id) => getDoc(doc(db, "Pets", id)));
      const docs = await Promise.all(data);
      const petDetails = docs
        .filter((doc) => doc.exists())
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      setUserFavPetDetails(petDetails);
      setMakeListRefresh(false);
      // console.log("petDetails:", petDetails);
    } catch (error) {
      setMakeListRefresh(false);
      setUserFavPetDetails([]);
      console.log("error in getPetDetailsById :", error);
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: "delius", fontSize: 30 }}>Favourite</Text>

      <FlatList
        data={userFavPetDetails}
        numColumns={2}
        onRefresh={getUserFavPets}
        refreshing={makeListRefresh}
        renderItem={({ item, index }) => (
          <View>
            <PetListItem petInfo={item} />
          </View>
        )}
      />
    </View>
  );
}
