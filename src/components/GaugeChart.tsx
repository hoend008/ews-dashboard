import ReactSpeedometer, { Transition } from "react-d3-speedometer";
import { Typography } from "@mui/material";
import useData from "../hooks/useData";
import { PredictionCountry } from "../api/queries/getPredictionCountryMap";
import { chartMainColor } from "./MapChart";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";
import { defaultDiv, extraDiv } from "../styles/pendingErrorDiv";

interface Props {
  data: PredictionCountry[];
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
        paddingTop: "3rem",
      }}
    >
      {
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
          textColor={themeColors.accent.main}
          labelFontSize={"14px"}
          valueTextFontSize={"32px"}
          forceRender={false}
          paddingVertical={20}
        />
      }
    </div>
  );
};

export default GaugeChart;
