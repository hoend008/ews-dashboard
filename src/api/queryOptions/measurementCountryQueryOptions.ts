import { queryOptions } from "@tanstack/react-query";
import getMeasurementCountry from "../queries/getMeasurementCountry";

export default function createMeasurementCountryQueryOptions(
  accessToken: string,
  feedFood: string,
  product: string,
  contaminant: string,
) {
  return queryOptions({
    queryKey: ["measurementcountry", feedFood, product, contaminant],
    queryFn: () => getMeasurementCountry(accessToken, feedFood, product, contaminant),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}