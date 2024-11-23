import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { products } from "@/data";
import Cart from "@/components/shop/Cart";
import ViewPager from "@/components/shop/ViewPager";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppSelector } from "@/hooks/useRedux";
import type { ColorType, SizeType } from "@/type";
const Detail = () => {
  const { id } = useLocalSearchParams();
  const product = products.find((product) => product.id === id);
  const { colors, sizes }: { colors: ColorType[]; sizes: SizeType[] } =
    useAppSelector((state) => state.requiredInfo);

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
      <ScrollView showsVerticalScrollIndicator={false}>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
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
});
