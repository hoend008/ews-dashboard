import axios from "axios";

export interface FeedFood {
  feedfood: string;
}

const getFeedFood = async (accessToken: string) => {
  const controller = new AbortController();

  const { data } = await axios<FeedFood[]>({
    method: "get",
    url: "http://127.0.0.1:8000/feedfood",
    signal: controller.signal,
    headers: { Authorization: "Bearer " + accessToken },
  });

  return data;
};

export default getFeedFood;