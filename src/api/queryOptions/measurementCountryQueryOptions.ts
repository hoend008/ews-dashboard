import { queryOptions } from "@tanstack/react-query";
import getMeasurementCountry from "../queries/getMeasurementCountry";

export default function createMeasurementCountryQueryOptions(
  accessToken: string,
  product: string,
  contaminant: string,
) {
  return queryOptions({
    queryKey: ["measurementcountry", product, contaminant],
    queryFn: () => getMeasurementCountry(accessToken, product, contaminant),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}