import axios from "axios";

//export interface MeasurementCountry {
//  [key: string]: string | number;
//}

export interface MeasurementCountry {
  iso_a3: string;
  count: number;
  rank: number;
  gtloq: number;
  gtloq_perc: number;
}

const getMeasurementCountry = async (
  accessToken: string,
  product: string,
  contaminant: string,
) => {
  const controller = new AbortController();
  const { data } = await axios<MeasurementCountry[]>({
    method: "get",
    url: "http://127.0.0.1:8000/measurements/countries",
    signal: controller.signal,
    headers: { Authorization: "Bearer " + accessToken },
    params: {
      product: product ? product : null,
      contaminant: contaminant ? contaminant : null,
    },
  });

  return data;
};

export default getMeasurementCountry;
