import { queryOptions } from "@tanstack/react-query";
import getSampleYear from "../queries/getSampleYear";

export default function createSampleYearQueryOptions(
  accessToken: string,
  countryID: string,
  product: string
) {
  return queryOptions({
    queryKey: ["sampleyear", countryID, product],
    queryFn: () => getSampleYear(accessToken, countryID, product),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}