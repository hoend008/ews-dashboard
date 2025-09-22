import { queryOptions } from "@tanstack/react-query";
import getMeasurementCountry from "../queries/getMeasurementCountry";

export default function createMeasurementCountryQueryOptions(
  accessToken: string,
  product: string
) {
  return queryOptions({
    queryKey: ["measurementcountry", product],
    queryFn: () => getMeasurementCountry(accessToken, product),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}