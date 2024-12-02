import * as SecureStore from "expo-secure-store";
import { API_URL } from "@/config";
import Toast from "react-native-root-toast";

async function fetchWithRetry(url: string, options: {}, retries = 5) {
  try {
    const response = await fetch(url, options);
    // if (response.status >= 500 || !response.ok) {
    //   console.log("Error Response--------", response);
    //   throw new Error("Request failed with status " + response.status);
    // }
    if (!response.ok) {
      const res = await response.json();
      if (response.status == 401 && res.error === "Error_AccessTokenExpired") {
        Toast.show(res.message, {
          duration: Toast.durations.LONG,
        });
        return { error: res.error };
      }

      // Error_Attack - Must Log Out

      console.log("Error Response in redux--------", res);
      Toast.show(res.message, { duration: Toast.durations.LONG });
      return null;
    }

    return response.json();
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... (${retries} retries left) and url is ${url}`);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      return fetchWithRetry(url, options, retries - 1);
    } else
      Toast.show("Network request failed! Try again later.", {
        duration: Toast.durations.LONG,
      });
  }
}

export const fetchApi = async (endpoint = "", method = "GET", data = {}) => {
  const token = await SecureStore.getItemAsync("token");
  // console.log("Token --------", token);

  const url = API_URL + endpoint;
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  const options =
    Object.keys(data).length === 0
      ? { method, headers }
      : { method, headers, body: JSON.stringify(data) };

  try {
    const response = await fetchWithRetry(url, options, 5);
    return response;
  } catch (error) {
    console.error("Failed to fetch APi: ", error);
  }
};
