import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Typography } from "@mui/material";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";
import { useState } from "react";
import usePrevious from "react-use-previous";
import createSampleProductQueryOptions from "../api/queryOptions/sampleProductQueryOptions";
import { defaultDiv, extraDiv } from "../styles/pendingErrorDiv";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

const PiechartRecharts = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const previousIndex = usePrevious(activeIndex);

  // get user authentication data
  const { auth } = useAuth();

  // get country info
  const { countryCode, setFeedconversionID } = useData();

  // get sample year data
  const { data, error, isPending } = useQuery(
    createSampleProductQueryOptions(auth.accessToken, countryCode)
  );

  const { mode, accentColor } = useTheme();
  const themeColors = themeSettings(mode, accentColor);

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

  const renderLabel = (entry: any) => {
    return entry.name;
  };

  const handleClick = (data: any, index: any) => {
    if (index === previousIndex.current) {
      setActiveIndex(-1);
      setFeedconversionID(0);
    } else {
      setActiveIndex(index);
      setFeedconversionID(data.feedconversion_id);
    }
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="count"
          nameKey="productname"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill={themeColors.accent.main}
          label={renderLabel}
          onClick={handleClick}
        >
          {data.map((entry, index) => (
            <Cell
              style={{ outline: "none" }}
              cursor="pointer"
              fill={index === activeIndex ? "#82ca9d" : themeColors.accent.main}
              key={`cell-${index}`}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PiechartRecharts;
