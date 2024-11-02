import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const Detail = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Detail screen {id}</Text>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({});
