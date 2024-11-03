import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";

const Cart = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (formState: any) => console.log(formState);

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 7,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="0977*******7"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              inputMode="numeric"
              maxLength={12}
            />
          )}
          name="phone"
        />
        {errors.phone && <Text>This is required.</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 8,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="*********"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              inputMode="numeric"
              maxLength={8}
              secureTextEntry
            />
          )}
          name="password"
        />
        {errors.password && <Text>Password is invalid.</Text>}
        <Pressable onPress={handleSubmit(onSubmit)}>
          <Text>Log In</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({});
