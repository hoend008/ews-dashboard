import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import useData from "../hooks/useData";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import titleCase from "../utils/titleCase";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";
import createContaminantQueryOptions from "../api/queryOptions/contaminantQueryOptions";

const ContaminantSelect = () => {
  const { mode, accentColor } = useTheme();
  const themeColors = themeSettings(mode, accentColor);

  // get user authentication data
  const { auth } = useAuth();

  // get contaminants
  const { data: contaminants } = useQuery(
    createContaminantQueryOptions(auth.accessToken)
  );

  const { contaminant, setContaminant } = useData();

  const handleProductChange = (e: SelectChangeEvent) => {
    const contaminant = e.target.value;
    console.log(contaminant);
    if (contaminant) {
      setContaminant(contaminant);
    } else {
      return;
    }
  };

  return (
    <Box sx={{ margin: "1rem 1rem" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Contaminant</InputLabel>
        <Select
          MenuProps={{
            PaperProps: {
              sx: {
                "& .MuiMenuItem-root": {
                  color: "text.main",
                  backgroundColor: "primary.main", // default bg
                  "&:hover": {
                    // hover effect
                    backgroundColor: "neutral.light",
                  },
                },
                "& .MuiMenuItem-root.Mui-selected": {
                  backgroundColor: themeColors.accent.main, // selected bg
                  color: "text.main",
                  "&:hover": {
                    // hover effect
                    backgroundColor: "neutral.light",
                  },
                },
                "& .MuiMenuItem-root.Mui-focusVisible": {
                  backgroundColor: "secondary.main", // focused item bg
                  color: "text.main",
                  "&:hover": {
                    // hover effect
                    backgroundColor: "neutral.light",
                  },
                },
                mt: 0,
                pt: 0,
                pb: 0,

                "& .MuiMenu-list, & .MuiList-root": {
                  pt: 0,
                  pb: 0,
                },

                // optional: remove pseudo elements or shadows
                "&::before, &::after": {
                  display: "none",
                },
              },
            },
            sx: {
              "&& .Mui-selected": {
                color: "text.main",
                background: themeColors.neutral.light,
              },
              "& .MuiMenuItem-root.Mui-selected:hover": {
                backgroundColor: themeColors.accent.main,
              },
            },
          }}
          sx={{
            color: "text.main",
            backgroundColor: "secondary.main",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: themeColors.accent.main,
            },
            "& .MuiSelect-icon": {
              color: themeColors.accent.main,
            },
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={contaminant ? contaminant : ""}
          label="Contaminants"
          onChange={handleProductChange}
        >
          {contaminants?.map((contaminant) => (
            <MenuItem
              key={contaminant.contaminant}
              value={contaminant.contaminant}
              sx={{
                color: "text.main",
                backgroundColor: "secondary.main",
                "&:hover": {
                  backgroundColor: "neutral.light",
                },
              }}
            >
              {titleCase(contaminant.contaminant)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ContaminantSelect;
