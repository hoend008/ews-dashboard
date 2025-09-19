import axios from "axios";

export interface MeasurementYear {
  [key: string]: string | number;
}

const getMeasurementYear = async (
  accessToken: string,
  country_code: string,
  product: string,
) => {
  const controller = new AbortController();
  const { data } = await axios<MeasurementYear[]>({
    method: "get",
    url: "http://127.0.0.1:8000/measurements/years",
    signal: controller.signal,
    headers: { Authorization: "Bearer " + accessToken },
    params: {
      iso_a3: country_code ? country_code : null,
      product: product ? product : null,
    },
  });

  return data;
};

export default getMeasurementYear;
