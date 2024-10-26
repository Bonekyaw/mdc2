import { useEffect, useState } from "react";
import { Text, StyleSheet, View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useNavigation } from "expo-router";
import { Image } from "expo-image";

import Cart from "@/components/shop/Cart";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function HomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable>
          <Image
            source={require("@/assets/images/n.png")}
            placeholder={{ blurhash }}
            style={styles.logo}
            contentFit="cover"
            transition={1000}
          />
        </Pressable>
        <Pressable>
          <Cart />
        </Pressable>
      </View>
      <ScrollView>
        <Image
          source={require("@/assets/images/banner6.png")}
          placeholder={{ blurhash }}
          style={styles.banner}
          contentFit="cover"
          transition={1000}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 25,
    // marginLeft: 15,
  },
  banner: {
    width: "100%",
    aspectRatio: 20 / 9,
  },
});
