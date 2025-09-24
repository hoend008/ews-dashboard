import { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";
import { useQuery } from "@tanstack/react-query";
import createMeasurementCountryQueryOptions from "../api/queryOptions/measurementCountryQueryOptions";
import { themeSettings } from "../themes/theme";
import useTheme from "../hooks/useTheme";
import { defaultDiv, extraDiv } from "../styles/pendingErrorDiv";
import { MeasurementCountry } from "../api/queries/getMeasurementCountry";

const TableCountries = () => {
  // get user authentication data
  const { auth } = useAuth();

  // get country info
  const { product, countryCode, setCountryCode, contaminant } = useData();

  // get sample year data
  const { data, error, isPending } = useQuery(
    createMeasurementCountryQueryOptions(auth.accessToken, product, contaminant)
  );

  const { mode, accentColor } = useTheme();
  const themeColors = themeSettings(mode, accentColor);

  // define columns for datagrid
  const columns: GridColDef[] = [
    {
      field: "rank",
      headerName: "Rank",
      type: "number",
      width: 60,
      headerClassName: "datagrid-header",
    },
    {
      field: "country",
      headerName: "Country",
      width: 140,
    },
    {
      field: "count",
      headerName: "Nr Measurements",
      type: "number",
      width: 150,
    },
    {
      field: "gtloq",
      headerName: "> LOQ",
      type: "number",
      width: 110,
    },
    {
      field: "gtloq_perc",
      headerName: "% > LOQ",
      type: "number",
      width: 130,
    },
  ];

  // functions and useStates to handle click events
  const handleRowClick: GridEventListener<"rowClick"> = (params: any) => {
    setSelectedRow(params.row);
    console.log(params.row.iso_a3, " ", countryCode);
    if (params.row.iso_a3 == countryCode) {
      setCountryCode("");
    } else {
      setCountryCode(params.row.iso_a3);
    }
  };

  const [selectedRow, setSelectedRow] = useState<MeasurementCountry>();

  if (error)
    return (
      <div style={{ ...defaultDiv, ...extraDiv }}>
        <Typography variant="h6" color="warning">
          Oops, something went wrong
        </Typography>
      </div>
    );

  if (isPending)
    return (
      <div style={{ ...defaultDiv, ...extraDiv }}>
        <CircularProgress color="success" size="5rem" />
      </div>
    );

  if (data)
    return (
      <Box sx={{ width: "100%", height: 300 }}>
        <DataGrid
          rows={data}
          columns={columns}
          hideFooter
          getRowId={(row) => row.iso_a3}
          //initialState={{
          //  pagination: {
          //    paginationModel: {
          //      pageSize: 5,
          //    },
          //  },
          //}}
          //pageSizeOptions={[5]}
          checkboxSelection={false}
          disableRowSelectionOnClick
          //loading={isLoading}
          slotProps={{
            loadingOverlay: {
              variant: "circular-progress",
              noRowsVariant: "circular-progress",
            },
          }}
          onRowClick={handleRowClick}
          sx={{
            backgroundColor: "secondary.main",
            border: 1,
            borderColor: "border.main",
            borderRadius: "0.6rem",
            color: "text.main",
            "& .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "secondary.main",
              fontSize: 16,
            },
          }}
        />
      </Box>
    );
};

export default TableCountries;
