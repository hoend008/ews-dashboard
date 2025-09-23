import { useState } from "react";
import DataTable from "react-data-table-component";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";
import { useQuery } from "@tanstack/react-query";
import createMeasurementCountryQueryOptions from "../api/queryOptions/measurementCountryQueryOptions";
import { themeSettings } from "../themes/theme";
import useTheme from "../hooks/useTheme";
import { defaultDiv, extraDiv } from "../styles/pendingErrorDiv";
import { CircularProgress, Typography } from "@mui/material";
import { MeasurementCountry } from "../api/queries/getMeasurementCountry";

interface DataRow {
  iso_a3: string;
  count: number;
  gtloq: number;
  gtloq_perc: number;
  selected: boolean;
}

const columns = [
  {
    name: "iso_a3",
    selector: (row: MeasurementCountry) => row.iso_a3,
    sortable: true,
  },
  {
    name: "count",
    selector: (row: MeasurementCountry) => row.count,
    sortable: true,
    compact: true,
  },
  {
    name: "gtloq",
    selector: (row: MeasurementCountry) => row.gtloq,
    sortable: true,
    compact: true,
  },
  {
    name: "gtloq_perc",
    selector: (row: MeasurementCountry) => row.gtloq_perc,
    sortable: true,
    compact: true,
  },
];

/*
const tableData = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
    toggleSelected: false,
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
    toggleSelected: false,
  },
];
*/

const conditionalRowStyles = [
  {
    when: (row: MeasurementCountry) => row.selected,
    style: {
      backgroundColor: "yellow",
      "&:hover": {
        backgroundColor: "yellow",
      },
    },
  },
];

const TableCountries = () => {
  // get user authentication data
  const { auth } = useAuth();

  // get country info
  const { product } = useData();

  // get sample year data
  const { data, error, isPending } = useQuery(
    createMeasurementCountryQueryOptions(auth.accessToken, product)
  );

  const { mode, accentColor } = useTheme();
  const themeColors = themeSettings(mode, accentColor);

  //const [data, setData] = useState(tableData);

  const handleRowClicked = (row: MeasurementCountry) => {
    console.log(row);

    const updatedData = data?.map((item) => {
      if (row.iso_a3 !== item.iso_a3) {
        return item;
      }

      return {
        ...item,
        selected: !item.selected,
      };
    });

    //setData(updatedData);
  };

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
      <DataTable
        columns={columns}
        data={data}
        highlightOnHover={true}
        pointerOnHover={true}
        onRowClicked={handleRowClicked}
        conditionalRowStyles={conditionalRowStyles}
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 20, 50]}
      />
    );
};

export default TableCountries;
