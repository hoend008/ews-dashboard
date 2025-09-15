import {
  Box,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import CountrySelect from "./CountrySelect";
import ProductSelect from "./ProductSelect";
import ContaminantSelect from "./ContaminantSelect";

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
      <CountrySelect />
      <ProductSelect />
      <ContaminantSelect />
      <Divider />
      <List>
        {["Button 1", "Button 2", "Button 3"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ color: "text.main" }}>
            <ListItemButton>
              <ListItemIcon sx={{ color: "text.main" }}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
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
