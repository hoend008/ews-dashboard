import axios from "axios";

export interface SampleCountry {
  iso_a3: string;
  density: number;
}

const getSampleCountryMap = async (
  accessToken: string,
  product: string,
  contaminant: string,
) => {
  const controller = new AbortController();
  const { data } = await axios<SampleCountry[]>({
    method: "get",
    url: "http://127.0.0.1:8000/samples/countries",
    signal: controller.signal,
    headers: { Authorization: "Bearer " + accessToken },
    params: {
      product: product ? product : null,
      contaminant: contaminant ? contaminant : null,
    },
  });

  //const mapData = createMapData(geodata, data);
  //return { data, mapData };
  return data;
};

export default getSampleCountryMap;
