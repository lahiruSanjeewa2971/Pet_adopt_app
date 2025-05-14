import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

export const GetFavList = async (user) => {
  const docSnap = await getDoc(
    doc(db, "UserFavPets", user?.primaryEmailAddress?.emailAddress)
  );
  if (docSnap?.exists()) {
    return docSnap?.data();
  } else {
    await setDoc(
      doc(db, "UserFavPets", user?.primaryEmailAddress?.emailAddress),
      {
        email: user?.primaryEmailAddress?.emailAddress,
        favourites: [],
      }
    );
  }
};

export const UpdateFavDocument = async (user, favourites) => {
  const docRef = doc(
    db,
    "UserFavPets",
    user?.primaryEmailAddress?.emailAddress
  );

  try {
    await updateDoc(docRef, {
      favourites: favourites,
    });
  } catch (error) {
    console.log("error in updating user fav list");
  }
};
