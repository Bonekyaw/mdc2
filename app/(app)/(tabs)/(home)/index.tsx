import { useEffect, useState, useRef, useCallback } from "react";
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
import {
  fetchProducts,
  updateFavouriteApi,
  // updateProduct,
  // selectProductById,
  selectAllProducts,
} from "@/services/redux/productSlice";
import Toast from "react-native-root-toast";
import type { ProductType } from "@/type";
import { useSession } from "@/providers/ctx";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [select, setSelect] = useState(1);
  const scrollRef = useRef<ScrollView>(null);
  useScrollToTop(scrollRef);
  const router = useRouter();
  const { signOut } = useSession();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    fetchAllProducts(1);
  }, [navigation]);

  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.requiredInfo.categories);
  const products = useAppSelector(selectAllProducts);
  const productsLoading = useAppSelector((state) => state.products.loading);
  const errorStatus = useAppSelector((state) => state.products.error);

  const fetchAllProducts = useCallback(async (id: number) => {
    try {
      await dispatch(fetchProducts(id)).unwrap();
    } catch (error: any) {
      if (error === "Error_Attack") {
        // Error_Attack - Must Log Out
        Toast.show("Long time no see. Please Login again.", {
          duration: Toast.durations.LONG,
        });
        signOut();
      } else Toast.show(error, { duration: Toast.durations.LONG });
    }
  }, []);

  const fetchInfo = useCallback(async () => {
    try {
      await dispatch(fetchRequiredInfo()).unwrap();
    } catch (error: any) {
      if (error === "Error_Attack") {
        // Error_Attack - Must Log Out
        Toast.show("Long time no see. Please Login again.", {
          duration: Toast.durations.LONG,
        });
        signOut();
      } else Toast.show(error, { duration: Toast.durations.LONG });
    }
  }, []);

  const addToFavourite = useCallback(async (id: number, fav: boolean) => {
    try {
      const data = { productId: id, favourite: fav };
      await dispatch(updateFavouriteApi(data)).unwrap();
    } catch (error: any) {
      if (error === "Error_Attack") {
        // Error_Attack - Must Log Out
        Toast.show("Long time no see. Please Login again.", {
          duration: Toast.durations.LONG,
        });
        signOut();
      } else Toast.show(error, { duration: Toast.durations.LONG });
    }
  }, []);

  const goDetail = useCallback((id: number) => {
    router.navigate({ pathname: "/detail", params: { id } });
  }, []);

  const onSelectHandler = useCallback((id: number) => {
    setSelect(id);
    fetchAllProducts(id);
  }, []);

  const onPressScroll = useCallback(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }, []);

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

  // if (productsLoading) {
  //   return <Text>Loading...</Text>;
  // }

  const FakeSkeleton = () => (
    <View style={{ flexDirection: "row", gap: 15 }}>
      <View
        style={{
          width: 200,
          height: 250,
          backgroundColor: "#00000011",
          borderRadius: 10,
        }}
      />
      <View
        style={{
          width: 200,
          height: 250,
          backgroundColor: "#00000011",
          borderRadius: 10,
        }}
      />
    </View>
  );

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
        <Pressable onPress={() => router.navigate("/cart")}>
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
          {productsLoading ? (
            <FakeSkeleton />
          ) : errorStatus ? (
            <View
              style={{ width: "100%", height: 50, justifyContent: "center" }}
            >
              <Text style={{ textAlign: "center" }}>No Product Found.</Text>
            </View>
          ) : products.length > 0 ? (
            <FlashList
              data={products}
              renderItem={({ item }) => (
                <Product
                  {...item}
                  onCallRoute={goDetail}
                  toggleFavourite={addToFavourite}
                />
              )}
              estimatedItemSize={200}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <View
              style={{ width: "100%", height: 50, justifyContent: "center" }}
            >
              <Text style={{ textAlign: "center" }}>No Product Found.</Text>
            </View>
          )}

          <Title title="Popular Lists for You" actionText="See All" />
          {productsLoading ? (
            <FakeSkeleton />
          ) : errorStatus ? (
            <View
              style={{ width: "100%", height: 50, justifyContent: "center" }}
            >
              <Text style={{ textAlign: "center" }}>No Product Found.</Text>
            </View>
          ) : products.length > 0 ? (
            <FlashList
              data={products}
              renderItem={({ item }) => (
                <Product
                  {...item}
                  onCallRoute={goDetail}
                  toggleFavourite={addToFavourite}
                />
              )}
              estimatedItemSize={200}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <View
              style={{ width: "100%", height: 50, justifyContent: "center" }}
            >
              <Text style={{ textAlign: "center" }}>No Product Found.</Text>
            </View>
          )}
        </View>
        <View style={{ marginBottom: 50 }} />
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
