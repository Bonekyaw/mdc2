import { useState, useRef, useMemo, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomSheet, {
  //BottomSheetFlashList,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-root-toast";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateProduct as entityUpdate } from "@/services/redux/productSlice";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "@/services/redux/productDetailSlice";
import { addCart } from "@/services/redux/cartSlice";
// import { products } from "@/data";
import Cart from "@/components/shop/Cart";
import ViewPager from "@/components/shop/ViewPager";
// import type { ColorType, SizeType, ProductType } from "@/type";
import { useSession } from "@/providers/ctx";

const { width, height } = Dimensions.get("window");
const Detail = () => {
  const { id } = useLocalSearchParams();
  // const productLocal = products.find((product) => product.id === +id);
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const { signOut } = useSession();
  const router = useRouter();

  // const product = useAppSelector((state) => selectProductById(state, +id));
  const { cartList } = useAppSelector((state) => state.carts);
  const {
    data: product,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetProductQuery(+id);

  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();

  let cartArray: any[] = [];
  if (cartList.length > 0) {
    const list = cartList.find((item: any) => item.id == id);
    if (list) {
      cartArray = list.items;
    }
  }
  const [cart, setCart] = useState(cartArray);

  const increase = () => {
    if (!color || !size) {
      return Toast.show("Please choose color & size.", {
        duration: Toast.durations.LONG,
      });
    }
    setQuantity((q) => q + 1);
  };

  const decrease = () => {
    if (quantity == 1) return;
    setQuantity((q) => q - 1);
  };

  const addToCart = () => {
    if (!color || !size) {
      return Toast.show("Please choose color & size.", {
        duration: Toast.durations.LONG,
      });
    }

    setCart((prev) => [
      { id: new Date().getTime(), color, size, quantity },
      ...prev,
    ]);
    setQuantity(1);
    // Add To Dedux
    // const cartItem = {
    //   id: product.id,
    //   title: product.title,
    //   price: product.price,
    //   image: product.image,
    //   items: [
    //     ...cart,
    //     { id: new Date().getTime(), color, size, quantity },
    //   ],
    // };
    // dispatch(addCart(cartItem));
  };

  const removeCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    // Update To Dedux
    // const cartItem = {
    //   id: product.id,
    //   title: product.title,
    //   price: product.price,
    //   image: product.image,
    //   items: cart.filter((item) => item.id !== id),
    // };
    // dispatch(addCart(cartItem));
  };

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = useCallback(
    () => bottomSheetRef.current?.snapToIndex(1),
    []
  );

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
  }, []);

  const snapPoints = useMemo(() => ["50%", "75%", "100%"], []); // renders

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.1}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    []
  );

  const updateFavourite = async (id: number, fav: boolean) => {
    const updatedData = fav ? { users: [{ id: 1 }] } : { users: [] };
    dispatch(entityUpdate({ id, changes: updatedData }));
  };

  const addToFavourite = async (id: number, fav: boolean) => {
    try {
      const data = { productId: id, favourite: fav };
      await updateProduct(data).unwrap();
      updateFavourite(id, fav);
    } catch (error: any) {
      Toast.show("An error occurs. Please try again.", {
        duration: Toast.durations.LONG,
      });
    }
  };

  // render
  // Please Note - You should not use useCallback
  const renderSheetItem = ({ item }: any) => (
    <View style={[styles.itemContainer, { width: width - 40 }]}>
      <Text style={{ fontWeight: "bold", opacity: 0.5, textAlign: "left" }}>
        {item.color.toUpperCase()} - {item.size} - ( $
        {(product!.price * item.quantity).toFixed(2)} )
      </Text>
      <Text>( {item.quantity} )</Text>
      <Pressable onPress={() => removeCart(item.id)}>
        <Ionicons
          name="close-circle"
          size={24}
          color="black"
          style={{ marginLeft: 50 }}
        />
      </Pressable>
    </View>
  );

  const addCartToRedux = () => {
    if (cart.length == 0) {
      return Toast.show("Please choose color & size.", {
        duration: Toast.durations.LONG,
      });
    }

    const cartItem = {
      id: product?.id,
      title: product?.title,
      price: product?.price,
      image: product?.image,
      items: cart,
    };
    dispatch(addCart(cartItem));
    router.back();
  };

  const buyNow = () => {
    if (cart.length == 0) {
      return Toast.show("Please choose color & size.", {
        duration: Toast.durations.LONG,
      });
    }

    const cartItem = {
      id: product?.id,
      title: product?.title,
      price: product?.price,
      image: product?.image,
      items: cart,
    };
    dispatch(addCart(cartItem));
    router.push("/cart");
  };

  const ColorBox = ({
    id,
    name,
    bgColor,
    stock,
  }: {
    id: number;
    name: string;
    bgColor: string;
    stock: boolean;
  }) => (
    <Pressable
      onPress={handleOpenPress}
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

  const SizeBox = ({
    id,
    name,
    stock,
  }: {
    id: number;
    name: string;
    stock: boolean;
  }) => (
    <Pressable
      onPress={handleOpenPress}
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

  if (isLoading) {
    return (
      <View style={{ gap: 11 }}>
        <View
          style={{
            width: "100%",
            height: 300,
            backgroundColor: "#00000011",
            borderRadius: 10,
          }}
        />
        <View
          style={{
            width: "30%",
            height: 25,
            backgroundColor: "#00000011",
            borderRadius: 5,
          }}
        />
        <View
          style={{
            width: "60%",
            height: 25,
            backgroundColor: "#00000011",
            borderRadius: 5,
          }}
        />
      </View>
    );
  }

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
      {!product ? (
        <View
          style={{
            height: height,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>An error occurs.</Text>
        </View>
      ) : (
        <>
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
                <Pressable
                  onPress={() =>
                    addToFavourite(+id, product.users.length === 0)
                  }
                >
                  <Ionicons
                    name={
                      product?.users && product?.users.length > 0
                        ? "heart"
                        : "heart-outline"
                    }
                    size={20}
                    color="#E66F2D"
                    style={{ paddingTop: 2 }}
                  />
                </Pressable>
              </View>
              <Text style={styles.title}>{product?.title}</Text>
              <View style={styles.brandContainer}>
                <Text style={styles.price}>${product?.price.toFixed(2)}</Text>
                <Text style={styles.discount}>
                  ${product?.discount.toFixed(2)}
                </Text>
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
                    {product?.colors.map((item) => (
                      <ColorBox
                        key={item.id}
                        id={item.id}
                        name={item.color.name}
                        bgColor={item.color.bgColor}
                        stock={item.stock}
                      />
                    ))}
                  </View>
                </View>
                <View>
                  <Text style={styles.boxTitle}>Sizes</Text>
                  <View style={styles.box}>
                    {product?.sizes.map((item) => (
                      <SizeBox
                        key={item.id}
                        id={item.id}
                        name={item.size.name}
                        stock={item.stock}
                      />
                    ))}
                  </View>
                </View>
              </View>
              {cart.length > 0 && (
                <Text style={styles.checkTitle}>Order Lists</Text>
              )}
              {cart.length > 0 &&
                cart.map((item) => (
                  <View key={item.id} style={styles.itemContainer}>
                    <Text style={{ fontWeight: "bold", opacity: 0.7 }}>
                      {item.color.toUpperCase()} - {item.size} - ( $
                      {(product.price * item.quantity).toFixed(2)} )
                    </Text>
                    <Text>( {item.quantity} )</Text>
                  </View>
                ))}
              <View style={{ marginTop: 70 }} />
            </View>
          </ScrollView>
          <View style={styles.btnContainer}>
            <Pressable style={styles.button} onPress={addCartToRedux}>
              <Ionicons name="cart-outline" size={20} color="balck" />
              <Text style={styles.btnText}>ADD TO CART</Text>
            </Pressable>
            <Pressable
              onPress={buyNow}
              style={[styles.button, { backgroundColor: "black" }]}
            >
              <Text style={[styles.btnText, { color: "white" }]}>BUY NOW</Text>
            </Pressable>
          </View>
          <BottomSheet
            index={-1}
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose
            backgroundStyle={{ backgroundColor: "#ffffff" }}
            handleIndicatorStyle={{ backgroundColor: "#ffffff" }}
            onChange={handleSheetChanges}
            backdropComponent={renderBackdrop}
          >
            <BottomSheetView
              style={{
                flexDirection: "row",
              }}
            >
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>Choose color</Text>
              </View>
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>Choose size</Text>
              </View>
            </BottomSheetView>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Picker
                selectedValue={color}
                onValueChange={(itemValue, itemIndex) => setColor(itemValue)}
                // mode="dropdown"
                style={{ width: "45%" }}
                itemStyle={{ fontSize: 14, fontWeight: "600" }}
              >
                {product.colors.map((item) => {
                  if (!item.stock) return;
                  return (
                    <Picker.Item
                      key={item.id}
                      label={item.color.name}
                      value={item.color.name}
                    />
                  );
                })}
              </Picker>
              <Picker
                selectedValue={size}
                onValueChange={(itemValue, itemIndex) => setSize(itemValue)}
                // mode="dropdown"
                style={{ width: "45%" }}
                itemStyle={{ fontSize: 14, fontWeight: "600" }}
              >
                {product.sizes.map((item) => {
                  if (!item.stock) return;
                  return (
                    <Picker.Item
                      key={item.id}
                      label={item.size.name}
                      value={item.size.name}
                    />
                  );
                })}
              </Picker>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <View style={styles.resultContainer}>
                {product.colors.map((item) =>
                  item.color.name === color ? (
                    <ColorBox
                      key={item.id}
                      id={item.id}
                      name={item.color.name}
                      bgColor={item.color.bgColor}
                      stock={item.stock}
                    />
                  ) : null
                )}
                <Text style={{ marginHorizontal: 3 }}>{""}</Text>
                {product.sizes.map((item) =>
                  item.size.name === size ? (
                    <SizeBox
                      key={item.id}
                      id={item.id}
                      name={item.size.name}
                      stock={item.stock}
                    />
                  ) : null
                )}
              </View>
              <View style={styles.resultContainer}>
                <Pressable style={styles.spinner} onPress={increase}>
                  <Text style={styles.spinnerText}>+</Text>
                </Pressable>
                <Text style={{ marginHorizontal: 15 }}> {quantity} </Text>
                <Pressable
                  style={[styles.spinner, { backgroundColor: "#00000060" }]}
                  onPress={decrease}
                >
                  <Text style={styles.spinnerText}>-</Text>
                </Pressable>
              </View>
              <Pressable onPress={addToCart}>
                <Ionicons
                  name="save"
                  size={30}
                  color="#007618"
                  style={{ marginLeft: 30 }}
                />
              </Pressable>
            </View>
            {cart.length > 0 && (
              <BottomSheetFlatList
                data={cart}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderSheetItem}
                contentContainerStyle={{ zIndex: 1, alignItems: "center" }}
              />
            )}
          </BottomSheet>
        </>
      )}
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
  modalTitleContainer: {
    width: "50%",
  },
  modalTitle: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 15,
    color: "#000000",
    paddingTop: 7,
    marginHorizontal: 4,
  },
  order: {
    marginVertical: 15,
    fontWeight: "bold",
    opacity: 0.7,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: "#00000007",
  },
  resultContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 0.5,
    backgroundColor: "#00000007",
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginLeft: 10,
    borderRadius: 10,
  },
  colorModal: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: "gray",
  },
  spinner: {
    width: 26,
    height: 26,
    backgroundColor: "#007618",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    // marginRight: 5,
  },
  spinnerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
  checkTitle: {
    marginTop: 17,
    marginBottom: 10,
    fontSize: 13,
  },
});
