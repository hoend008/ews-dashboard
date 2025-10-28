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
import createCountriesQueryOptions from "../api/queryOptions/countryQueryOptions";
import titleCase from "../utils/titleCase";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";

const CountrySelect = () => {
  const { mode, accentColor } = useTheme();
  const themeColors = themeSettings(mode, accentColor);

  // get user authentication data
  const { auth } = useAuth();

  // get countries
  const { data: countries } = useQuery(
    createCountriesQueryOptions(auth.accessToken)
  );

  const { countryCode, setCountryCode } = useData();

  const handleDistrictChange = (e: SelectChangeEvent) => {
    const iso_a3 = e.target.value;
    //const countryProps = densityData.find((e) => e.iso_a3 === iso_a3);
    //if (countryProps) {
    if (iso_a3) {
      setCountryCode(iso_a3);
    } else {
      return;
    }
  };

  return (
    <Box sx={{ margin: "1rem 1rem" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          MenuProps={{
            PaperProps: {
              sx: {
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
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={countryCode ? countryCode : ""}
          label="Countries"
          onChange={handleDistrictChange}
        >
          {countries?.map((country) => (
            <MenuItem
              key={country.code3}
              value={country.code3}
              sx={{
                color: "text.main",
                backgroundColor: "secondary.main",
                "&:hover": {
                  backgroundColor: "neutral.light",
                },
              }}
            >
              {titleCase(country.country)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CountrySelect;
