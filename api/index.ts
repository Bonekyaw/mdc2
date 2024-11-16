import * as SecureStore from "expo-secure-store";
import { API_URL } from "@/config";

const token = "Sample Token";

export const fetchApi = async (endpoint = "", method = "GET", data = {}) => {
  const url = API_URL + endpoint;
  const headers = {
    accept: "application/json",
    Authorization: "Bearer " + token,
  };
  // return "something";
};
