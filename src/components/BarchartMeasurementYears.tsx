import { useState } from "react";
import usePrevious from "react-use-previous";
import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Typography } from "@mui/material";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";
import { defaultDiv, extraDiv } from "../styles/pendingErrorDiv";
import createMeasurementYearQueryOptions from "../api/queryOptions/measurementYearQueryOptions";

const BarchartMeasurementYears = () => {
  // get user authentication data
  const { auth } = useAuth();

  // get country info
  const { countryCode, product, contaminant } = useData();

  // get sample year data
  const { data, error, isPending } = useQuery(
    createMeasurementYearQueryOptions(auth.accessToken, countryCode, product, contaminant)
  );

  const { mode, accentColor } = useTheme();
  const themeColors = themeSettings(mode, accentColor);

  const [activeIndex, setActiveIndex] = useState(-1);
  const previousIndex = usePrevious(activeIndex);

  const handleClick = (data: any, index: any) => {
    if (index === previousIndex.current) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };

  if (error)
    return (
      <div style={{ ...defaultDiv, ...extraDiv }}>
        <Typography variant="h6" color="warning">
          Oops, something went wrong
        </Typography>
      </div>
    );

  if (isPending)
    return (
      <div style={{ ...defaultDiv, ...extraDiv }}>
        <CircularProgress color="success" size="5rem" />
      </div>
    );

  return (
    <div style={{ width: "100%" }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={150}
          height={40}
          data={data}
          margin={{
            top: 25,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: themeColors.text.main }}
          />
          <YAxis
            label={{
              value: "Number of Measurements",
              angle: -90,
              position: "center",
              dx: -35,
            }}
            tick={{ fontSize: 12, fill: themeColors.text.main }}
            tickFormatter={(tick) => {
              return tick.toLocaleString();
            }}
          />
          <Tooltip />
          <Bar dataKey="count" onClick={handleClick}>
            {data.map((entry, index) => (
              <Cell
                cursor="pointer"
                fill={
                  index === activeIndex ? "#82ca9d" : themeColors.accent.main
                }
                key={`cell-${index}`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarchartMeasurementYears;
