import { chartMainColor } from "../MapGauge";

export const MAPCOLORS = [
  { color: "#a50f15", value: 0.8, range: "> 0.8", max: 0.8 },
  { color: "#de2d26", value: 0.6, range: "0.6 - 0.8", max: 0.6 },
  { color: "#fb6a4a", value: 0.4, range: "0.4 - 0.6", max: 0.4 },
  { color: "#fc9272", value: 0.2, range: "0.2 - 0.4", max: 0.2 },
  { color: "#fcbba1", value: 0.1, range: "0.1 - 0.2", max: 0.1 },
  { color: "#fee5d9", value: 0, range: "0 - 0.1", max: 0 },
];

export const mapPolygonColorToDensity = (
  density: number,
  MAPCOLORS: chartMainColor[]
) => {
  return density == null ? "#808080" :
    density > 0.8 //0000000
    ? MAPCOLORS[0].color
    : density > 0.6 //0000000
    ? MAPCOLORS[1].color
    : density > 0.4 //0000000
    ? MAPCOLORS[2].color
    : density > 0.2 //0000000
    ? MAPCOLORS[3].color
    : density > 0.1 //0000000
    ? MAPCOLORS[4].color
    : MAPCOLORS[5].color;
};
