import { green } from "@mui/material/colors";
import { MAPCOLORS } from "../components/map/ColorUtils";

// color design tokens export
export const tokens = (mode: boolean) => ({
  ...(mode
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#0d47a1",
          200: "#1565c0",
          300: "#1976d2",
          400: "#1e88e5",
          500: "#2196f3",
          600: "#42a5f5",
          700: "#64b5f6",
          800: "#90caf9",
          900: "#bbdefb",
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#bbdefb",
          200: "#90caf9",
          300: "#64b5f6",
          400: "#42a5f5",
          500: "#2196f3",
          600: "#1e88e5",
          700: "#1976d2",
          800: "#1565c0",
          900: "#0d47a1",
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
      }),
});

export const themeSettings = (mode: boolean, themeColor: string) => {
  const colors = tokens(mode);

  const greenGradient = [
    "#5EA500",
    "#6AB61E",
    "#75C73D",
    "#81D95B",
    "#8CEA7A",
    "#98FB98",
  ];
  const redGradient = [
    "#a50f15",
    "#de2d26",
    "#fb6a4a",
    "#fc9272",
    "#fcbba1",
    "#fee5d9",
  ];

  //const colorGradient = themeColor === "green" ? greenGradient : redGradient;

  // create green, and red color gradient
  let MAPCOLORS_GREEN = MAPCOLORS.map((c, index) => ({
    color: greenGradient[index],
    value: c.value,
    range: c.range,
    max: c.max,
  }));

  let MAPCOLORS_RED = MAPCOLORS.map((c, index) => ({
    color: redGradient[index],
    value: c.value,
    range: c.range,
    max: c.max,
  }));

  return mode
    ? {
        primary: {
          main: "#0a0a0a", //colors.primary[100],
        },
        secondary: {
          main: "#171717",
          //main: colors.greenAccent[300],
        },
        accent: {
          main: themeColor == "green" ? "#5ea500" : "#fb6a4a",
        },
        neutral: {
          dark: colors.grey[200],
          main: colors.grey[600],
          light: colors.grey[700],
        },
        background: {
          //default: colors.primary[500],
          default: "#1e0008",
          //paper: colors.grey[300],
        },
        text: {
          main: "#e5e5e5",
          secondary: "#a1a1a1",
        },
        border: {
          main: "#ffffff1a",
        },
        mapColors: themeColor == "green" ? MAPCOLORS_GREEN : MAPCOLORS_RED,
        //mapColorsGreen: MAPCOLORS_GREEN,
        //mapColorsRed: MAPCOLORS_RED, 
      }
    : {
        primary: {
          //main: colors.primary[500],
          main: "#F2F3F4",
        },
        secondary: {
          //main: colors.greenAccent[100],
          main: "#F2F3F4",
        },
        accent: {
          main: themeColor == "green" ? "#5ea500" : "#fb6a4a",
        },
        neutral: {
          dark: colors.grey[400],
          main: colors.grey[800],
          light: colors.grey[900],
        },
        background: {
          default: "#fcfcfc",
          //paper: colors.grey[100],
        },
        text: {
          main: "#0a0a0a",
          secondary: "#737373",
        },
        border: {
          main: "#e5e5e5",
        },
        mapColors: themeColor == "green" ? MAPCOLORS_GREEN : MAPCOLORS_RED,
        //mapColorsGreen: MAPCOLORS_GREEN,
        //mapColorsRed: MAPCOLORS_RED,
      };
};
