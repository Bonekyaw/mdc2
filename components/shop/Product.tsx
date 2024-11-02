import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ProductType {
  id: string;
  categories_id: string;
  brand: string;
  title: string;
  star: number;
  quantity: number;
  price: number;
  discount: number;
  image: any;
  favourite: boolean;
  description: string;
  onCallRoute: (id: string) => void;
}

const Product = ({
  id,
  brand,
  title,
  star,
  quantity,
  price,
  discount,
  image,
  favourite,
  description,
  onCallRoute,
}: ProductType) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => onCallRoute(id)}>
        <ImageBackground
          source={image}
          style={styles.imageView}
          imageStyle={styles.image}
        >
          <Pressable>
            <View style={styles.heartContainer}>
              <Ionicons name="heart" size={18} color="#E66F2D" />
            </View>
          </Pressable>
        </ImageBackground>
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
        <Text style={styles.discount}>${discount.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default Product;

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
