import axios from "axios";

export interface Product {
  product: string;
}

const getProducts = async (accessToken: string) => {
  const controller = new AbortController();

  const { data } = await axios<Product[]>({
    method: "get",
    url: "http://127.0.0.1:8000/products",
    signal: controller.signal,
    headers: { Authorization: "Bearer " + accessToken },
  });

  return data;
};

export default getProducts;