import { Box, Card, CircularProgress, Grid, Typography } from "@mui/material";
import MyMap from "./map/MyMap";
import GaugeChart from "./GaugeChart";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import createSampleCountryMapQueryOptions from "../api/queryOptions/SampleCountryMapQueryOptions";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";
import { defaultDiv, extraDiv } from "../styles/pendingErrorDiv";
import useData from "../hooks/useData";

export interface chartMainColor {
  color: string;
  value: number;
  range: string;
  max: number;
}

const MapGauge = () => {
  const { mode, accentColor } = useTheme();
  const mapColors = themeSettings(mode, accentColor).mapColors;

  // get user authentication data
  const { auth } = useAuth();

  const { product, contaminant } = useData();

  // get map density data
  const { data, error, isPending, isSuccess } = useQuery(
    createSampleCountryMapQueryOptions(
      auth.accessToken,
      product,
      contaminant,
    )
  );

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
    <Card
      sx={{
        backgroundColor: "secondary.main",
        border: 1,
        borderColor: "border.main",
        borderRadius: "0.6rem",
        padding: "0.5rem",
        width: "100%",
      }}
    >
      <Grid
        container
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MyMap
          data={data}
          error={error}
          isPending={isPending}
          isSuccess={isSuccess}
          mapColors={mapColors}
        />
        <Box sx={{ margin: "auto" }}>
          <GaugeChart
            //data={data.data}
            data={data}
            error={error}
            isPending={isPending}
            isSuccess={isSuccess}
            mapColors={mapColors}
          />
        </Box>
      </Grid>
    </Card>
  );
};

export default MapGauge;
