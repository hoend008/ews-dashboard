import { Box, Card, Grid, Toolbar, Typography } from "@mui/material";
import { drawerWidth } from "../components/Layout";
import MapGauge from "../components/MapGauge";
import BarchartSampleYears from "../components/BarchartSampleYears";
import PiechartSampleProducts from "../components/PiechartSampleProducts";

const Home = () => {
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
        <MapGauge />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" sx={{ color: "text.main" }}>
              Samples per year
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Number of samples per year
            </Typography>
            <Card
              sx={{
                backgroundColor: "secondary.main",
                border: 1,
                borderColor: "border.main",
                borderRadius: "0.6rem",
              }}
            >
              <BarchartSampleYears />
            </Card>
          </Grid>
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
