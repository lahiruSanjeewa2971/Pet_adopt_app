import { Image, Pressable, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import { useCallback, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useAuth } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import { useSSO } from "@clerk/clerk-expo";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startSSOFlow } = useSSO();

  const onPress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          redirectUrl: Linking.createURL("/(tabs)/home", { scheme: "myapp" }),
        });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        await setActive({ session: createdSessionId });
        console.log("Session activated successfully");
      } else {
        console.warn("No session created");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

  return (
    <View style={{ backgroundColor: Colors.WHITE, height: "100%" }}>
      <Image
        source={{
          uri: "https://plus.unsplash.com/premium_vector-1721985703466-0e6a7f83486a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fHww",
        }}
        style={{ width: "100%", height: 500 }}
      />
      <View style={{ padding: 20, display: "flex", alignItems: "center" }}>
        <Text
          style={{ fontFamily: "delius", fontSize: 20, textAlign: "center" }}
        >
          Ready to make a new friend?
        </Text>
        <Text style={{ fontSize: 15, textAlign: "center", color: Colors.GRAY }}>
          Let's adopt the pet which you like and make there life happy again.
        </Text>

        <Pressable
          onPress={onPress}
          style={{
            padding: 14,
            marginTop: 100,
            backgroundColor: Colors.PRIMARY,
            width: "100%",
            borderRadius: 14,
          }}
        >
          <Text
            style={{
              fontFamily: "delius",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Get started
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
