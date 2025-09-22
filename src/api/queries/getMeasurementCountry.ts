import axios from "axios";

export interface MeasurementCountry {
  [key: string]: string | number;
}

const getMeasurementCountry = async (
  accessToken: string,
  product: string,
) => {
  const controller = new AbortController();
  const { data } = await axios<MeasurementCountry[]>({
    method: "get",
    url: "http://127.0.0.1:8000/measurements/countries",
    signal: controller.signal,
    headers: { Authorization: "Bearer " + accessToken },
    params: {
      product: product ? product : null,
    },
  });

  return data;
};

export default getMeasurementCountry;
