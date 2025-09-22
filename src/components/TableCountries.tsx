import { useState } from "react";
import DataTable from "react-data-table-component";

interface DataRow {
  id: number;
  title: string;
  year: string;
  toggleSelected: boolean;
}

const columns = [
  {
    name: "Title",
    selector: (row: DataRow) => row.title,
    sortable: true,
  },
  {
    name: "Year",
    selector: (row: DataRow) => row.year,
    sortable: true,
  },
];

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

const conditionalRowStyles = [
  {
    when: (row: DataRow) => row.toggleSelected,
    style: {
      backgroundColor: 'yellow',
    },
  },
];

const TableCountries = () => {
  const [data, setData] = useState(tableData);

  const handleRowClicked = (row: DataRow) => {
    console.log(row);

    const updatedData = data.map((item) => {
      if (row.id !== item.id) {
        return item;
      }

      return {
        ...item,
        toggleSelected: !item.toggleSelected,
      };
    });

    setData(updatedData);
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      highlightOnHover={true}
      pointerOnHover={true}
      onRowClicked={handleRowClicked}
      conditionalRowStyles={conditionalRowStyles}
    />
  );
};

export default TableCountries;
