import { useAuth, useUser } from "@clerk/clerk-expo";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, useRouter } from "expo-router";

export default function Profile() {
  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useAuth();

  const Menu = [
    { id: 1, name: "Add New Pet", icon: "add-circle", path: "/add-new-pet" },
    { id: 2, name: "My Posts", icon: "bookmark", path: "/user-post" },
    { id: 3, name: "Favourites", icon: "heart", path: "/(tabs)/favourite" },
    { id: 4, name: "Inbox", icon: "chatbubble", path: "/(tabs)/inbox" },
    { id: 5, name: "Logout", icon: "exit", path: "logout" },
  ];

  const handleOnPress = (menuItem) => {
    // console.log(menuItem)
    if (menuItem.name == "Logout") {
      signOut();
      // <Redirect href={'/login'} />
      router.replace("/login");
      return;
    }
    router.push(menuItem.path);
  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: "delius", fontSize: 30 }}>Profile</Text>

      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginVertical: 25,
          gap: 5,
        }}
      >
        <Image
          style={{ width: 80, height: 80, borderRadius: 99 }}
          source={{ uri: user?.imageUrl }}
        />

        <Text style={{ fontFamily: "delius", fontSize: 20 }}>
          {user?.fullName}
        </Text>
        <Text
          style={{ fontFamily: "delius", fontSize: 16, color: Colors.GRAY }}
        >
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>

      <FlatList
        data={Menu}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            style={{
              marginVertical: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: Colors.WHITE,
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => handleOnPress(item)}
          >
            <Ionicons
              name={item.icon}
              size={30}
              color={Colors.PRIMARY}
              style={{
                padding: 10,
                backgroundColor: Colors.LIGHT_PRIMARY,
                borderRadius: 8,
              }}
            />
            <Text style={{ fontFamily: "delius", fontSize: 20 }}>
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
