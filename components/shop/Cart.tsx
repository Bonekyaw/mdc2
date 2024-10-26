import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Cart = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="cart-outline" size={24} color="black" />
      <View style={styles.textContainer}>
        <Text style={styles.quantity}>5</Text>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  textContainer: {
    width: 20,
    height: 20,
    backgroundColor: "red",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -10,
    marginTop: -5,
  },
  quantity: {
    color: "white",
    fontWeight: "bold",
    fontSize: 11,
  },
});
