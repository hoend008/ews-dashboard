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
  ComposedChart,
  Bar,
  Line,
} from "recharts";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Typography } from "@mui/material";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";
import { defaultDiv, extraDiv } from "../styles/pendingErrorDiv";
import createMeasurementYearQueryOptions from "../api/queryOptions/measurementYearQueryOptions";

const ChartMixedMeasurementYearsCountExceeding = () => {
  // get user authentication data
  const { auth } = useAuth();

  // get country info
  const { countryCode, product } = useData();

  // get sample year data
  const { data, error, isPending } = useQuery(
    createMeasurementYearQueryOptions(auth.accessToken, countryCode, product)
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
        <ComposedChart
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
            yAxisId="left"
            dataKey="count"
            orientation="left"
            type="number"
            domain={[0, "auto"]}
            allowDataOverflow
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
          <YAxis
            yAxisId="right"
            dataKey="gtloq_perc"
            orientation="right"
            type="number"
            domain={[0, "auto"]}
            label={{
              value: "% Exceeding LOQ",
              angle: -90,
              position: "center",
              dx: 20,
            }}
            tick={{ fontSize: 12, fill: themeColors.text.main }}
            tickFormatter={(tick) => {
              return `${tick}%`;
            }}
          />

          <Tooltip />
          <Bar
            yAxisId="left"
            dataKey="count"
            barSize={20}
            fill={themeColors.accent.main}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="gtloq_perc"
            stroke={themeColors.accent.secondary}
            fill={themeColors.accent.secondary}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartMixedMeasurementYearsCountExceeding;
