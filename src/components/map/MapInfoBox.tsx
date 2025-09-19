import useTheme from "../../hooks/useTheme";
import { themeSettings } from "../../themes/theme";
import { chartMainColor } from "../MapGauge";
import { mapPolygonColorToDensity } from "./ColorUtils";

interface Props {
  selectedFeature: any;
}

const MapInfoBox = ({ selectedFeature }: Props) => {
  const { mode, accentColor } = useTheme();
  const chartMainColor = themeSettings(mode, accentColor).mapColors;

  const opacity = selectedFeature.name ? 1 : 0;

  return (
    <div className={"MapInfoBox"}>
      <h2 style={{ margin: "0 0 5px" }}>Prediction</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "2rem",
            width: "2rem",
            backgroundColor: mapPolygonColorToDensity(
              selectedFeature.density,
              chartMainColor
            ),
            marginRight: "0.4rem",
            opacity: opacity,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "11rem",
          }}
        >
          <div style={{ fontSize: 14, maxWidth: "3rem" }}>
            {selectedFeature.name ? selectedFeature.name : "Hover for score"}
          </div>
          {selectedFeature.name ? (
            <div
              style={{
                marginLeft: "1rem",
                display: "flex",
                width: "5rem",
                height: "5rem",
                backgroundColor: "#E0E0E0",
                opacity: 1,
                borderRadius: "50%",
              }}
            >
              <div
                style={{
                  color: "black",
                  opacity: 1,
                  fontSize: 20,
                  margin: "auto",
                }}
              >
                {selectedFeature.density}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MapInfoBox;
