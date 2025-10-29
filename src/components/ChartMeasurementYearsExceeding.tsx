import { useState } from "react";
import usePrevious from "react-use-previous";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Typography } from "@mui/material";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";
import { defaultDiv, extraDiv } from "../styles/pendingErrorDiv";
import createMeasurementYearQueryOptions from "../api/queryOptions/measurementYearQueryOptions";

const ChartMeasurementYearsExceeding = () => {
  // get user authentication data
  const { auth } = useAuth();

  // get country info
  const { feedFood, countryCode, product, contaminant } = useData();

  // get sample year data
  const { data, error, isPending } = useQuery(
    createMeasurementYearQueryOptions(
      auth.accessToken,
      feedFood,
      countryCode,
      product,
      contaminant
    )
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
        <AreaChart
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
              value: "Percentage",
              angle: -90,
              position: "center",
              dx: -20,
            }}
            tick={{ fontSize: 12, fill: themeColors.text.main }}
            tickFormatter={(tick) => {
              return `${tick}%`;
            }}
          />
          <Tooltip
            formatter={(value: number) => `${value}%`}
            contentStyle={{
              fontSize: "18px",
              borderRadius: "10px",
              backgroundColor: themeColors.secondary.main,
              border: "1px solid " + themeColors.accent.main,
              color: themeColors.text.secondary,
              opacity: 0.92,
            }}
            labelStyle={{
              fontWeight: "bold",
              fontSize: "20px",
            }}
          />
          <Area
            name="% Measurements > LOQ"
            type="monotone"
            dataKey="exceeding_mrl_perc"
            stroke={themeColors.accent.main}
            fill={themeColors.accent.main}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartMeasurementYearsExceeding;
