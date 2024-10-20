import { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";

import { API_URL } from "@/config";
import { User } from "@/type";

export default function ExploreScreen() {
  const navigation = useNavigation();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    getUsers();
  }, [navigation]);

  const getUsers = async () => {
    try {
      const response = await fetch(API_URL + "users");
      if (!response.ok) {
        throw new Error(`Resquest failed due to ${response.status}`);
      }
      const resJson = await response.json();
      // console.log("Response : ", resJson);
      setUsers(resJson);
    } catch (error) {
      console.warn("Internet connection lost!");
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Hello</Text>
        <Text style={styles.content}>Hello from explore screen</Text>
        {users.map((user) => <Text key={user.id}>{user.name}</Text>)}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "green",
  },
  content: {
    fontSize: 20,
  },
});
