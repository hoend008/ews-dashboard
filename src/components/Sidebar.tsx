import { Box, Drawer, Divider, Toolbar } from "@mui/material";
import CountrySelect from "./CountrySelect";
import ProductSelect from "./ProductSelect";
import ContaminantSelect from "./ContaminantSelect";
import FeedFoodSelect from "./FeedFoodSelect";
import { motion } from "framer-motion";

export const drawerWidth = 240;

interface Props {
  window?: () => Window;
  mobileOpen: boolean;
  handleDrawerTransitionEnd: () => void;
  handleDrawerClose: () => void;
}

const Sidebar = ({
  window,
  mobileOpen,
  handleDrawerTransitionEnd,
  handleDrawerClose,
}: Props) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <Box sx={{ bgcolor: "primary.main", height: "100dvh" }}>
      <Toolbar />
      <Divider />
      <motion.div
        initial={{ opacity: 0, x: -100 }} // start off-screen right
        animate={{ opacity: 1, x: 0 }} // slide to normal position
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <FeedFoodSelect />
        <CountrySelect />
        <ProductSelect />
        <ContaminantSelect />
      </motion.div>
      <Divider />
    </Box>
  );

  return (
    <Box
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
        backgroundColor: "primary.main",
      }}
      aria-label="mailbox folders"
    >
      <Toolbar />
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        slotProps={{
          root: {
            keepMounted: true, // Better open performance on mobile.
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderColor: "neutral.main",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
