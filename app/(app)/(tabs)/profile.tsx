import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSession } from "@/providers/ctx";
import { router } from "expo-router";

const Profile = () => {
  const { signOut } = useSession();
  return (
    <SafeAreaView>
      <Text>Profile Screen</Text>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      >
        Sign Out
      </Text>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
