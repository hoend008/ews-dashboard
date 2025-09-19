import { queryOptions } from "@tanstack/react-query";
import getMeasurementYear from "../queries/getMeasurementYear";

export default function createMeasurementYearQueryOptions(
  accessToken: string,
  countryID: string,
  product: string
) {
  return queryOptions({
    queryKey: ["measurementyear", countryID, product],
    queryFn: () => getMeasurementYear(accessToken, countryID, product),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}