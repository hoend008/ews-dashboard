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
import createFeedFoodQueryOptions from "../api/queryOptions/feedFoodQueryOptions";

const FeedFoodSelect = () => {
  const { mode, accentColor } = useTheme();
  const themeColors = themeSettings(mode, accentColor);

  // get user authentication data
  const { auth } = useAuth();

  // get feed food
  const { data } = useQuery(
    createFeedFoodQueryOptions(auth.accessToken)
  );

  const { feedFood, setFeedFood } = useData();

  const handleProductChange = (e: SelectChangeEvent) => {
    const feedFood = e.target.value;
    if (feedFood) {
      setFeedFood(feedFood);
    } else {
      return;
    }
  };

  return (
    <Box sx={{ margin: "1rem 1rem" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Feed / Food</InputLabel>
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
          value={feedFood ? feedFood : ""}
          label="Feed / Food"
          onChange={handleProductChange}
        >
          {data?.map((data) => (
            <MenuItem
              key={data.feedfood}
              value={data.feedfood}
              sx={{ color: "text.main", backgroundColor: "secondary.main" }}
            >
              {titleCase(data.feedfood)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FeedFoodSelect;
