import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Colors from "../../constants/Colors";

export default function AboutPet({ petInfo }) {
  const [readMore, setReadMore] = useState(false);

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <Text
        style={{
          fontFamily: "delius",
          fontSize: 20,
        }}
      >
        About {petInfo?.name}
      </Text>

      <Text
        style={{ fontFamily: "delius", fontSize: 14 }}
        numberOfLines={readMore ? 20 : 3}
      >
        {petInfo?.about || "No data"}
      </Text>

      {readMore && (
        <Pressable onPress={() => setReadMore(true)}>
          <Text style={{ fontSize: 14, color: Colors.SESONDARY }}>
            Read More
          </Text>
        </Pressable>
      )}
    </View>
  );
}
