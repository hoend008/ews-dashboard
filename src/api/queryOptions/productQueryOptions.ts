import { queryOptions } from "@tanstack/react-query";
import getProducts from "../queries/getProducts";

export default function createProductQueryOptions(accessToken: string) {
  return queryOptions({
    queryKey: ["products"],
    queryFn: () => getProducts(accessToken),
  });
}