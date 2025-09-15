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
          value={product ? product : ""}
          label="Products"
          onChange={handleProductChange}
        >
          {products?.map((product) => (
            <MenuItem
              key={product.product}
              value={product.product}
              sx={{ color: "text.main", backgroundColor: "secondary.main" }}
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
