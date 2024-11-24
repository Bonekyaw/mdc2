import { useState, useRef, useMemo, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomSheet, {
  BottomSheetFlashList,
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Picker } from "@react-native-picker/picker";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { products } from "@/data";
import Cart from "@/components/shop/Cart";
import ViewPager from "@/components/shop/ViewPager";
// import { useAppSelector } from "@/hooks/useRedux";
import type { ColorType } from "@/type";
import type { SizeType } from "@/type";

const { width, height } = Dimensions.get("window");
const Detail = () => {
  const { id } = useLocalSearchParams();
  const product = products.find((product) => product.id === id);
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "75%", "100%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const openSheet = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };

  const ColorBox = ({ id, name, bgColor, stock }: ColorType) => (
    <Pressable
      onPress={openSheet}
      style={[
        styles.circle,
        { backgroundColor: bgColor, borderWidth: 0.2, borderColor: "gray" },
      ]}
    >
      <Ionicons
        name="checkmark"
        size={19}
        color={stock ? (bgColor === "#ffffff" ? "black" : "white") : bgColor}
      />
    </Pressable>
  );

  const SizeBox = ({ id, name, stock }: SizeType) => (
    <Pressable
      onPress={openSheet}
      style={[
        styles.circle,
        stock
          ? { backgroundColor: "gray" }
          : { borderWidth: 1, borderColor: "gray" },
      ]}
    >
      <Text
        style={[
          { fontSize: 10, fontWeight: "600" },
          stock && { color: "white" },
        ]}
      >
        {name}
      </Text>
    </Pressable>
  );

  return (
    <View>
      <Stack.Screen
        options={{
          headerTitle: "Product Detail",
          headerBackTitle: "Home",
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "black",
          headerRight: () => (
            <Pressable>
              <Cart />
            </Pressable>
          ),
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <ViewPager />
        <View style={styles.detailContainer}>
          <View style={styles.row}>
            <View style={styles.brandContainer}>
              <Text style={styles.brand}>{product?.brand}</Text>
              <Ionicons name="star" size={12} color="orange" />
              <Text style={styles.star}>{product?.star}</Text>
              <Text style={styles.quantity}>({product?.quantity})</Text>
            </View>
            <Pressable>
              <Ionicons
                name={product?.favourite ? "heart" : "heart-outline"}
                size={20}
                color="#E66F2D"
                style={{ paddingTop: 2 }}
              />
            </Pressable>
          </View>
          <Text style={styles.title}>{product?.title}</Text>
          <View style={styles.brandContainer}>
            <Text style={styles.price}>${product?.price.toFixed(2)}</Text>
            <Text style={styles.discount}>${product?.discount.toFixed(2)}</Text>
          </View>
          <Text style={styles.description}>{product?.description}</Text>
          <View
            style={
              width > 600
                ? { flexDirection: "row", gap: 40 }
                : { flexDirection: "column" }
            }
          >
            <View>
              <Text style={styles.boxTitle}>Choose Colors</Text>
              <View style={styles.box}>
                {product?.colors.map((color) => (
                  <ColorBox key={color.id} {...color} />
                ))}
              </View>
            </View>
            <View>
              <Text style={styles.boxTitle}>Sizes</Text>
              <View style={styles.box}>
                {product?.sizes.map((size) => (
                  <SizeBox key={size.id} {...size} />
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        <Pressable style={styles.button}>
          <Ionicons name="cart-outline" size={20} color="balck" />
          <Text style={styles.btnText}>ADD TO CART</Text>
        </Pressable>
        <Pressable style={[styles.button, { backgroundColor: "black" }]}>
          <Text style={[styles.btnText, { color: "white" }]}>BUY NOW</Text>
        </Pressable>
      </View>
      {/* <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheet
          index={-1}
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose
          backgroundStyle={{ backgroundColor: "white" }}
          //handleIndicatorStyle={{ backgroundColor: "white" }}
          onChange={handleSheetChanges}
          //enableDynamicSizing={false}
        >
          <BottomSheetView>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView> */}
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "white",
  },
  detailContainer: {
    marginTop: 17,
    marginHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  brandContainer: {
    flexDirection: "row",
    marginTop: 7,
  },
  brand: {
    color: "gray",
    fontWeight: "600",
    marginRight: 7,
  },
  star: {
    marginHorizontal: 2,
    fontSize: 13,
  },
  quantity: {
    color: "gray",
    fontSize: 13,
  },
  title: {
    marginVertical: 5,
    fontSize: 15,
    fontWeight: "500",
  },
  priceContainer: {
    flexDirection: "row",
  },
  price: {
    color: "#007618",
    fontSize: 15,
    fontWeight: "500",
    marginRight: 7,
  },
  discount: {
    color: "gray",
    textDecorationLine: "line-through",
  },
  description: {
    marginTop: 15,
    lineHeight: 22,
    opacity: 0.7,
  },
  boxTitle: {
    fontSize: 13,
    marginTop: 17,
    marginBottom: 10,
  },
  box: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 17,
  },
  button: {
    width: width / 2.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    borderWidth: 0.7,
    paddingVertical: 11,
    paddingHorizontal: 25,
    borderRadius: 7,
    backgroundColor: "white",
  },
  btnText: {
    fontWeight: "700",
    color: "black",
  },
});
