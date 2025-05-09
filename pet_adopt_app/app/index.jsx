import { useUser } from "@clerk/clerk-expo";
import { Link, Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const { user } = useUser();
  // console.log('user :', user)
  return (
    <View
    // style={{
    //   flex: 1,
    //   justifyContent: "center",
    //   alignItems: "center",
    // }}
    >
      {user ? <Redirect href={'/(tabs)/home'} /> : <Redirect href={'/login'} />}
    </View>
  );
}
