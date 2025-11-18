import { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";
import { useQuery } from "@tanstack/react-query";
import createMeasurementCountryQueryOptions from "../api/queryOptions/measurementCountryQueryOptions";
import { defaultDiv, extraDiv } from "../styles/pendingErrorDiv";
import { MeasurementCountry } from "../api/queries/getMeasurementCountry";
import titleCase from "../utils/titleCase";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";

const TableCountries = () => {
  const { mode, accentColor } = useTheme();
  const themeColors = themeSettings(mode, accentColor);

  // get user authentication data
  const { auth } = useAuth();

  // get country info
  const { feedFood, product, countryCode, setCountryCode, contaminant } =
    useData();

  // get sample year data
  const { data, error, isPending } = useQuery(
    createMeasurementCountryQueryOptions(
      auth.accessToken,
      feedFood,
      product,
      contaminant
    )
  );

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
      valueGetter: (value, row) => {
        return titleCase(value);
      },
    },
    {
      field: "count",
      headerName: "Nr Measurements",
      type: "number",
      width: 150,
    },
    {
      field: "exceeding_mrl",
      headerName: "> MRL",
      type: "number",
      width: 110,
    },
    {
      field: "exceeding_mrl_perc",
      headerName: "% > MRL",
      type: "number",
      width: 130,
      valueGetter: (value, row) => {
        return `${value}%`;
      },
    },
  ];

  // functions and useStates to handle click events
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const handleRowClick: GridEventListener<"rowClick"> = (params: any) => {
    setSelectedRowId((prev) =>
      prev === params.id ? null : (params.id as number)
    );
    setSelectedRow(params.row);
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
          getRowClassName={(params) =>
            params.id === selectedRowId ? "my-selected-row" : ""
          }
          disableColumnResize={true}
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
            "& .MuiDataGrid-row": {
              transition: "background-color 0.3s ease",
            },
            "& .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "secondary.main",
              fontSize: 16,
            },
            "& .MuiDataGrid-row:hover": {
              color: "text.main",
              backgroundColor: "grey",
            },

            "& .my-selected-row": {
              backgroundColor: themeColors.accent.main,
            },

            "& .MuiDataGrid-sortIcon": {
              opacity: 1,
              color: "text.main",
            },
            "& .MuiDataGrid-menuIconButton": {
              opacity: 1,
              color: "text.main",
            },

            "& ::-webkit-scrollbar": {
              width: "12px",
            },
            "& ::-webkit-scrollbar-track": {
              backgroundColor: themeColors.neutral.main,
            },
            "& ::-webkit-scrollbar-thumb": {
              borderRadius: "8px",
              boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
              backgroundColor: themeColors.accent.main,
            },
            "& ::-webkit-scrollbar-button": {
              borderStyle: "solid",
              height: "12px",
              width: "12px",
            },

            /* DOWN */
            "& ::-webkit-scrollbar-button:vertical:decrement": {
              borderWidth: "0 7px 12px 7px",
              borderColor:
                "transparent transparent " +
                themeColors.neutral.light +
                " transparent ",
              backgroundColor: themeColors.neutral.main,
            },

            /* Up */
            "& ::-webkit-scrollbar-button:vertical:increment": {
              borderWidth: "12px 7px 0 7px",
              borderColor:
                themeColors.neutral.light +
                " transparent transparent transparent",
              backgroundColor: themeColors.neutral.main,
            },
          }}
        />
      </Box>
    );
};

export default TableCountries;
