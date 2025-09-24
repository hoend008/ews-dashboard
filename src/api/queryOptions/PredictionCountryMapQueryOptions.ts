import { queryOptions } from "@tanstack/react-query";
import getPredictionCountryMap from "../queries/getPredictionCountryMap";

export default function createPredictionCountryMapQueryOptions(
  accessToken: string,
  product: string,
  contaminant: string,
) {
  return queryOptions({
    queryKey: ["predictioncountrymap", product, contaminant],
    queryFn: () => getPredictionCountryMap(accessToken, product, contaminant),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}
