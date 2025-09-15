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
              sx={{ color: "text.main", backgroundColor: "secondary.main" }}
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
