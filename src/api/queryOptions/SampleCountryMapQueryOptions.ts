import { queryOptions } from "@tanstack/react-query";
import getSampleCountryMap from "../queries/getSampleCountryMap";
import { GeoJsonObject } from "geojson";

export default function createSampleCountryMapQueryOptions(
  accessToken: string,
  product: string,
  contaminant: string,
  geodata: GeoJsonObject
) {
  return queryOptions({
    queryKey: ["samplecountrymap", product, contaminant],
    queryFn: () => getSampleCountryMap(accessToken, product, contaminant, geodata),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}
