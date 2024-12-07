import { memo } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

type Props = {
  title: string;
  actionText: string;
};

const Title = ({ title, actionText }: Props) => {
  console.log("Title rendered - ", title);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Pressable>
        <Text style={styles.btnText}>{actionText}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginRight: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  btnText: {
    color: "gray",
    fontWeight: "500",
  },
});

export default memo(Title);
