import ReactSpeedometer, { Transition } from "react-d3-speedometer";
import { Typography } from "@mui/material";
import useData from "../hooks/useData";
import { SampleCountry } from "../api/queries/getSampleCountryMap";
import { chartMainColor } from "./MapGauge";
import { useCallback, useEffect, useState } from "react";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";

interface Props {
  data: SampleCountry[];
  error: Error | null;
  isPending: boolean;
  isSuccess: boolean;
  mapColors: chartMainColor[];
}

const GaugeChart = ({
  data,
  error,
  isPending,
  isSuccess,
  mapColors,
}: Props) => {
  const { mode, accentColor } = useTheme();
  const themeColors = themeSettings(mode, accentColor);

  // get country info
  const { countryCode } = useData();

  const getValue = (countryCode: string) => {
    let resultValue: number = 0;
    for (var i = 0; i < data.length; i++) {
      if (data[i].iso_a3 === countryCode) {
        resultValue = data[i].density;
      }
    }

    return resultValue;
  };

  // styles
  const defaultDiv = { height: "300px", width: "100%" };
  const extraDiv = {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  };

  if (error)
    return (
      <div style={{ ...defaultDiv, ...extraDiv }}>
        <Typography variant="h6" color="warning">
          Oops, something went wrong
        </Typography>
      </div>
    );

  return (
    <div
      style={{
        ...defaultDiv,
        ...extraDiv,
        paddingTop: "3rem"
      }}
    >
      <ReactSpeedometer
        height={300}
        width={400}
        customSegmentStops={mapColors.map((c) => c.max).reverse()}
        segmentColors={mapColors.map((c) => c.color).reverse()}
        needleColor="steelblue"
        needleTransitionDuration={1000}
        needleTransition={Transition.easePolyInOut}
        value={getValue(countryCode)}
        minValue={0}
        maxValue={mapColors.reduce((a, b) => Math.max(a, b.max), -Infinity)}
        textColor={themeColors.text.main}
        labelFontSize={"14px"}
        valueTextFontSize={"32px"}
        forceRender={true}
        paddingVertical={20}
      />
    </div>
  );
};

export default GaugeChart;
