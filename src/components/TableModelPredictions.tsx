import { Box, Typography } from "@mui/material";
import { PredictionCountry } from "../api/queries/getPredictionCountryMap";
import { chartMainColor } from "./MapChart";
import { defaultDiv, extraDiv } from "../styles/pendingErrorDiv";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import titleCase from "../utils/titleCase";
import { MeasurementCountry } from "../api/queries/getMeasurementCountry";
import { useState } from "react";
import useData from "../hooks/useData";

interface Props {
  data: PredictionCountry[];
  error: Error | null;
  isPending: boolean;
  isSuccess: boolean;
  mapColors: chartMainColor[];
}

const TableModelPredictions = ({
  data,
  error,
  isPending,
  isSuccess,
  mapColors,
}: Props) => {
    // get country info
  const { countryCode, setCountryCode } = useData();

  // define columns for datagrid
  const columns: GridColDef[] = [
    {
      field: "country",
      headerName: "Country",
      width: 200,
      valueGetter: (value, row) => {
        return titleCase(value);
      },
    },
    {
      field: "density",
      headerName: "Model Prediction",
      type: "number",
      width: 200,
      valueGetter: (value, row) => {
        return `${Math.round(value*100)}%`;
      },
    },
  ];

  // functions and useStates to handle click events
    const handleRowClick: GridEventListener<"rowClick"> = (params: any) => {
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

  return (
    <Box sx={{ width: "100%", height: "350px" }}>
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
        pageSizeOptions={[5]}
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
          "& .MuiDataGrid-row:hover": {
            color: "text.main",
            backgroundColor: "grey",
          },
        }}
      />
    </Box>
  );
};

export default TableModelPredictions;
