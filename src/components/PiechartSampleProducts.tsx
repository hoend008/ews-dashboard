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

const PiechartSampleProducts = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const previousIndex = usePrevious(activeIndex);

  // get user authentication data
  const { auth } = useAuth();

  // get country info
  const { countryCode, setProduct } = useData();

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
      setProduct("");
    } else {
      setActiveIndex(index);
      setProduct(data.product);
    }
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="count"
          nameKey="product"
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
        <Tooltip
          formatter={(value: number, name: string) => [
            value.toLocaleString(), // 👈 adds thousand separators based on locale
            name.charAt(0).toUpperCase() + name.slice(1), // capitalize first letter
          ]}
          contentStyle={{
            fontSize: "18px",
            borderRadius: "10px",
            backgroundColor: themeColors.secondary.main,
            border: "1px solid " + themeColors.accent.main,
            color: themeColors.text.secondary,
            opacity: 0.92,
          }}
          itemStyle={{
            color: themeColors.accent.main,
          }}
          labelStyle={{
            fontWeight: "bold",
            fontSize: "20px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PiechartSampleProducts;
