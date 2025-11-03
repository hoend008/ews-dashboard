import { Box, Modal, Typography } from "@mui/material";
import { PredictionCountry } from "../api/queries/getPredictionCountryMap";
import { chartMainColor } from "./MapChart";
import { defaultDiv, extraDiv } from "../styles/pendingErrorDiv";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import titleCase from "../utils/titleCase";
import { MeasurementCountry } from "../api/queries/getMeasurementCountry";
import { useState } from "react";
import useData from "../hooks/useData";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";
import ChartMixedMeasurementYearsCountExceeding from "./ChartMixedMeasurementYearsCountExceeding";

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
  const { mode, accentColor } = useTheme();
  const themeColors = themeSettings(mode, accentColor);

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
        return `${Math.round(value * 100)}%`;
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
    setOpen(true);
  };

  // select rows and open modal
  const [selectedRow, setSelectedRow] = useState<MeasurementCountry>();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    //setSelectedRow(null);
  };

  if (error)
    return (
      <div style={{ ...defaultDiv, ...extraDiv }}>
        <Typography variant="h6" color="warning">
          Oops, something went wrong
        </Typography>
      </div>
    );

  return (
    <Box sx={{ width: "100%", height: 350 }}>
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
          "& .MuiDataGrid-row": {
            transition: "background-color 0.3s ease",
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

          /* Up */
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

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "secondary.main",
            color: "text.main",
            border: "1px solid " + themeColors.accent.main,
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-title"
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ textTransform: "capitalize" }}
          >
            {selectedRow
              ? `Details for ${
                  data.find((c) => c.iso_a3 === selectedRow.iso_a3)?.country
                }`
              : "Details"}
          </Typography>
          <ChartMixedMeasurementYearsCountExceeding />
        </Box>
      </Modal>
    </Box>
  );
};

export default TableModelPredictions;
