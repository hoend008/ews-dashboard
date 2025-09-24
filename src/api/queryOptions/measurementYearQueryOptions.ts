import { queryOptions } from "@tanstack/react-query";
import getMeasurementYear from "../queries/getMeasurementYear";

export default function createMeasurementYearQueryOptions(
  accessToken: string,
  countryID: string,
  product: string,
  contaminant: string
) {
  return queryOptions({
    queryKey: ["measurementyear", countryID, product, contaminant],
    queryFn: () => getMeasurementYear(accessToken, countryID, product, contaminant),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}