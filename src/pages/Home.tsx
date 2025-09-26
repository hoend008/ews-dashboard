import { Box, Card, Divider, Grid, Toolbar, Typography } from "@mui/material";
import { drawerWidth } from "../components/Layout";
import MapChart from "../components/MapChart";
import PiechartSampleProducts from "../components/PiechartSampleProducts";
import BarchartMeasurementYears from "../components/BarchartMeasurementYears";
import ChartMixedMeasurementYearsCountExceeding from "../components/ChartMixedMeasurementYearsCountExceeding";
import ChartMeasurementYearsExceeding from "../components/ChartMeasurementYearsExceeding";
import TableCountries from "../components/TableCountries";
import useData from "../hooks/useData";

const Home = () => {
  const { feedFood, product, contaminant } = useData();
   
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 2,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        height: { sm: "100%", md: "100%" },
        bgcolor: "primary.main",
      }}
    >
      <Toolbar />
      <Grid container direction="column" spacing={2}>
        <Typography variant="h3" align={'center'} sx={{ color: "text.main" }}>
          Model Predictions
        </Typography>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" sx={{ color: "text.main" }}>
              Model Predictions World Map
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
            Model Predictions per country for {feedFood.toUpperCase()} - {product} and {contaminant}
            </Typography>
        </Grid>

        <MapChart />

        <Divider sx={{ borderBottomWidth: 3, bgcolor: "text.secondary" }} />
        <Typography variant="h3" align={'center'} sx={{ color: "text.main" }}>
          Data Descriptives
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" sx={{ color: "text.main" }}>
              Measurements per year
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Number of measurements per year
            </Typography>
            <Card
              sx={{
                backgroundColor: "secondary.main",
                border: 1,
                borderColor: "border.main",
                borderRadius: "0.6rem",
              }}
            >
              <ChartMixedMeasurementYearsCountExceeding />
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" sx={{ color: "text.main" }}>
              Countries
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Countries ranked by percentage of measurements exceeding the LOQ
            </Typography>
            <Card
              sx={{
                backgroundColor: "secondary.main",
                border: 1,
                borderColor: "border.main",
                borderRadius: "0.6rem",
              }}
            >
              <TableCountries />
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" sx={{ color: "text.main" }}>
              Measurements per year
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Number of measurements per year
            </Typography>
            <Card
              sx={{
                backgroundColor: "secondary.main",
                border: 1,
                borderColor: "border.main",
                borderRadius: "0.6rem",
              }}
            >
              <BarchartMeasurementYears />
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" sx={{ color: "text.main" }}>
              Measurements: % Greater than LOQ
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Percentage of measurements with concentrations greater than LOQ
              per year
            </Typography>
            <Card
              sx={{
                backgroundColor: "secondary.main",
                border: 1,
                borderColor: "border.main",
                borderRadius: "0.6rem",
              }}
            >
              <ChartMeasurementYearsExceeding />
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" sx={{ color: "text.main" }}>
              Samples: Top 3 products
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              The top 3 products based on the number of samples
            </Typography>
            <Card
              sx={{
                backgroundColor: "secondary.main",
                border: 1,
                borderColor: "border.main",
                borderRadius: "0.6rem",
              }}
            >
              <PiechartSampleProducts />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
