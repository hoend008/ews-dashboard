import {
  AppBar,
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext, { emptyAuth } from "../context/AuthProvider";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";

interface Props {
  handleDrawerToggle: () => void;
}

const Navbar = ({ handleDrawerToggle }: Props) => {
  const { setAuth } = useContext(AuthContext);
  const { mode, handleChange, accentColor, handleAccentColor } = useTheme();
  const navigate = useNavigate();

  const themeColors = themeSettings(mode, accentColor);

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth(emptyAuth);
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderBottom: "1px solid " + themeColors.neutral.main,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          <DashboardIcon
            fontSize="large"
            sx={{
              display: { xs: "none", sm: "block" },
              width: "8rem",
            }}
          />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon fontSize="large" sx={{ color: "text.main" }} />
          </IconButton>
        </Box>
        <Typography variant="h4" sx={{ color: "text.main" }}>
          EWS Mycotoxin Dashboard
        </Typography>
        <Box sx={{ display: "flex" }}>
          <IconButton onClick={handleChange}>
            {mode ? (
              <LightModeOutlinedIcon sx={{ color: "text.main" }} />
            ) : (
              <DarkModeOutlinedIcon sx={{ color: "text.main" }} />
            )}
          </IconButton>
          <FormControl fullWidth size="small">
            <InputLabel id="them-select-label">Theme</InputLabel>
            <Select
              labelId="theme-select-label"
              id="theme-select"
              value={accentColor}
              label="Theme"
              onChange={handleAccentColor}
              MenuProps={{
                sx: {
                  "&& .Mui-selected": {
                    color: "text.main",
                    background: themeColors.neutral.light,
                  },
                },
              }}
              sx={{
                color: "text.main",
                backgroundColor: "secondary.main",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: themeColors.accent.main,
                },
              }}
            >
              <MenuItem
                value={"green"}
                sx={{ color: "text.main", backgroundColor: "secondary.main" }}
              >
                Green
              </MenuItem>
              <MenuItem
                value={"red"}
                sx={{ color: "text.main", backgroundColor: "secondary.main" }}
              >
                Red
              </MenuItem>
            </Select>
          </FormControl>
          <IconButton onClick={logout}>
            <LogoutIcon sx={{ color: "text.main" }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
