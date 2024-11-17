import * as SecureStore from "expo-secure-store";
import { API_URL } from "@/config";

const token = "Sample Token";

async function fetchWithRetry(url: string, options: {}, retries = 5) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      // console.log(response);
      throw new Error("Request failed with status " + response.status);
    }
    return response.json();
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... (${retries} retries left) and url is ${url}`);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      return fetchWithRetry(url, options, retries - 1);
    } else throw error;
  }
}

export const fetchApi = async (endpoint = "", method = "GET", data = {}) => {
  const url = API_URL + endpoint;
  const headers = {
    accept: "application/json",
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
