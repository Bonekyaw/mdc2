import { memo } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { IMG_URL } from "@/config";

interface User {
  id: number;
}
interface ProductType {
  id: number;
  categories_id: number;
  brand: string;
  title: string;
  star: number;
  quantity: number;
  price: number;
  discount: number;
  image: any;
  users: User[];
  onCallRoute: (id: number) => void;
  toggleFavourite: (id: number, fav: boolean) => void;
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Product = ({
  id,
  brand,
  title,
  star,
  quantity,
  price,
  discount,
  image,
  users,
  onCallRoute,
  toggleFavourite,
}: ProductType) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onCallRoute(id)}
        style={{ position: "relative" }}
      >
        {/* <ImageBackground
          source={{ uri: IMG_URL + image }}
          style={styles.imageView}
          imageStyle={styles.image}
        >
          <Pressable>
            <View style={styles.heartContainer}>
              <Ionicons name="heart" size={18} color="#E66F2D" />
            </View>
          </Pressable>
        </ImageBackground> */}
        <Image
          style={styles.imageExpo}
          source={{ uri: IMG_URL + image }}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <Pressable
          style={{ position: "absolute", top: 0, right: 0 }}
          onPress={() => toggleFavourite(id, users.length == 0)}
        >
          <View style={styles.heartContainer}>
            <Ionicons
              name={users.length > 0 ? "heart" : "heart-outline"}
              size={18}
              color="#E66F2D"
            />
          </View>
        </Pressable>
      </Pressable>
      <View style={styles.brandContainer}>
        <Text style={styles.brand}>{brand}</Text>
        <Ionicons name="star" size={12} color="orange" />
        <Text style={styles.star}>{star}</Text>
        <Text style={styles.quantity}>({quantity})</Text>
      </View>
      <Text style={styles.title}>
        {title.length > 25 ? title.substring(0, 25) + "..." : title}
      </Text>
      <View style={styles.brandContainer}>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        {discount > 0 && (
          <Text style={styles.discount}>${discount.toFixed(2)}</Text>
        )}
      </View>
    </View>
  );
};

export default memo(Product);

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
  },
  imageView: {
    width: 200,
    height: 250,
    resizeMode: "cover",
    alignItems: "flex-end",
  },
  image: {
    borderRadius: 5,
  },
  imageExpo: {
    width: 200,
    height: 250,
    borderRadius: 5,
  },
  heartContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#00000015",
    marginTop: 12,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
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
});
