import { queryOptions } from "@tanstack/react-query";
import getFeedFood from "../queries/getFeedFood";

export default function createFeedFoodQueryOptions(accessToken: string) {
  return queryOptions({
    queryKey: ["feedFood"],
    queryFn: () => getFeedFood(accessToken),
  });
}