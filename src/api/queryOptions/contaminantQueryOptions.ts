import { queryOptions } from "@tanstack/react-query";
import getContaminants from "../queries/getContaminants";

export default function createContaminantQueryOptions(accessToken: string) {
  return queryOptions({
    queryKey: ["contaminants"],
    queryFn: () => getContaminants(accessToken),
  });
}