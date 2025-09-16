import axios from "axios";

export interface SampleYear {
  [key: string]: string | number;
}

const getSampleYear = async (
  accessToken: string,
  country_code: string,
  product: string,
) => {
  const controller = new AbortController();
  const { data } = await axios<SampleYear[]>({
    method: "get",
    url: "http://127.0.0.1:8000/samples/years",
    signal: controller.signal,
    headers: { Authorization: "Bearer " + accessToken },
    params: {
      iso_a3: country_code ? country_code : null,
      product: product ? product : null,
    },
  });

  return data;
};

export default getSampleYear;
