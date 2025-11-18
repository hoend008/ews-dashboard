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
import createProductQueryOptions from "../api/queryOptions/productQueryOptions";

const ProductSelect = () => {
  const { mode, accentColor } = useTheme();
  const themeColors = themeSettings(mode, accentColor);

  // get user authentication data
  const { auth } = useAuth();

  // get products
  const { data: products } = useQuery(
    createProductQueryOptions(auth.accessToken)
  );

  const { product, setProduct } = useData();

  const handleProductChange = (e: SelectChangeEvent) => {
    const product = e.target.value;
    if (product) {
      setProduct(product);
    } else {
      return;
    }
  };

  return (
    <Box sx={{ margin: "1rem 1rem" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Product</InputLabel>
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
          value={product ? product : ""}
          label="Products"
          onChange={handleProductChange}
        >
          {products?.map((product) => (
            <MenuItem
              key={product.product}
              value={product.product}
              sx={{
                color: "text.main",
                backgroundColor: "secondary.main",
                "&:hover": {
                  backgroundColor: "neutral.light",
                },
              }}
            >
              {titleCase(product.product)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ProductSelect;
