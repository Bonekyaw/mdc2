import { memo } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { IMG_URL } from "@/config";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

interface Props {
  id: number;
  name: string;
  image: any;
  onSelect: (id: number) => void;
  select: number;
}

const Category = ({ id, name, image, onSelect, select }: Props) => {
  console.log("Category rendered - ", id);

  return (
    <Pressable style={styles.container} onPress={() => onSelect(id)}>
      <Image
        style={[styles.image, select === id && styles.select]}
        source={{ uri: IMG_URL + image }}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
      {/* <Image
        style={[styles.image, select === id && styles.select]}
        source={{ uri: API_URL + image }}
      /> */}
      <Text style={styles.caption}>{name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginRight: 30,
  },
  image: {
    width: 56,
    height: 56,
    marginBottom: 7,
  },
  select: {
    borderColor: "orange",
    borderRadius: 28,
    borderWidth: 2,
  },
  caption: {
    fontSize: 12,
    fontWeight: "600",
  },
});

export default memo(Category);
