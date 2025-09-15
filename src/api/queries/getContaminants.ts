import axios from "axios";

export interface Contaminant {
  contaminant: string;
}

const getContaminants = async (accessToken: string) => {
  const controller = new AbortController();

  const { data } = await axios<Contaminant[]>({
    method: "get",
    url: "http://127.0.0.1:8000/contaminants",
    signal: controller.signal,
    headers: { Authorization: "Bearer " + accessToken },
  });

  return data;
};

export default getContaminants;