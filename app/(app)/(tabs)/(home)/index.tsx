import { useEffect, useState, useRef } from "react";
import { Text, StyleSheet, View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useNavigation, useRouter } from "expo-router";
import { Image } from "expo-image";
import { useScrollToTop } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import Cart from "@/components/shop/Cart";
import Title from "@/components/shop/Title";
import { products } from "@/data";
import { FlashList } from "@shopify/flash-list";
import Category from "@/components/shop/Category";
import Product from "@/components/shop/Product";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { fetchRequiredInfo } from "@/services/redux/requiredInfoSlice";
import Toast from "react-native-root-toast";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [select, setSelect] = useState("uuid1");
  const scrollRef = useRef<ScrollView>(null);
  useScrollToTop(scrollRef);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.requiredInfo.categories);

  const fetchInfo = async () => {
    try {
      await dispatch(fetchRequiredInfo()).unwrap();
    } catch (error: any) {
      Toast.show(error, { duration: Toast.durations.LONG });
    }
  };

  if (categories.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Data Request has failed!</Text>
        <Pressable style={styles.btnError} onPress={fetchInfo}>
          <Text>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const onSelectHandler = (id: string) => {
    setSelect(id);
  };

  const productsList = products.filter(
    (product) => product.categories_id === select
  );

  const onPressScroll = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const goDetail = (id: string) => {
    router.navigate({ pathname: "/detail", params: { id } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <StatusBar style="dark" />
        <Pressable onPress={onPressScroll}>
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
      <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
        <Image
          source={require("@/assets/images/banner6.png")}
          placeholder={{ blurhash }}
          style={styles.banner}
          contentFit="cover"
          transition={1000}
        />
        <View style={{ paddingLeft: 20 }}>
          <Title title="Shop By Category" actionText="See All" />
          <FlashList
            data={categories}
            extraData={select}
            renderItem={({ item }) => (
              <Category {...item} onSelect={onSelectHandler} select={select} />
            )}
            estimatedItemSize={80}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <Title title="Recommended for You" actionText="See All" />
          <FlashList
            data={productsList}
            renderItem={({ item }) => (
              <Product {...item} onCallRoute={goDetail} />
            )}
            estimatedItemSize={200}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <Title title="Popular Lists for You" actionText="See All" />
          <FlashList
            data={productsList}
            renderItem={({ item }) => (
              <Product {...item} onCallRoute={goDetail} />
            )}
            estimatedItemSize={200}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
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
  btnError: {
    marginTop: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 5,
  },
});
